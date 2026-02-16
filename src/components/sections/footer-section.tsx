"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import { cn } from "@/lib/utils";
import type { FooterNavLink, FooterContactInfo, FooterSocialLink } from "@/lib/types";
import {
  Cpu,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import dynamic from "next/dynamic";

const DomainColoringCanvas = dynamic(
  () =>
    import("@/components/visuals/domain-coloring-canvas").then((mod) => mod.DomainColoringCanvas),
  { ssr: false }
);

const footerLinks: FooterNavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const demoLinks: FooterNavLink[] = [
  { label: "NLP & RAG", href: "/demos/nlp" },
  { label: "Computer Vision", href: "/demos/computer-vision" },
  { label: "Predictive Analytics", href: "/demos/predictive-analytics" },
  { label: "Deep Learning", href: "/demos/deep-learning" },
];

const contactInfo: FooterContactInfo = {
  email: "hello@ml-agency.com",
  phone: "+1-555-0123",
  address: "123 Innovation Drive, San Francisco, CA 94105",
};

const socialLinks: FooterSocialLink[] = [
  { name: "Twitter", href: "https://twitter.com/mlagency", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/ml-agency", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/ml-agency", icon: Github },
];

/** Shared styles for interactive links - WCAG 44px tap target, focus ring for a11y */
const linkFocusStyles =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded";

export function FooterSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const footerSettings = getSectionSettings("footer");

  // Respect prefers-reduced-motion: users with vestibular disorders need static layouts
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      };

  return (
    <footer className="relative w-full min-h-[60vh] overflow-hidden">
      {/* Enhanced Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />

      {/* Ambient Glow - Hero-style blobs */}
      <InteractiveBlob
        className="top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-primary/10 blur-[150px]"
        parallaxStrength={0.1}
        mouseStrength={0.2}
      />
      <InteractiveBlob
        className="bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-accent/10 blur-[150px]"
        parallaxStrength={-0.08}
        mouseStrength={0.25}
      />

      {/* Domain Coloring Background - Low opacity for subtle effect */}
      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={footerSettings.type}
          colorMode={footerSettings.recommendedSettings.colorMode}
          speed={footerSettings.recommendedSettings.speed}
          opacity={0.25}
          mouseInfluence={footerSettings.recommendedSettings.mouseInfluence}
          colorShift={footerSettings.recommendedSettings.colorShift}
          zoom={footerSettings.recommendedSettings.zoom}
          className="z-0 mix-blend-screen"
        />
      )}

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div {...motionProps} className="lg:col-span-1">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2 mb-6 min-h-[44px] min-w-[44px] rounded-lg",
                linkFocusStyles
              )}
            >
              <Cpu className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-mono">
                <span className="text-gradient-primary">ML</span>
                <span className="text-accent">Agency</span>
              </span>
            </Link>
            <p className="text-sm md:text-base text-foreground-muted max-w-xs">
              Custom machine learning solutions. No hype, just measurable results.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav {...motionProps} aria-label="Footer navigation">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm md:text-base text-foreground-muted hover:text-primary transition-colors duration-200 py-2 block min-h-[44px] flex items-center",
                      linkFocusStyles
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <span className="text-sm text-foreground-subtle block mb-2">Demos</span>
                <ul className="space-y-2">
                  {demoLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-sm md:text-base text-foreground-muted hover:text-primary transition-colors duration-200 py-1 block min-h-[44px] flex items-center",
                          linkFocusStyles
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </motion.nav>

          {/* Contact Info */}
          <motion.address
            {...motionProps}
            className="not-italic"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className={cn(
                  "flex items-center gap-3 text-sm md:text-base text-foreground-muted hover:text-primary transition-colors min-h-[44px]",
                  linkFocusStyles
                )}
              >
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                className={cn(
                  "flex items-center gap-3 text-sm md:text-base text-foreground-muted hover:text-primary transition-colors min-h-[44px]",
                  linkFocusStyles
                )}
              >
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                {contactInfo.phone}
              </a>
              <div className="flex items-start gap-3 text-sm md:text-base text-foreground-muted min-h-[44px]">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{contactInfo.address}</span>
              </div>
            </div>
          </motion.address>

          {/* CTA Column */}
          <motion.div {...motionProps}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              Start Your Pilot
            </h3>
            <p className="text-sm md:text-base text-foreground-muted mb-6">
              Book a 30-min call to clarify your next steps. Zero obligations.
            </p>
            <Link
              href="/#contact"
              className={cn(
                "inline-flex items-center justify-center w-full min-h-[44px] gradient-primary hover:shadow-xl glow-primary text-white px-6 py-4 font-semibold transition-all duration-300 rounded-md",
                linkFocusStyles
              )}
            >
              Book Technical Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Bar: Legal + Social */}
        <motion.div
          {...motionProps}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <Link
              href="/privacy"
              className={cn(
                "text-sm text-foreground-muted hover:text-primary transition-colors min-h-[44px] flex items-center",
                linkFocusStyles
              )}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className={cn(
                "text-sm text-foreground-muted hover:text-primary transition-colors min-h-[44px] flex items-center",
                linkFocusStyles
              )}
            >
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={cn(
                  "flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-surface/60 hover:bg-primary/10 text-foreground-muted hover:text-primary transition-all duration-300",
                  linkFocusStyles
                )}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
