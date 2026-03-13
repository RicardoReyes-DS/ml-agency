"use client";

import { createElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  LucideProps,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoWrapper } from "@/components/demos/demo-wrapper";
import { DomainColoringCanvas } from "@/components/visuals/domain-coloring-canvas";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getFunctionConfig } from "@/lib/complex-functions";
import { DemoContent, getIconComponent } from "@/lib/demo-data";
import { getDictionary, localizeHref, type Locale } from "@/lib/i18n";
import { ComplexFunctionType } from "@/lib/types";

interface DemoTemplateProps {
  content: DemoContent;
  customDemoComponent?: React.ReactNode;
  locale?: Locale;
}

const categoryFunctionMap: Record<string, ComplexFunctionType> = {
  "computer-vision": "transfer",
  nlp: "sinc",
  "deep-learning": "essential",
  predictive: "mobius",
};

function DynamicIcon({
  name,
  className,
  ...props
}: { name: string; className?: string } & LucideProps) {
  const Icon = getIconComponent(name);
  return createElement(Icon, { className, ...props });
}

export function DemoTemplate({
  content,
  customDemoComponent,
  locale = "en",
}: DemoTemplateProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const functionType = categoryFunctionMap[content.demoCategory] || "transfer";
  const functionConfig = getFunctionConfig(functionType);
  const copy = getDictionary(locale).demoTemplate;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 bg-gradient-to-b from-background via-surface to-background pointer-events-none" />

      <InteractiveBlob
        className="top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[140px]"
        parallaxStrength={0.15}
        mouseStrength={0.18}
      />
      <InteractiveBlob
        className="bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[140px] delay-1000"
        parallaxStrength={-0.15}
        mouseStrength={0.2}
      />

      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={functionType}
          speed={functionConfig.recommendedSettings.speed}
          opacity={0.18}
          mouseInfluence={functionConfig.recommendedSettings.mouseInfluence}
          colorShift={functionConfig.recommendedSettings.colorShift}
          zoom={functionConfig.recommendedSettings.zoom}
          className="z-0 mix-blend-screen fixed"
        />
      )}

      <div className="relative z-10">
        <section className="pt-24 pb-10 md:pt-28 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <Button asChild variant="ghost" className="mb-4 text-foreground/70 hover:text-foreground">
                <Link href={localizeHref(locale, "/#services")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {copy.backToServices}
                </Link>
              </Button>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
              >
                <DynamicIcon name={content.badgeIcon} className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-gradient-primary font-mono">{content.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
              >
                {content.workflowTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
              >
                {content.workflowSummary}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-sm md:text-base text-foreground/60 max-w-3xl mx-auto leading-relaxed mt-4"
              >
                {content.problemStatement}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
              >
                <Button asChild size="lg" className="gradient-primary hover:shadow-xl glow-primary text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <a href={content.primaryCtaHref}>
                    {content.primaryCta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-primary/50 hover:border-accent/70 hover:bg-accent/5 text-foreground-muted hover:text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <Link href={content.secondaryCtaHref}>{content.secondaryCta}</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
              {content.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="h-full"
                >
                  <Card className="bg-surface/60 backdrop-blur-sm border-primary/10 text-center h-full">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xl md:text-2xl font-bold font-mono text-accent mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm md:text-base font-semibold text-foreground mb-0.5">
                        {metric.label}
                      </div>
                      <div className="text-xs text-foreground/70 line-clamp-2">
                        {metric.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="py-12"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-surface/60 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">{copy.helpsTitle}</CardTitle>
                  <CardDescription className="text-base">
                    {copy.helpsBody}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{outcome}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-surface/60 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">{copy.reviewTitle}</CardTitle>
                  <CardDescription className="text-base">
                    {copy.reviewBody}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.reviewChecklist.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <DynamicIcon name={content.badgeIcon} className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="py-8"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-surface/60 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">{copy.fitTitle}</CardTitle>
                  <CardDescription className="text-base">
                    {copy.fitBody}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.bestFit.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-surface/60 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">{copy.notFitTitle}</CardTitle>
                  <CardDescription className="text-base">
                    {copy.notFitBody}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.notFit.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <Badge variant="outline" className="border-primary/20 text-primary font-mono mb-4">
                  {copy.liveDemoBadge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {copy.liveDemoTitle}
                </h2>
                <p className="text-base md:text-lg text-foreground/70 max-w-3xl mx-auto">
                  {content.demoDescription}
                </p>
              </div>
              {customDemoComponent ? (
                customDemoComponent
              ) : (
                <DemoWrapper
                  locale={locale}
                  demo={{
                    id: content.demoId,
                    title: content.demoTitle,
                    description: content.demoDescription,
                    category: content.demoCategory,
                    technologies: content.demoTechnologies,
                    status: "live",
                  }}
                >
                  <div className="rounded-2xl border border-primary/10 bg-surface/50 p-6 text-center">
                    <p className="font-mono text-sm mb-2 text-accent font-medium">
                      {locale === "es" ? "Vista previa del demo" : "Demo preview"}
                    </p>
                    <p className="text-foreground/80">{content.subtitle}</p>
                  </div>
                </DemoWrapper>
              )}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {content.architectureTitle}
                {content.architectureTitle === copy.architectureTitle && copy.architectureAccent ? (
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {copy.architectureAccent}
                  </span>
                ) : null}
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                {content.architectureSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {content.architectureComponents.map((component, index) => (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-surface/60 backdrop-blur-sm border-primary/10 hover:border-accent/30 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 rounded-xl">
                          <DynamicIcon name={component.icon} className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <CardTitle>{component.title}</CardTitle>
                          <CardDescription>{component.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {component.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-foreground/75">{detail}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-amber-500/30 text-amber-300 font-mono mb-4">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                {content.challengesTitle}
              </Badge>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                {content.challengesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {content.challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.challenge}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-surface/60 backdrop-blur-sm border-primary/10 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">{challenge.challenge}</CardTitle>
                      <CardDescription>{challenge.solution}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/75">{challenge.impact}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="pb-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto bg-surface/60 backdrop-blur-sm border-primary/10">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl">{copy.ctaTitle}</CardTitle>
                <CardDescription className="text-base md:text-lg max-w-3xl mx-auto">
                  {copy.ctaBody}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary hover:shadow-xl glow-primary text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <a href={content.primaryCtaHref}>
                    {content.primaryCta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-primary/50 hover:border-accent/70 hover:bg-accent/5 text-foreground-muted hover:text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <Link href={content.secondaryCtaHref}>{content.secondaryCta}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
