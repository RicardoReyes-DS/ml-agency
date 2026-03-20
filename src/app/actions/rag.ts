'use server';

import { VertexAI, Content } from '@google-cloud/vertexai';
import { z } from 'zod';
import { parseDocument } from '@/services/nlp/document-processor';
import { ProcessedDocument, ChatMessage } from '@/lib/types';

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID || process.env.GCP_PROJECT_ID || 'enkisys-agency';
const LOCATION = 'us-central1';
const MODEL_NAME = 'gemini-2.5-pro';

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

// Zod Schemas
const ContextSchema = z.object({
  text: z.string().optional(),
  image: z.string().optional(),
  mimeType: z.string().optional()
});

const PartSchema = z.object({
  text: z.string().optional(),
  inlineData: z.object({
    mimeType: z.string(),
    data: z.string()
  }).optional()
});

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(PartSchema)
});

const HistorySchema = z.array(MessageSchema);

const UserMessageSchema = z.string().min(1, "Message cannot be empty").max(10000, "Message too long");

export async function processDocumentAction(formData: FormData): Promise<ProcessedDocument> {
  const file = formData.get('file') as File;

  if (!file) {
    return { filename: '', type: '', mimeType: '', error: 'No file provided' };
  }

  return await parseDocument(file);
}

export async function generateRAGResponseAction(
  history: ChatMessage[], 
  context: { text?: string; image?: string; mimeType?: string },
  userMessage: string
): Promise<ChatMessage> {
  try {
    // 1. Validate Inputs
    const validatedHistory = HistorySchema.parse(history);
    const validatedContext = ContextSchema.parse(context);
    const validatedMessage = UserMessageSchema.parse(userMessage);
    
    // 2. Construct Chat History for Vertex AI
    // We map the incoming history to the Content format expected by Vertex AI
    const chatHistory: Content[] = validatedHistory.map(msg => ({
      role: msg.role,
      parts: msg.parts.map(p => {
        if (p.text) return { text: p.text };
        if (p.inlineData) return { inlineData: p.inlineData };
        return { text: '' }; // Fallback
      })
    }));

    // 3. Configure Model with System Instruction containing the Context
    type SystemPart = { text: string } | { inlineData: { mimeType: string; data: string } };
    const systemParts: SystemPart[] = [{ text: "You are a helpful assistant. Use the following context to answer questions. If the answer is not in the context, say so." }];
    
    if (validatedContext.text) {
        systemParts.push({ text: `CONTEXT:\n${validatedContext.text}` });
    }
    if (validatedContext.image) {
        systemParts.push({ 
            inlineData: { 
                mimeType: validatedContext.mimeType || 'image/jpeg', 
                data: validatedContext.image 
            } 
        });
    }

    // Initialize model per-request to inject specific context
    const model = vertexAI.getGenerativeModel({ 
        model: MODEL_NAME,
        systemInstruction: {
            role: 'system',
            parts: systemParts
        }
    });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(validatedMessage);
    const text = result.response.candidates?.[0].content.parts[0].text || '';

    return { role: 'model', parts: [{ text }] };

  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response: ' + (error instanceof Error ? error.message : String(error)));
  }
}
