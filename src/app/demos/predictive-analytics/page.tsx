import { DemoTemplate } from "@/components/templates/demo-template";
import { predictiveAnalyticsDemo } from "@/lib/demo-data";

export default function PredictiveAnalyticsDemo() {
  return <DemoTemplate content={predictiveAnalyticsDemo} />;
}