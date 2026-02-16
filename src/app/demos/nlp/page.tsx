import type { Metadata } from "next";
import { DemoTemplate } from "@/components/templates/demo-template";
import { BreadcrumbStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import { nlpDemo } from "@/lib/demo-data";
import { RAGInterface } from "@/components/demos/nlp/rag-interface";

const DEMO_URL = "https://ml-agency.com/demos/nlp";

export const metadata: Metadata = {
  title: "RAG Document Analysis | NLP Demo",
  description:
    "Production-grade RAG system. Upload documents to query content using Gemini 2.5 Pro. No training required.",
  openGraph: {
    title: "RAG Document Analysis | ML Agency",
    description:
      "Production-grade RAG system. Upload PDF or DOCX files and ask questions using Gemini 2.5 Pro.",
    url: "https://ml-agency.com/demos/nlp",
  },
};

export default function NLPDemo() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://ml-agency.com" },
          { name: "Demos", url: "https://ml-agency.com/demos" },
          { name: "RAG Document Analysis", url: DEMO_URL },
        ]}
      />
      <SoftwareApplicationStructuredData
        name="RAG Document Analysis Demo"
        description={nlpDemo.subtitle}
        url={DEMO_URL}
        applicationCategory="DeveloperApplication"
      />
      <DemoTemplate content={nlpDemo} customDemoComponent={<RAGInterface />} />
    </>
  );
}
