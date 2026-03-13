"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DomainColoringCanvas } from "@/components/visuals/domain-coloring-canvas";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import { getDictionary, localizeHref, type Locale } from "@/lib/i18n";

const methodIcons = [Mail, MessageCircle, Calendar];
const methodColors = [
  "from-blue-500/20 to-blue-600/20",
  "from-purple-500/20 to-purple-600/20",
  "from-emerald-500/20 to-emerald-600/20",
];

export function ContactSection({ locale }: { locale: Locale }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const contactSettings = getSectionSettings("contact");
  const copy = getDictionary(locale).home.contact;

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />

      <InteractiveBlob
        className="top-[15%] left-[10%] w-[45%] h-[45%] rounded-full bg-accent/10 blur-[130px]"
        parallaxStrength={0.12}
        mouseStrength={0.2}
      />
      <InteractiveBlob
        className="bottom-[15%] right-[10%] w-[45%] h-[45%] rounded-full bg-primary/10 blur-[130px] delay-1000"
        parallaxStrength={-0.12}
        mouseStrength={0.22}
      />

      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={contactSettings.type}
          speed={contactSettings.recommendedSettings.speed}
          opacity={0.18}
          mouseInfluence={contactSettings.recommendedSettings.mouseInfluence}
          colorShift={contactSettings.recommendedSettings.colorShift}
          zoom={contactSettings.recommendedSettings.zoom}
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Send className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent font-mono">{copy.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            {copy.title}
            <span className="block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {copy.methods.map((method, index) => {
            const Icon = methodIcons[index] ?? Mail;
            const color = methodColors[index] ?? methodColors[0];

            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <Card className="group relative bg-surface/80 backdrop-blur-sm border-primary/10 hover:border-accent/30 transition-all duration-500 h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <CardContent className="relative z-10 p-8 flex flex-col h-full">
                    <div className="flex-1 text-center">
                      <motion.div
                        whileHover={{ scale: 1.06, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors duration-300"
                      >
                        <Icon className="h-8 w-8 text-accent" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                        {method.title}
                      </h3>

                      <p className="text-foreground/70 mb-4 leading-relaxed">
                        {method.description}
                      </p>

                      <div className="font-mono text-accent font-medium text-lg">
                        {method.contact}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild className="w-full bg-primary/90 hover:bg-primary text-primary-foreground transition-all duration-300 group/btn" size="lg">
                        <Link href={localizeHref(locale, method.href)}>
                          {method.action}
                          <motion.div
                            className="ml-2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            →
                          </motion.div>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>

                  <div className="absolute inset-0 rounded-lg border border-accent/0 group-hover:border-accent/30 transition-colors duration-500" />
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-3xl font-bold text-foreground mb-8"
            >
              {copy.checklistTitle}
            </motion.h3>

            <div className="space-y-5">
              {copy.checklist.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.8 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground leading-relaxed">
                      {item}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="contact-cta" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="bg-surface/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-8"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary font-mono">{copy.badge}</span>
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {copy.ctaCardTitle}
              </h3>

              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                {copy.ctaCardBody}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1 gradient-primary hover:shadow-xl glow-primary text-white">
                  <a href="mailto:hello@ml-agency.com?subject=Technical%20Review">
                    {copy.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 border-primary/30 hover:border-accent/50">
                  <Link href={localizeHref(locale, "/demos")}>{copy.ctaSecondary}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
