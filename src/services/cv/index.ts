import { CocoSSDProvider } from './coco-ssd-provider';
import { ObjectDetectionProvider } from './types';

let detectionProvider: ObjectDetectionProvider | null = null;

export function getObjectDetectionProvider(): ObjectDetectionProvider {
  if (!detectionProvider) {
    detectionProvider = new CocoSSDProvider();
  }
  return detectionProvider;
}

export * from './types';
