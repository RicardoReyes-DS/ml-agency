"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/visuals/floating-particles";
import { Card, CardContent } from "@/components/ui/card";
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
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI, constantly exploring new architectures and methodologies."
    },
    {
      icon: Code,
      title: "Engineering Excellence",
      description: "Every solution is built for scale, performance, and reliability in production environments."
    },
    {
      icon: GraduationCap,
      title: "Scientific Rigor",
      description: "Our work is grounded in peer-reviewed research and validated through rigorous testing and validation."
    },
    {
      icon: Building,
      title: "Business Impact",
      description: "We measure success by the tangible value we create for our clients and their customers."
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/3 via-transparent to-accent/3" />
      <FloatingParticles count={18} className="opacity-20" />

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
            Bridging Research
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              & Reality
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
            Founded by leading AI researchers from top universities, we transform groundbreaking
            academic research into production-ready solutions that drive real business value.
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
                  We exist to democratize access to cutting-edge AI technology. By combining world-class
                  research with pragmatic engineering, we help organizations of all sizes harness the
                  transformative power of machine learning.
                </p>
                <p>
                  Our team brings together the best of academia and industry: PhD researchers who
                  publish in top conferences, and engineers who build systems that serve millions of users daily.
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
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Industry?
              </span>
            </h3>

            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you harness the power of AI to solve your most challenging problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 hover:border-accent/50 text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Award className="mr-2 h-5 w-5" />
                View Our Research
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}