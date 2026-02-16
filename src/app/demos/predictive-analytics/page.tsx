import type { Metadata } from "next";
import { DemoTemplate } from "@/components/templates/demo-template";
import { BreadcrumbStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import { predictiveAnalyticsDemo } from "@/lib/demo-data";

const DEMO_URL = "https://ml-agency.com/demos/predictive-analytics";

export const metadata: Metadata = {
  title: "Predictive Analytics | Forecasting Demo",
  description:
    "Real-time forecasting and anomaly detection for time-series data. Predictive maintenance and trend analysis.",
  openGraph: {
    title: "Predictive Analytics | ML Agency",
    description:
      "Real-time forecasting and anomaly detection for time-series data.",
    url: "https://ml-agency.com/demos/predictive-analytics",
  },
};

export default function PredictiveAnalyticsDemo() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://ml-agency.com" },
          { name: "Demos", url: "https://ml-agency.com/demos" },
          { name: "Predictive Analytics", url: DEMO_URL },
        ]}
      />
      <SoftwareApplicationStructuredData
        name="Predictive Analytics Demo"
        description={predictiveAnalyticsDemo.subtitle}
        url={DEMO_URL}
        applicationCategory="DeveloperApplication"
      />
      <DemoTemplate content={predictiveAnalyticsDemo} />
    </>
  );
}