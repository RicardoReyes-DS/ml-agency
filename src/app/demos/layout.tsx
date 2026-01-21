import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ML Demos | ML Agency",
  description: "Explore our machine learning model demonstrations with detailed technical explanations and interactive experiences.",
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