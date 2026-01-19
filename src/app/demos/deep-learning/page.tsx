import { DemoTemplate } from "@/components/templates/demo-template";
import { deepLearningDemo } from "@/lib/demo-data";

export default function DeepLearningDemo() {
  return <DemoTemplate content={deepLearningDemo} />;
}