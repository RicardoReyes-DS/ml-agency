import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { ProcessedDocument } from '@/lib/types';

export async function parseDocument(file: File): Promise<ProcessedDocument> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  try {
    if (file.type === 'application/pdf') {
      const data = await pdf(buffer);
      const text = data.text.replace(/\s+/g, ' ').trim();
      return {
        text,
        filename: file.name,
        mimeType: file.type,
        type: file.type
      };
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.replace(/\s+/g, ' ').trim();
      return {
        text,
        filename: file.name,
        mimeType: file.type,
        type: file.type
      };
    } else if (file.type.startsWith('image/')) {
      // For images, we return base64 data to send to Gemini
      const base64Data = buffer.toString('base64');
      return {
        image: base64Data,
        filename: file.name,
        mimeType: file.type,
        type: file.type
      };
    } else {
       // Fallback for text files or unknown types to see if they are readable text
       try {
           const text = buffer.toString('utf-8');
           return {
               text: text.replace(/\s+/g, ' ').trim(),
               filename: file.name,
               mimeType: 'text/plain',
               type: file.type
           }
       } catch (e) {
            return { 
                filename: file.name, 
                type: file.type, 
                mimeType: file.type,
                error: 'Unsupported file type. Please upload PDF, DOCX, Image, or Text.' 
            };
       }
    }

  } catch (error) {
    console.error('Error processing document:', error);
    return {
      filename: file.name,
      type: file.type,
      mimeType: file.type,
      error: 'Failed to process document: ' + (error instanceof Error ? error.message : String(error))
    };
  }
}
