import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/seo/structured-data";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ml-agency.com'),
  title: {
    default: "ML Agency | Enterprise AI Solutions & Machine Learning",
    template: "%s | ML Agency"
  },
  description: "Leading machine learning agency delivering production-ready AI solutions for Fortune 500 companies. Expert computer vision, NLP, and deep learning services.",
  keywords: [
    "machine learning",
    "artificial intelligence",
    "AI solutions",
    "computer vision",
    "natural language processing",
    "deep learning",
    "neural networks",
    "predictive analytics",
    "enterprise AI",
    "data science"
  ],
  authors: [{ name: "ML Agency Team" }],
  creator: "ML Agency",
  publisher: "ML Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ml-agency.com",
    title: "ML Agency | Enterprise AI Solutions & Machine Learning",
    description: "Leading machine learning agency delivering production-ready AI solutions for Fortune 500 companies. Expert computer vision, NLP, and deep learning services.",
    siteName: "ML Agency",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ML Agency - Enterprise AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Agency | Enterprise AI Solutions & Machine Learning",
    description: "Leading machine learning agency delivering production-ready AI solutions for Fortune 500 companies.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationStructuredData />
        <WebSiteStructuredData />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <PerformanceMonitor />
        </Providers>
      </body>
    </html>
  );
}
