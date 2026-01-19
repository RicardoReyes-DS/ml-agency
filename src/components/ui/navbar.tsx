"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Cpu } from "lucide-react";

const navLinks = [
  { name: "Home", key: "home" },
  { name: "Services", key: "services" },
  { name: "About", key: "about" },
  { name: "Contact", key: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we're on the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to get the correct href based on current page
  const getNavHref = (section: string) => {
    if (isHomePage) {
      // On home page, use anchor links for smooth scrolling
      return `#${section}`;
    } else {
      // On other pages, navigate to home page with anchor (except for home itself)
      if (section === 'home') {
        return '/';
      }
      return `/#${section}`;
    }
  };

  // Function to handle navigation with smooth scrolling
  const handleNavClick = (section: string) => {
    setIsMobileMenuOpen(false);

    // If not on home page, let the Link component handle navigation
    if (!isHomePage) return;

    // On home page, smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          // Crystal clear transparency with enhanced backdrop effects
          "backdrop-blur-2xl backdrop-saturate-180 backdrop-contrast-110",
          "bg-gradient-to-b from-white/[0.01] to-transparent",
          "border-b border-white/[0.06] shadow-lg shadow-black/[0.02]",
          // Subtle inner glow for crystal effect
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent before:pointer-events-none",
          // Enhanced crystal effect when scrolled
          isScrolled && "bg-gradient-to-b from-white/[0.03] to-white/[0.01] shadow-2xl shadow-black/[0.08] border-white/[0.12] before:from-white/[0.05]"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <Cpu className="h-8 w-8 text-primary" />
                <motion.div
                  className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span className="text-xl font-bold font-mono text-foreground">
                <span className="text-gradient-primary">ML</span><span className="text-accent">Agency</span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={getNavHref(link.key)}
                    className="text-foreground-muted hover:text-primary transition-all duration-200 font-medium relative group cursor-pointer hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                    onClick={() => handleNavClick(link.key)}
                  >
                    {link.name}
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

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gradient-secondary hover:shadow-lg glow-secondary text-white border-0"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-2xl md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-16 right-0 bottom-0 z-50 w-80 bg-white/[0.08] backdrop-blur-xl border-l border-white/[0.12] md:hidden"
            >
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={getNavHref(link.key)}
                        className="block text-lg font-medium text-foreground-muted hover:text-primary transition-all duration-200 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                        onClick={() => handleNavClick(link.key)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button className="w-full gradient-secondary hover:shadow-lg glow-secondary text-white" size="lg">
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}