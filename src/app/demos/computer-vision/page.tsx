import { DemoTemplate } from "@/components/templates/demo-template";
import { computerVisionDemo } from "@/lib/demo-data";

export default function ComputerVisionDemo() {
  return <DemoTemplate content={computerVisionDemo} />;
}