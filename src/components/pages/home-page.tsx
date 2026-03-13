import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import type { Locale } from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen bg-background">
      <section id="home">
        <HeroSection locale={locale} />
      </section>
      <ServicesSection locale={locale} />
      <AboutSection locale={locale} />
      <ContactSection locale={locale} />
    </div>
  );
}

