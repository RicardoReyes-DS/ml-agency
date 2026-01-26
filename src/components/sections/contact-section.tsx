"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DomainColoringCanvas } from "@/components/visuals/domain-coloring-canvas";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Globe
} from "lucide-react";

export function ContactSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const contactSettings = getSectionSettings('contact');
  
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Engineering",
      description: "Direct line to our team",
      contact: "hello@ml-agency.com",
      action: "Send Email",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Calendar,
      title: "Book a Technical Call",
      description: "Speak directly with an engineer",
      contact: "30-minute discovery call",
      action: "Book Now",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: MessageCircle,
      title: "Support Chat",
      description: "Get quick answers",
      contact: "Available 24/7",
      action: "Start Chat",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "San Francisco Office",
      details: "123 Innovation Drive\nSan Francisco, CA 94105"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday: 9:00 AM - 6:00 PM PST\nWeekends: By appointment"
    },
    {
      icon: Globe,
      title: "Global Reach",
      details: "Serving clients worldwide\nRemote collaboration available"
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Enhanced Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />
      
      {/* Vibrant Ambient Glow - Visible immediately */}
      <InteractiveBlob 
        className="top-[15%] left-[10%] w-[45%] h-[45%] rounded-full bg-accent/20 blur-[120px]"
        parallaxStrength={0.12}
        mouseStrength={0.35}
      />
      <InteractiveBlob 
        className="bottom-[15%] right-[10%] w-[45%] h-[45%] rounded-full bg-primary/20 blur-[120px] delay-1000"
        parallaxStrength={-0.12}
        mouseStrength={0.55}
      />

      {/* Domain Coloring Background - Mobius flow for calming effect */}
      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={contactSettings.type}
          speed={contactSettings.recommendedSettings.speed}
          opacity={0.5}
          mouseInfluence={contactSettings.recommendedSettings.mouseInfluence}
          colorShift={contactSettings.recommendedSettings.colorShift}
          zoom={contactSettings.recommendedSettings.zoom}
          className="z-0 mix-blend-screen"
        />
      )}

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Send className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent font-mono">Get In Touch</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Let&apos;s Talk
            <span className="block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Shop
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
            No sales pitch. Just a conversation about your technical needs and business goals.
          </motion.p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
            >
              <Card className="group relative bg-surface/80 backdrop-blur-sm border-primary/10 hover:border-accent/30 transition-all duration-500 h-full overflow-hidden">
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <CardContent className="relative z-10 p-8 flex flex-col h-full">
                  {/* Content Section - Takes available space */}
                  <div className="flex-1 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors duration-300"
                    >
                      <method.icon className="h-8 w-8 text-accent" />
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

                  {/* Button Section - Aligned to bottom */}
                  <div className="mt-6">
                    <Button
                      className="w-full bg-primary/90 hover:bg-primary text-primary-foreground transition-all duration-300 group/btn"
                      size="lg"
                    >
                      {method.action}
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        →
                      </motion.div>
                    </Button>
                  </div>
                </CardContent>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-lg border border-accent/0 group-hover:border-accent/30 transition-colors duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Office Information & Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Office Information */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-3xl font-bold text-foreground mb-8"
            >
              Visit Our Office
            </motion.h3>

            <div className="space-y-6">
              {officeInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.8 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    <p className="text-foreground/70 leading-relaxed whitespace-pre-line">
                      {info.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="space-y-8">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 mb-6"
              >
                <Globe className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent font-mono">
                  Ready to Get Started?
                </span>
              </motion.div>

              <h3 className="text-2xl font-bold text-foreground mb-4">
                Start Your Pilot
              </h3>

              <p className="text-foreground/70 mb-6 leading-relaxed">
                Let&apos;s scope out a pilot project to prove the value. We start small and scale what works.
              </p>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Technical Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-sm text-foreground/60 text-center">
                  No commitment required • 30-minute discovery call
                </p>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-center"
            >
              <p className="text-sm text-foreground/60 mb-4">
                Trusted by industry leaders worldwide
              </p>
              <div className="flex items-center justify-center gap-8 opacity-60">
                {/* Placeholder for client logos - you can add actual logos here */}
                <div className="text-xs font-mono text-foreground/40">Fortune 500</div>
                <div className="text-xs font-mono text-foreground/40">Startups</div>
                <div className="text-xs font-mono text-foreground/40">Enterprise</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}