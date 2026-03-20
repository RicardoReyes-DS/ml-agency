import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { FooterSection } from "@/components/sections/footer-section";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/seo/structured-data";
import { Providers } from "@/components/providers";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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

const baseCopy = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: baseCopy.home.metadata.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: baseCopy.metadata.description,
  openGraph: {
    type: "website",
    locale: baseCopy.metadata.ogLocale,
    url: SITE_URL,
    title: baseCopy.home.metadata.title,
    description: baseCopy.metadata.description,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: baseCopy.home.metadata.title,
    description: baseCopy.metadata.description,
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
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get("x-locale");
  const locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html lang={locale}>
      <head>
        <OrganizationStructuredData locale={locale} />
        <WebSiteStructuredData locale={locale} />
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
