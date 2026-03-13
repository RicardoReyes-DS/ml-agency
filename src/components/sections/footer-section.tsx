"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Cpu, Mail, MessageCircle, Workflow } from "lucide-react";
import { InteractiveBlob } from "@/components/visuals/interactive-blob";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { getSectionSettings } from "@/lib/complex-functions";
import { cn } from "@/lib/utils";
import { getDictionary, getLocaleFromPathname, localizeHref } from "@/lib/i18n";

const DomainColoringCanvas = dynamic(
  () => import("@/components/visuals/domain-coloring-canvas").then((mod) => mod.DomainColoringCanvas),
  { ssr: false }
);

const linkFocusStyles =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded";

export function FooterSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const footerSettings = getSectionSettings("footer");
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = getDictionary(locale).footer;

  const footerLinks = [
    { label: getDictionary(locale).navbar.links[0].label, href: "/#home" },
    { label: getDictionary(locale).navbar.links[1].label, href: "/#services" },
    { label: getDictionary(locale).navbar.links[2].label, href: "/#about" },
    { label: getDictionary(locale).navbar.links[3].label, href: "/#contact" },
  ];

  const demoLinks = [
    { label: locale === "es" ? "PLN e inteligencia documental" : "NLP & RAG", href: "/demos/nlp" },
    { label: locale === "es" ? "Vision por computadora" : "Computer Vision", href: "/demos/computer-vision" },
    { label: locale === "es" ? "Analitica predictiva" : "Predictive Analytics", href: "/demos/predictive-analytics" },
    { label: locale === "es" ? "Deep learning" : "Deep Learning", href: "/demos/deep-learning" },
  ];

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
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />

      <InteractiveBlob
        className="top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-primary/8 blur-[150px]"
        parallaxStrength={0.1}
        mouseStrength={0.2}
      />
      <InteractiveBlob
        className="bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-accent/8 blur-[150px]"
        parallaxStrength={-0.08}
        mouseStrength={0.25}
      />

      {!prefersReducedMotion && (
        <DomainColoringCanvas
          functionType={footerSettings.type}
          colorMode={footerSettings.recommendedSettings.colorMode}
          speed={footerSettings.recommendedSettings.speed}
          opacity={0.14}
          mouseInfluence={footerSettings.recommendedSettings.mouseInfluence}
          colorShift={footerSettings.recommendedSettings.colorShift}
          zoom={footerSettings.recommendedSettings.zoom}
          className="z-0 mix-blend-screen"
        />
      )}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <motion.div {...motionProps} className="lg:col-span-1">
            <Link
              href={`/${locale}`}
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
              {copy.tagline}
            </p>
          </motion.div>

          <motion.nav {...motionProps} aria-label="Footer navigation">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              {copy.navigateTitle}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={localizeHref(locale, link.href)}
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
                <span className="text-sm text-foreground-subtle block mb-2">{copy.demosLabel}</span>
                <ul className="space-y-2">
                  {demoLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={localizeHref(locale, link.href)}
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

          <motion.address {...motionProps} className="not-italic">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              {copy.contactTitle}
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:hello@ml-agency.com?subject=Technical%20Review"
                className={cn(
                  "flex items-center gap-3 text-sm md:text-base text-foreground-muted hover:text-primary transition-colors min-h-[44px]",
                  linkFocusStyles
                )}
              >
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                hello@ml-agency.com
              </a>
              <div className="flex items-start gap-3 text-sm md:text-base text-foreground-muted min-h-[44px]">
                <Workflow className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{copy.contactIntro}</span>
              </div>
              <div className="flex items-start gap-3 text-sm md:text-base text-foreground-muted min-h-[44px]">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{copy.contactSupport}</span>
              </div>
            </div>
          </motion.address>

          <motion.div {...motionProps}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              {copy.pilotTitle}
            </h3>
            <p className="text-sm md:text-base text-foreground-muted mb-6">
              {copy.pilotSummary}
            </p>
            <Link
              href={localizeHref(locale, "/#contact")}
              className={cn(
                "inline-flex items-center justify-center w-full min-h-[44px] gradient-primary hover:shadow-xl glow-primary text-white px-6 py-4 font-semibold transition-all duration-300 rounded-md",
                linkFocusStyles
              )}
            >
              {copy.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          {...motionProps}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-foreground-muted text-center md:text-left">
            {copy.bottomLine}
          </p>
          <Link
            href={localizeHref(locale, "/demos/computer-vision")}
            className={cn(
              "text-sm text-foreground-muted hover:text-primary transition-colors min-h-[44px] flex items-center",
              linkFocusStyles
            )}
          >
            {copy.demoCta}
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
