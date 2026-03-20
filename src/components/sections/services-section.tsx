"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Eye, MessageSquare, Microscope, Target, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DomainColoringCanvas } from "@/components/visuals/domain-coloring-canvas";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { useMagneticField } from "@/hooks/use-magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import { getDictionary, localizeHref, type Locale } from "@/lib/i18n";
import { CONTACT_SUBJECTS, createMailto } from "@/lib/site";

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();
  }, []);

  return isTouchDevice;
}

const serviceIcons = [Eye, MessageSquare, Brain, TrendingUp];
const serviceColors = [
  "from-blue-500/20 to-blue-600/20",
  "from-purple-500/20 to-purple-600/20",
  "from-emerald-500/20 to-emerald-600/20",
  "from-orange-500/20 to-orange-600/20",
];

const getDemoUrl = (serviceKey: string) => {
  const urlMap: Record<string, string> = {
    computerVision: "/demos/computer-vision",
    nlp: "/demos/nlp",
    deepLearning: "/demos/deep-learning",
    predictiveAnalytics: "/demos/predictive-analytics",
  };

  return urlMap[serviceKey] ?? "#";
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
};

export function ServicesSection({ locale }: { locale: Locale }) {
  const isTouchDevice = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const servicesSettings = getSectionSettings("services");
  const copy = getDictionary(locale).home.services;

  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const cardRefs = useMemo(() => [ref0, ref1, ref2, ref3], []);

  const magneticStates = useMagneticField(isTouchDevice ? [] : cardRefs, {
    strength: 0.14,
    range: 90,
    ease: 0.12,
  });

  const enableComplexAnimations = !isTouchDevice && !prefersReducedMotion;

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />

      <InteractiveBlob
        className="top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"
        parallaxStrength={0.15}
        mouseStrength={0.22}
      />
      <InteractiveBlob
        className="bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] delay-1000"
        parallaxStrength={-0.15}
        mouseStrength={0.24}
      />

      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={servicesSettings.type}
          speed={servicesSettings.recommendedSettings.speed}
          opacity={0.22}
          mouseInfluence={servicesSettings.recommendedSettings.mouseInfluence}
          colorShift={servicesSettings.recommendedSettings.colorShift}
          zoom={servicesSettings.recommendedSettings.zoom}
          className="z-0 mix-blend-screen"
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-secondary/10 to-tertiary/10 border border-secondary/30"
            >
              <Microscope className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-secondary font-mono">{copy.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              {copy.title}
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                {copy.titleAccent}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-foreground/70 leading-relaxed"
            >
              {copy.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button asChild size="lg" className="gradient-accent hover:shadow-xl glow-accent text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                <a href={createMailto(locale === "es" ? CONTACT_SUBJECTS.revisionDeFlujo : CONTACT_SUBJECTS.workflowReview)}>
                  {copy.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {copy.cards.map((service, index) => {
            const Icon = serviceIcons[index] ?? Eye;
            const color = serviceColors[index] ?? serviceColors[0];

            return (
              <motion.div
                key={service.title}
                ref={cardRefs[index]}
                variants={itemVariants}
                animate={enableComplexAnimations ? {
                  x: magneticStates[index]?.x || 0,
                  y: magneticStates[index]?.y || 0,
                  scale: magneticStates[index]?.isActive ? 1.02 : 1,
                  rotateX: magneticStates[index]?.isActive ? 2 : 0,
                  rotateY: magneticStates[index]?.isActive ? 2 : 0,
                } : undefined}
                whileHover={enableComplexAnimations ? {
                  scale: 1.015,
                  rotateX: 1.5,
                  rotateY: 1.5,
                  transition: {
                    type: "spring",
                    stiffness: 240,
                    damping: 28,
                  },
                } : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <Card className="group relative bg-surface-hover/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 h-full overflow-hidden hover:glow-primary">
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-all duration-300" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                        className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20"
                      >
                        <span className="text-xs font-mono text-accent font-medium">
                          {service.metric}
                        </span>
                      </motion.div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                      {service.title}
                    </CardTitle>

                    <CardDescription className="text-foreground/70 leading-relaxed text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + index * 0.1 + featureIndex * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span className="text-sm text-foreground/80 font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="mt-6 pt-4 border-t border-primary/10"
                    >
                      <Button asChild variant="ghost" className="min-h-[44px] px-4 py-2 text-primary hover:text-accent font-medium transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,107,107,0.6)] active:bg-primary/20 active:scale-95">
                        <Link href={localizeHref(locale, getDemoUrl(service.slug))}>
                          {copy.exploreCta}
                          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>

                  <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
            >
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary font-mono">
                {locale === "es" ? "Necesitas un punto de partida pragmatico?" : "Need a pragmatic starting point?"}
              </span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {locale === "es" ? "Empieza con un flujo," : "Start with one workflow,"}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {locale === "es" ? "no con un programa gigante de transformacion" : "not a giant transformation program"}
              </span>
            </h3>

            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              {locale === "es"
                ? "Validaremos el flujo, la preparacion de datos y el alcance del piloto antes de recomendar cualquier build."
                : "We&apos;ll pressure-test the workflow, data readiness, and pilot scope before recommending any build."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-accent hover:shadow-xl glow-accent text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                <a href={createMailto(locale === "es" ? CONTACT_SUBJECTS.revisionDeFlujo : CONTACT_SUBJECTS.workflowReview)}>
                  {copy.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300">
                <Link href={localizeHref(locale, "/demos/computer-vision")}>
                  <Target className="mr-2 h-5 w-5" />
                  {locale === "es" ? "Ver demos en vivo" : "See Live Demos"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
