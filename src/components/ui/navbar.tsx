"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDecorativeMotionAllowed } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";
import {
  getDictionary,
  getLocaleFromPathname,
  localizeHref,
  switchLocaleInPathname,
  type Locale,
} from "@/lib/i18n";
import { CONTACT_SUBJECTS, SITE_NAME, createMailto } from "@/lib/site";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const motionAllowed = useDecorativeMotionAllowed();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = getDictionary(locale).navbar;
  const isHomePage = pathname === `/${locale}`;
  const alternateLocale: Locale = locale === "es" ? "en" : "es";
  const switchHref = switchLocaleInPathname(pathname, alternateLocale);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavHref = (section: string) => {
    if (isHomePage) {
      return `#${section}`;
    }

    if (section === "home") {
      return `/${locale}`;
    }

    return localizeHref(locale, `/#${section}`);
  };

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          "backdrop-blur-2xl backdrop-saturate-180 backdrop-contrast-110",
          "bg-gradient-to-b from-white/[0.01] to-transparent",
          "border-b border-white/[0.06] shadow-lg shadow-black/[0.02]",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent before:pointer-events-none",
          isScrolled && "bg-gradient-to-b from-white/[0.03] to-white/[0.01] shadow-2xl shadow-black/[0.08] border-white/[0.12] before:from-white/[0.05]"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={motionAllowed ? { scale: 1.05 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={`/${locale}`}
                aria-label={copy.brandAriaLabel}
                className="flex items-center space-x-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative">
                  <Cpu className="h-8 w-8 text-primary" />
                  {motionAllowed ? <motion.div
                    className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.25, 0.5, 0.25],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  /> : <div aria-hidden="true" className="absolute -inset-1 bg-primary/20 rounded-full blur-sm opacity-25" />}
                </div>
                <span className="text-xl font-bold font-mono text-foreground">
                  <span className="text-gradient-primary">{SITE_NAME}</span>
                </span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {copy.links.map((link, index) => (
                <motion.div
                  key={link.key}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={motionAllowed ? { y: -2 } : undefined}
                >
                  <Link
                    href={getNavHref(link.key)}
                    className="text-foreground-muted hover:text-primary transition-all duration-200 font-medium relative group cursor-pointer hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    onClick={closeMenu}
                  >
                    {link.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <a
                href={switchHref}
                aria-label={getDictionary(locale).languageSwitcherLabel}
                className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors px-3 py-2 rounded-md border border-white/10 hover:border-primary/30"
              >
                {alternateLocale}
              </a>
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button asChild variant="outline" size="sm" className="gradient-secondary hover:shadow-lg glow-secondary text-white border-0">
                  <a href={createMailto(locale === "es" ? CONTACT_SUBJECTS.revisionDeFlujo : CONTACT_SUBJECTS.workflowReview)}>
                    {copy.cta}
                  </a>
                </Button>
              </motion.div>
            </div>

            <details
              ref={menuRef}
              className="md:hidden group"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  closeMenu();
                  menuRef.current?.querySelector("summary")?.focus();
                }
              }}
            >
              <summary
                className="list-none cursor-pointer p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-foreground/80 hover:text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="sr-only group-open:hidden">{copy.openMenu}</span>
                <span className="sr-only hidden group-open:inline">{copy.closeMenu}</span>
                <Menu aria-hidden="true" className="h-6 w-6" />
              </summary>
              <div className="absolute top-16 right-0 w-80 max-w-full max-h-[calc(100dvh-4rem)] overflow-y-auto bg-surface/95 backdrop-blur-xl border border-white/12 p-6 space-y-6">
                <div className="space-y-4">
                  {copy.links.map((link) => (
                    <a
                      key={link.key}
                      href={getNavHref(link.key)}
                      className="block py-2 min-h-[44px] text-lg font-medium text-foreground-muted hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <a
                  href={switchHref}
                  aria-label={getDictionary(locale).languageSwitcherLabel}
                  className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-md border border-white/10 text-sm font-mono uppercase tracking-[0.2em] text-foreground/80"
                  onClick={closeMenu}
                >
                  {alternateLocale}
                </a>
                <Button asChild className="w-full gradient-secondary hover:shadow-lg glow-secondary text-white" size="lg">
                  <a href={createMailto(locale === "es" ? CONTACT_SUBJECTS.revisionDeFlujo : CONTACT_SUBJECTS.workflowReview)}>
                    {copy.cta}
                  </a>
                </Button>
              </div>
            </details>
          </div>
        </div>
      </motion.nav>

    </>
  );
}
