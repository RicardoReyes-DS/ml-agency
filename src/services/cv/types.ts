export interface DetectedObject {
  bbox: [number, number, number, number]; // [x, y, width, height]
  class: string;
  score: number;
}

export interface ObjectDetectionProvider {
  detect(imageBuffer: Buffer): Promise<DetectedObject[]>;
}
