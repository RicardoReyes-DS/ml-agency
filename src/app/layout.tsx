import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { FooterSection } from "@/components/sections/footer-section";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/seo/structured-data";
import { Providers } from "@/components/providers";
import { defaultLocale } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  alternates: {
    languages: {
      es: "/es",
      en: "/en",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestLocale = (await headers()).get("x-locale");
  const locale = requestLocale === "en" || requestLocale === "es" ? requestLocale : defaultLocale;
  return (
    <html lang={locale}>
      <head>
        <OrganizationStructuredData />
        <WebSiteStructuredData />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <FooterSection />
          <PerformanceMonitor />
        </Providers>
      </body>
    </html>
  );
}
