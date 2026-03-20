"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building,
  Code,
  GraduationCap,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DomainColoringCanvas } from "@/components/visuals/domain-coloring-canvas";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { Card, CardContent } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import { getDictionary, localizeHref, type Locale } from "@/lib/i18n";
import { CONTACT_SUBJECTS, createMailto } from "@/lib/site";

const achievementIcons = [Users, Award, TrendingUp, Target];
const principleIcons = [Lightbulb, Code, GraduationCap, Building];

export function AboutSection({ locale }: { locale: Locale }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const aboutSettings = getSectionSettings("about");
  const copy = getDictionary(locale).home.about;

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />

      <InteractiveBlob
        className="top-[20%] right-[-5%] w-[45%] h-[45%] rounded-full bg-primary/10 blur-[120px]"
        parallaxStrength={0.1}
        mouseStrength={0.18}
      />
      <InteractiveBlob
        className="bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] delay-1000"
        parallaxStrength={-0.1}
        mouseStrength={0.2}
      />

      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={aboutSettings.type}
          speed={aboutSettings.recommendedSettings.speed}
          opacity={0.18}
          mouseInfluence={aboutSettings.recommendedSettings.mouseInfluence}
          colorShift={aboutSettings.recommendedSettings.colorShift}
          zoom={aboutSettings.recommendedSettings.zoom}
          className="z-0 mix-blend-screen"
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "65px 65px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary font-mono">{copy.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            {copy.title}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {copy.titleAccent}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed"
          >
            {copy.body}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {copy.achievements.map((achievement, index) => {
            const Icon = achievementIcons[index] ?? Users;

            return (
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
                    <Icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
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
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {copy.practiceTitle}
              </h3>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                {copy.practiceBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <a href={createMailto(locale === "es" ? CONTACT_SUBJECTS.revisionDeFlujo : CONTACT_SUBJECTS.workflowReview)}>
                  {copy.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-3xl font-bold text-foreground mb-8"
            >
              {copy.principlesTitle}
            </motion.h3>

            <div className="space-y-6">
              {copy.principles.map((value, index) => {
                const Icon = principleIcons[index] ?? Lightbulb;

                return (
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
                          <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-accent/10 transition-colors duration-300">
                            <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-foreground mb-2">{value.title}</h4>
                            <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
