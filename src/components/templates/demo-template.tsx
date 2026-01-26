"use client";

import { createElement } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// // import { FloatingParticles } from "@/components/visuals/floating-particles";
import { DomainColoringCanvas } from "@/components/visuals/domain-coloring-canvas";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { DemoWrapper } from "@/components/demos/demo-wrapper";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  LucideProps
} from "lucide-react";
import Link from "next/link";
import { DemoContent, getIconComponent } from "@/lib/demo-data";
import { getFunctionConfig } from "@/lib/complex-functions";
import { ComplexFunctionType } from "@/lib/types";

interface DemoTemplateProps {
  content: DemoContent;
  customDemoComponent?: React.ReactNode;
}

const categoryFunctionMap: Record<string, ComplexFunctionType> = {
  'computer-vision': 'transfer',
  'nlp': 'sinc',
  'deep-learning': 'essential',
  'predictive': 'mobius'
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
  hidden: { opacity: 0, y: 30 },
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

function DynamicIcon({ name, className, ...props }: { name: string, className?: string } & LucideProps) {
  const Icon = getIconComponent(name);
  return createElement(Icon, { className, ...props });
}

export function DemoTemplate({ content, customDemoComponent }: DemoTemplateProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const functionType = categoryFunctionMap[content.demoCategory] || 'transfer';
  const functionConfig = getFunctionConfig(functionType);
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-surface to-background pointer-events-none" />
      
      {/* Vibrant Ambient Glow - Visible immediately */}
      <InteractiveBlob 
        className="top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"
        parallaxStrength={0.15}
        mouseStrength={0.3}
      />
      <InteractiveBlob 
        className="bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] delay-1000"
        parallaxStrength={-0.15}
        mouseStrength={0.5}
      />

      {/* Domain Coloring Background */}
      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={functionType}
          speed={functionConfig.recommendedSettings.speed}
          opacity={0.5}
          mouseInfluence={functionConfig.recommendedSettings.mouseInfluence}
          colorShift={functionConfig.recommendedSettings.colorShift}
          zoom={functionConfig.recommendedSettings.zoom}
          className="z-0 mix-blend-screen fixed"
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <section className="pt-24 pb-6 md:pt-28 md:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link href="/#services">
                <Button variant="ghost" className="mb-4 text-foreground/70 hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Button>
              </Link>

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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-primary mb-3 leading-tight"
              >
                {content.title.split(' ').slice(0, -1).join(' ')}
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {content.title.split(' ').slice(-1)}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto leading-relaxed"
              >
                {content.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Metrics Dashboard */}
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
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

      {/* Interactive Demo */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {customDemoComponent ? (
              customDemoComponent
            ) : (
            <DemoWrapper demo={{
              id: content.demoId,
              title: content.demoTitle,
              description: content.demoDescription,
              category: content.demoCategory,
              technologies: content.demoTechnologies,
              status: "live",
            }}>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="font-mono text-sm mb-3 text-accent font-medium">
                    {content.demoCategory === 'computer-vision' && 'Live Detection Results:'}
                    {content.demoCategory === 'nlp' && 'Real-time Sentiment Analysis:'}
                    {content.demoCategory === 'deep-learning' && 'Live Training Metrics:'}
                    {content.demoCategory === 'predictive' && 'Live Predictive Analytics:'}
                  </p>
                  <div className="bg-surface/50 rounded-lg p-4 border border-primary/10">
                    <div className="flex items-center justify-center gap-3">
                      {content.demoCategory === 'computer-vision' && (
                        <>
                          <DynamicIcon name={content.badgeIcon} className="h-5 w-5 text-primary" />
                          <span className="text-lg font-semibold text-foreground">
                            Object detected with <span className="text-accent">98.5%</span> confidence
                          </span>
                        </>
                      )}
                      {content.demoCategory === 'nlp' && (
                        <>
                          <DynamicIcon name={content.badgeIcon} className="h-5 w-5 text-accent" />
                          <span className="text-lg font-semibold text-foreground">
                            Sentiment: <span className="text-accent">Positive</span> (94% confidence)
                          </span>
                        </>
                      )}
                      {content.demoCategory === 'deep-learning' && (
                        <>
                          <DynamicIcon name={content.badgeIcon} className="h-5 w-5 text-primary" />
                          <span className="text-lg font-semibold text-foreground">
                            Epoch 47/100 - Loss: <span className="text-primary">0.0234</span> - Accuracy: <span className="text-accent">96.7%</span>
                          </span>
                        </>
                      )}
                      {content.demoCategory === 'predictive' && (
                        <>
                          <DynamicIcon name={content.badgeIcon} className="h-5 w-5 text-accent" />
                          <span className="text-lg font-semibold text-foreground">
                            Equipment failure predicted in <span className="text-accent">47 hours</span> - Confidence: <span className="text-primary">94.2%</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-accent rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6
                    }}
                    className="w-2 h-2 bg-accent rounded-full"
                  />
                </div>
              </div>
            </DemoWrapper>
            )}
          </div>
        </div>
      </motion.section>

      {/* Model Architecture */}
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
              {content.architectureTitle.split(' ').slice(0, -2).join(' ')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {content.architectureTitle.split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {content.architectureSubtitle}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {content.architectureComponents.map((component, index) => {
              return (
                <motion.div key={component.title} variants={itemVariants}>
                  <Card className="bg-surface/60 backdrop-blur-sm border-primary/10 hover:border-accent/30 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 rounded-xl">
                          <DynamicIcon name={component.icon} className="h-6 w-6 text-accent" />
                        </div>
                      <div>
                        <CardTitle className="text-xl">{component.title}</CardTitle>
                        <Badge variant="outline" className="mt-1 border-accent/20">
                          Component {index + 1}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {component.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {component.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Technical Challenges & Solutions */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="py-20 bg-surface/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {content.challengesTitle.split(' ').slice(0, -1).join(' ')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {content.challengesTitle.split(' ').slice(-1)}
              </span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {content.challengesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {content.challenges.map((item, index) => (
              <motion.div
                key={item.challenge}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
              >
                <Card className="bg-surface/80 backdrop-blur-sm border-accent/10 hover:border-accent/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-xl mb-2">{item.challenge}</CardTitle>
                        <CardDescription className="text-base leading-relaxed mb-4">
                          {item.solution}
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-accent" />
                          <span className="text-sm font-medium text-accent">
                            {item.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Implementation Details */}
      {content.implementationTitle && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {content.implementationTitle}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {content.implementationTitle.includes('Pre-training') ? 'Pre-training & Fine-tuning' :
                     content.implementationTitle.includes('End-to-End') ? 'End-to-End Process' :
                     'Implementation Details'}
                  </span>
                </h2>
              </div>

              {content.pipelineStages ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {content.pipelineStages.map((stage, index) => (
                    <motion.div
                      key={stage.stage}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                    >
                      <Card className="bg-surface/60 backdrop-blur-sm border-primary/10 text-center">
                        <CardHeader>
                          <div className="p-3 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                            <DynamicIcon name={stage.icon} className="h-6 w-6 text-accent" />
                          </div>
                          <CardTitle className="text-lg">{stage.stage}</CardTitle>
                          <CardDescription className="text-sm">
                            {stage.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-foreground/80">Technologies:</h4>
                            <div className="flex flex-wrap gap-1">
                              {stage.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : content.trainingPhases ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.trainingPhases.map((phase, index) => (
                    <motion.div
                      key={phase.phase}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                    >
                      <Card className="bg-surface/60 backdrop-blur-sm border-primary/10">
                        <CardHeader className="text-center">
                          <div className="text-3xl font-bold font-mono text-primary mb-2">
                            {phase.duration}
                          </div>
                          <CardTitle className="text-lg">{phase.phase}</CardTitle>
                          <CardDescription className="text-sm">
                            {phase.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {phase.techniques.map((technique, techIndex) => (
                              <li key={techIndex} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                <span className="text-xs text-foreground/80">{technique}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </motion.section>
      )}

      {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-surface/30"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 mb-8"
              >
                <DynamicIcon name={content.badgeIcon} className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-accent font-mono">
                  Ready to {content.ctaTitle.split(' ')[1].toLowerCase().includes('build') ? 'Build' :
                           content.ctaTitle.split(' ')[1].toLowerCase().includes('deploy') ? 'Deploy' :
                           content.ctaTitle.split(' ')[1].toLowerCase().includes('transform') ? 'Transform' :
                           content.ctaTitle.split(' ')[1].toLowerCase().includes('design') ? 'Design' :
                           'Get Started'}?
                </span>
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {content.ctaTitle}
              </h3>

              <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                {content.ctaSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gradient-primary hover:shadow-xl glow-primary text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {content.primaryCta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  <DynamicIcon name={content.secondaryCtaIcon} className="mr-2 h-5 w-5" />
                  {content.secondaryCta}
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>{/* End Main Content Container */}
    </div>
  );
}