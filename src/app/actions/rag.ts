'use server';

import { VertexAI } from '@google-cloud/vertexai';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID || process.env.GCP_PROJECT_ID || 'ml-agency'; // Fallback or env
const LOCATION = 'us-central1';
const MODEL_NAME = 'gemini-2.5-pro'; // Using generic alias for auto-resolution

// Initialize Vertex AI
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = vertexAI.getGenerativeModel({ model: MODEL_NAME });

export interface ProcessedDocument {
  text: string;
  filename: string;
  type: string;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export async function processDocumentAction(formData: FormData): Promise<ProcessedDocument> {
  const file = formData.get('file') as File;

  if (!file) {
    return { text: '', filename: '', type: '', error: 'No file provided' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let text = '';

    if (file.type === 'application/pdf') {
      const data = await pdf(buffer);
      text = data.text;
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      return { 
        text: '', 
        filename: file.name, 
        type: file.type, 
        error: 'Unsupported file type. Please upload PDF or DOCX.' 
      };
    }

    // Basic cleanup
    text = text.replace(/\s+/g, ' ').trim();

    return {
      text,
      filename: file.name,
      type: file.type
    };

  } catch (error) {
    console.error('Error processing document:', error);
    return {
      text: '',
      filename: file.name,
      type: file.type,
      error: 'Failed to process document: ' + (error instanceof Error ? error.message : String(error))
    };
  }
}

export async function generateRAGResponseAction(
  history: ChatMessage[], 
  context: string,
  userMessage: string
): Promise<ChatMessage> {
  try {
    // Construct the system instruction or initial context
    // For Gemini, we can pass context in the system instruction or as part of the first message.
    // Here we'll prepend it to the chat session or valid system instruction if supported by the SDK version.
    
    // We will use a chat session. 
    // We need to format the history for the Vertex AI SDK.
    // The SDK expects { role: string, parts: { text: string }[] }
    
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `You are a helpful assistant. Use the following document context to answer questions. If the answer is not in the context, say so.\n\nCONTEXT:\n${context}` }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I will answer questions based on the provided context.' }]
        },
        ...history.map(msg => ({
          role: msg.role,
          parts: msg.parts
        }))
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessageStream(userMessage);
    
    // We need to return a streamable response or handle the stream here.
    // Since Next.js Server Actions with streaming are a bit specific, 
    // for simplicity in this demo, we might just await the full response 
    // OR return a readable stream.
    // However, to keep it simple for the "Architect" persona and robust for the demo:
    // We will aggregate the text for now. 
    // For true streaming in Next.js App Router, we usually use `StreamableValue` from `ai` SDK or similar,
    // but here we are using raw Vertex SDK.
    // Let's gather the response and return it.
    
    const aggregatedResponse = await result.response;
    const text = aggregatedResponse.candidates?.[0].content.parts[0].text || '';

    return { role: 'model' as const, parts: [{ text }] };

  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
}
