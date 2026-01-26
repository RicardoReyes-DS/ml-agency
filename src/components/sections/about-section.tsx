"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DomainColoringCanvas } from "@/components/visuals/domain-coloring-canvas";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { Card, CardContent } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import {
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  Code,
  GraduationCap,
  Building
} from "lucide-react";

export function AboutSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const aboutSettings = getSectionSettings('about');
  
  const achievements = [
    {
      icon: Users,
      value: "50+",
      label: "PhD Researchers",
      description: "World-class AI experts"
    },
    {
      icon: Award,
      value: "1000+",
      label: "Projects Delivered",
      description: "Production-ready solutions"
    },
    {
      icon: TrendingUp,
      value: "300%",
      label: "Avg ROI Increase",
      description: "For our clients"
    },
    {
      icon: Target,
      value: "99.9%",
      label: "System Uptime",
      description: "Enterprise reliability"
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Practical Innovation",
      description: "We explore new tech only when it solves a problem better."
    },
    {
      icon: Code,
      title: "Production Ready",
      description: "Code built to run reliably 24/7."
    },
    {
      icon: GraduationCap,
      title: "Data Driven",
      description: "Decisions based on evidence, not guesswork."
    },
    {
      icon: Building,
      title: "Measurable ROI",
      description: "We track success by the value we create."
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Enhanced Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />
      
      {/* Vibrant Ambient Glow - Visible immediately */}
      <InteractiveBlob 
        className="top-[20%] right-[-5%] w-[45%] h-[45%] rounded-full bg-primary/20 blur-[110px]"
        parallaxStrength={0.1}
        mouseStrength={0.25}
      />
      <InteractiveBlob 
        className="bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[110px] delay-1000"
        parallaxStrength={-0.1}
        mouseStrength={0.4}
      />

      {/* Domain Coloring Background - essential singularity spirals */}
      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={aboutSettings.type}
          speed={aboutSettings.recommendedSettings.speed}
          opacity={0.5}
          mouseInfluence={aboutSettings.recommendedSettings.mouseInfluence}
          colorShift={aboutSettings.recommendedSettings.colorShift}
          zoom={aboutSettings.recommendedSettings.zoom}
          className="z-0 mix-blend-screen"
        />
      )}

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '65px 65px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary font-mono">Our Story</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Research-Grade
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Engineering
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed"
          >
            We combine academic rigor with production engineering. Our team delivers solutions that don&apos;t just look good in a paper—they work in the real world.
          </motion.p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <Card className="bg-surface/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <achievement.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold font-mono text-accent mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-sm text-foreground/70">
                    {achievement.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center"
        >
          {/* Left Column - Mission */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h3>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  We apply machine learning to practical business challenges. Our focus is on reliability,
                  scalability, and measurable impact.
                </p>
                <p>
                  We bridge the gap between research labs and production environments, ensuring your models
                  perform as well in the real world as they do in development.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Meet Our Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-3xl font-bold text-foreground mb-8"
            >
              Our Values
            </motion.h3>

            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <Card className="bg-surface/40 backdrop-blur-sm border-primary/10 hover:border-accent/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <value.icon className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                            {value.title}
                          </h4>
                          <p className="text-foreground/70 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
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
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary font-mono">
                Join the AI Revolution
              </span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Have a Specific
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Challenge?
              </span>
            </h3>

            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Tell us about your data and your goals. We&apos;ll tell you if we can help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 hover:border-accent/50 text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Award className="mr-2 h-5 w-5" />
                Read Technical Blog
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}