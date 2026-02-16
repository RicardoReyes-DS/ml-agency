import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { ObjectDetectionProvider, DetectedObject } from './types';

// Singleton instance to prevent multiple model loads
let modelInstance: cocoSsd.ObjectDetection | null = null;

export class CocoSSDProvider implements ObjectDetectionProvider {
  private async getModel(): Promise<cocoSsd.ObjectDetection> {
    if (!modelInstance) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Loading COCO-SSD model...');
      }
      // Set backend to CPU explicitly for Node.js environment without native bindings
      await tf.setBackend('cpu');
      await tf.ready();
      modelInstance = await cocoSsd.load();
    }
    return modelInstance;
  }

  async detect(imageBuffer: Buffer): Promise<DetectedObject[]> {
    const model = await this.getModel();
    
    // Decode image manually since we don't have tf.node.decodeImage
    const uint8Array = new Uint8Array(imageBuffer);
    const tensor = tf.tidy(() => {
      // Create tensor from buffer
      // Note: This is a simplified decoding. For robust server-side decoding without tfjs-node,
      // we rely on the fact that we are passing raw pixel data or need a helper.
      // However, tfjs-node was the one providing 'decodeImage'.
      // Without it, we need to use a library like 'sharp' (already in deps) to get raw pixel data.
      return tf.tensor3d(new Uint8Array(0), [0, 0, 3]); // Placeholder, see implementation below
    });
    
    // We need to use 'sharp' to decode the image to raw pixels since tf.node is gone
    const sharp = (await import('sharp')).default;
    const { data, info } = await sharp(imageBuffer)
      .removeAlpha()
      .resize(undefined, undefined, { fit: 'contain' }) // Ensure reasonable size if needed
      .raw()
      .toBuffer({ resolveWithObject: true });

    const inputTensor = tf.tensor3d(new Uint8Array(data), [info.height, info.width, 3], 'int32');

    try {
      const predictions = await model.detect(inputTensor as tf.Tensor3D);
      
      return predictions.map(pred => ({
        bbox: pred.bbox,
        class: pred.class,
        score: pred.score
      }));
    } catch (error) {
      console.error("TensorFlow Detection Error:", error);
      throw error;
    } finally {
      inputTensor.dispose();
      tensor.dispose(); // Dispose the placeholder
    }
  }
}
