"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/visuals/typewriter-text";
import dynamic from 'next/dynamic';

const DomainColoringCanvas = dynamic(
  () => import('@/components/visuals/domain-coloring-canvas').then((mod) => mod.DomainColoringCanvas),
  { ssr: false }
);
import { MetricsDisplay } from "@/components/visuals/metrics-display";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import { ArrowRight, Sparkles } from "lucide-react";

const heroMetrics = [
  {
    label: "Model Precision",
    value: 98,
    suffix: ".5%",
    description: "Average accuracy"
  },
  {
    label: "Deployed Models",
    value: 247,
    suffix: "+",
    description: "In production"
  },
  {
    label: "Inference Speed",
    value: 150,
    suffix: "ms",
    description: "Avg latency"
  },
  {
    label: "Active Pilots",
    value: 89,
    suffix: "+",
    description: "Ongoing projects"
  }
];

export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroSettings = getSectionSettings('hero');
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Fallback Background for LCP and Reduced Motion */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-surface" />
      
      {/* Subtle Ambient Glow - Professional and refined */}
      <InteractiveBlob 
        className="top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px]"
        parallaxStrength={0.1}
        mouseStrength={0.2}
      />
      <InteractiveBlob 
        className="bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/8 blur-[150px]"
        parallaxStrength={-0.05}
        mouseStrength={0.3}
      />

      {/* Domain Coloring Background - sophisticated mathematical visualization */}
      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={heroSettings.type}
          colorMode={heroSettings.recommendedSettings.colorMode}
          speed={heroSettings.recommendedSettings.speed}
          opacity={heroSettings.recommendedSettings.opacity}
          mouseInfluence={heroSettings.recommendedSettings.mouseInfluence}
          colorShift={heroSettings.recommendedSettings.colorShift}
          zoom={heroSettings.recommendedSettings.zoom}
          className="z-0"
        />
      )}


      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 mb-8 glow-primary"
          >
            <Sparkles className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
            <span className="text-sm font-medium text-gradient-primary font-mono">Production-Ready ML</span>
          </motion.div>

          {/* Main Headline with Typewriter Effect */}
          <div className="mb-6">
            <TypewriterText
              texts={[
                "Custom Machine Learning",
                "Automated Decision Systems",
                "Predictive Analytics",
                "Computer Vision Systems",
                "NLP & Text Analysis"
              ]}
              className="text-4xl md:text-7xl lg:text-8xl font-bold text-gradient-primary leading-tight"
              typingSpeed={80}
              deletingSpeed={40}
              delayBetweenTexts={3000}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            We build custom machine learning solutions that solve real business problems. No hype, just measurable results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="gradient-primary hover:shadow-xl glow-primary text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              See Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/50 hover:border-accent/70 hover:bg-accent/5 text-foreground-muted hover:text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:glow-accent"
            >
              Talk to an Engineer
            </Button>
          </motion.div>

          {/* Metrics Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <MetricsDisplay metrics={heroMetrics} />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}