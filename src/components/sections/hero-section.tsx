"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles } from "lucide-react";
import { TypewriterText } from "@/components/visuals/typewriter-text";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import { getDictionary, localizeHref, type Locale } from "@/lib/i18n";
import { CONTACT_SUBJECTS, createMailto } from "@/lib/site";

const DomainColoringCanvas = dynamic(
  () => import("@/components/visuals/domain-coloring-canvas").then((mod) => mod.DomainColoringCanvas),
  { ssr: false }
);

export function HeroSection({ locale }: { locale: Locale }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroSettings = getSectionSettings("hero");
  const copy = getDictionary(locale).home.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-surface" />

      <InteractiveBlob
        className="top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/8 blur-[160px]"
        parallaxStrength={0.1}
        mouseStrength={0.16}
      />
      <InteractiveBlob
        className="bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/6 blur-[160px]"
        parallaxStrength={-0.05}
        mouseStrength={0.2}
      />

      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={heroSettings.type}
          colorMode={heroSettings.recommendedSettings.colorMode}
          speed={heroSettings.recommendedSettings.speed}
          opacity={0.22}
          mouseInfluence={heroSettings.recommendedSettings.mouseInfluence}
          colorShift={heroSettings.recommendedSettings.colorShift}
          zoom={heroSettings.recommendedSettings.zoom}
          className="z-0"
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 mb-8"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-gradient-primary font-mono">{copy.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            {copy.title}
            <span className="block text-gradient-primary">{copy.titleAccent}</span>
          </motion.h1>

          <div className="mb-6 min-h-[3.5rem] md:min-h-[4rem]">
            <TypewriterText
              texts={[...copy.typewriter]}
              className="text-lg md:text-2xl font-semibold text-foreground/80 leading-tight"
              typingSpeed={60}
              deletingSpeed={36}
              delayBetweenTexts={2400}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {copy.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button asChild size="lg" className="gradient-primary hover:shadow-xl glow-primary text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
              <a href={createMailto(locale === "es" ? CONTACT_SUBJECTS.revisionDeFlujo : CONTACT_SUBJECTS.workflowReview)}>
                {copy.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/50 hover:border-accent/70 hover:bg-accent/5 text-foreground-muted hover:text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <Link href={localizeHref(locale, copy.secondaryHref)}>{copy.secondaryCta}</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
          >
            {copy.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-2xl border border-white/8 bg-surface/55 backdrop-blur-md px-5 py-5 text-sm md:text-base text-foreground/80 shadow-[0_10px_40px_rgba(0,0,0,0.18)]"
              >
                {outcome}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
