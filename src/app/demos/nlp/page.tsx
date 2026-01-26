import { DemoTemplate } from "@/components/templates/demo-template";
import { nlpDemo } from "@/lib/demo-data";
import { RAGInterface } from "@/components/demos/nlp/rag-interface";

export default function NLPDemo() {
  return <DemoTemplate content={nlpDemo} customDemoComponent={<RAGInterface />} />;
}
