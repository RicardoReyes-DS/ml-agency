import { DemoTemplate } from "@/components/templates/demo-template";
import { nlpDemo } from "@/lib/demo-data";

export default function NLPDemo() {
  return <DemoTemplate content={nlpDemo} />;
}