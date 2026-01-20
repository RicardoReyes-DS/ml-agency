import { DemoTemplate } from "@/components/templates/demo-template";
import { ObjectDetectionInterface } from "@/components/demos/computer-vision/object-detection-interface";
import { computerVisionDemo } from "@/lib/demo-data";

export default function ComputerVisionDemo() {
  return (
    <DemoTemplate 
      content={computerVisionDemo} 
      customDemoComponent={<ObjectDetectionInterface />}
    />
  );
}
