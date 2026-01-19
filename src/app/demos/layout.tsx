import { Metadata } from "next";
import { Navbar } from "@/components/ui/navbar";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";

export const metadata: Metadata = {
  title: "ML Demos | ML Agency",
  description: "Explore our machine learning model demonstrations with detailed technical explanations and interactive experiences.",
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {children}
      </main>
      <PerformanceMonitor />
    </>
  );
}