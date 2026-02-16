import type { Metadata } from "next";
import { DemoTemplate } from "@/components/templates/demo-template";
import { ObjectDetectionInterface } from "@/components/demos/computer-vision/object-detection-interface";
import { BreadcrumbStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import { computerVisionDemo } from "@/lib/demo-data";

const DEMO_URL = "https://ml-agency.com/demos/computer-vision";

export const metadata: Metadata = {
  title: "Object Detection | Computer Vision Demo",
  description:
    "Interactive object detection powered by COCO-SSD. Identify 80+ classes of objects in uploaded images with instant feedback.",
  openGraph: {
    title: "Object Detection | ML Agency",
    description:
      "Interactive object detection powered by COCO-SSD. Identify 80+ classes of objects in uploaded images.",
    url: "https://ml-agency.com/demos/computer-vision",
  },
};

export default function ComputerVisionDemo() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://ml-agency.com" },
          { name: "Demos", url: "https://ml-agency.com/demos" },
          { name: "Object Detection", url: DEMO_URL },
        ]}
      />
      <SoftwareApplicationStructuredData
        name="Object Detection Demo"
        description={computerVisionDemo.subtitle}
        url={DEMO_URL}
        applicationCategory="DeveloperApplication"
      />
      <DemoTemplate 
      content={computerVisionDemo} 
      customDemoComponent={<ObjectDetectionInterface />}
    />
    </>
  );
}
