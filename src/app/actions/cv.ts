'use server';

import { getObjectDetectionProvider, DetectedObject } from '@/services/cv';
import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/bmp"];

const detectionSchema = z.object({
  file: z
    .instanceof(File, { message: "Image is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 10MB.",
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      { message: "Only .jpg, .png, .webp and .bmp formats are supported." }
    ),
});

export interface DetectionResult {
  detections?: DetectedObject[];
  error?: string;
}

export async function detectObjects(formData: FormData): Promise<DetectionResult> {
  try {
    const imageEntry = formData.get("image");

    // Validate input using Zod - FormData returns File | string, we need File
    const validationResult = detectionSchema.safeParse({
      file: imageEntry instanceof File ? imageEntry : undefined,
    });

    if (!validationResult.success) {
      const flattened = validationResult.error.flatten();
      return {
        error: flattened.fieldErrors.file?.[0] ?? (imageEntry ? "Invalid image format or size." : "No image provided."),
      };
    }

    const validFile = validationResult.data.file;

    // Convert File to Buffer
    const arrayBuffer = await validFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get provider and process
    const provider = getObjectDetectionProvider();
    const detections = await provider.detect(buffer);

    return { detections };
  } catch (error) {
    console.error("Object Detection Error:", error);
    // Return the actual error message for debugging purposes
    return { 
      error: error instanceof Error ? error.message : "Failed to process image." 
    };
  }
}
