import type { Metadata } from "next";
import { DemoTemplate } from "@/components/templates/demo-template";
import { BreadcrumbStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import { deepLearningDemo } from "@/lib/demo-data";

const DEMO_URL = "https://ml-agency.com/demos/deep-learning";

export const metadata: Metadata = {
  title: "Neural Architecture Design | Deep Learning Demo",
  description:
    "Design and train custom deep learning models. Visual tools for architecture search and optimization.",
  openGraph: {
    title: "Neural Architecture Design | ML Agency",
    description:
      "Design and train custom deep learning models with visual architecture tools.",
    url: "https://ml-agency.com/demos/deep-learning",
  },
};

export default function DeepLearningDemo() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://ml-agency.com" },
          { name: "Demos", url: "https://ml-agency.com/demos" },
          { name: "Neural Architecture Design", url: DEMO_URL },
        ]}
      />
      <SoftwareApplicationStructuredData
        name="Neural Architecture Design Demo"
        description={deepLearningDemo.subtitle}
        url={DEMO_URL}
        applicationCategory="DeveloperApplication"
      />
      <DemoTemplate content={deepLearningDemo} />
    </>
  );
}