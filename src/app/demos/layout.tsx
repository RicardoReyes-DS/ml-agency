import { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Workflow-Led ML Demos | ${SITE_NAME}`,
  description: "Explore machine learning demos framed around real workflows, operational constraints, and pilot-friendly use cases.",
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: Navbar and PerformanceMonitor are included in the root layout 
  // (src/app/layout.tsx) so we don't include them here to avoid duplication
  return (
    <main className="min-h-screen bg-background">
      {children}
    </main>
  );
}
