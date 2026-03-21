import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoTemplate } from "@/components/templates/demo-template";
import { ObjectDetectionInterface } from "@/components/demos/computer-vision/object-detection-interface";
import { BreadcrumbStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import { getLocalizedDemoContent } from "@/lib/demo-data";
import { isLocale, localizeHref, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getLocalizedDemoContent(locale, "computerVision");
  const href = localizeHref(locale, "/demos/computer-vision");

  return {
    title: content.workflowTitle,
    description: content.workflowSummary,
    keywords:
      locale === "es"
        ? [
            "visión por computadora para empresas en México",
            "inspección visual con IA",
            "captura documental con machine learning",
            "detección de objetos para operaciones",
          ]
        : [
            "computer vision services",
            "visual inspection ai",
            "document capture machine learning",
            "object detection workflow demo",
          ],
    alternates: {
      canonical: href,
      languages: {
        es: "/es/demos/computer-vision",
        en: "/en/demos/computer-vision",
      },
    },
    openGraph: {
      title: content.workflowTitle,
      description: content.workflowSummary,
      url: href,
      locale: locale === "es" ? "es_MX" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.workflowTitle,
      description: content.workflowSummary,
    },
  };
}

export default async function LocalizedComputerVisionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getLocalizedDemoContent(locale, "computerVision");
  const baseUrl = `${SITE_URL}${localizeHref(locale as Locale, "/demos/computer-vision")}`;

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: `${SITE_URL}/${locale}` },
          { name: locale === "es" ? "Demos" : "Demos", url: `${SITE_URL}/${locale}/demos` },
          { name: content.workflowTitle, url: baseUrl },
        ]}
      />
      <SoftwareApplicationStructuredData
        name={content.demoTitle}
        description={content.subtitle}
        url={baseUrl}
        applicationCategory="DeveloperApplication"
      />
      <DemoTemplate content={content} locale={locale as Locale} customDemoComponent={<ObjectDetectionInterface key="computer-vision-interface" locale={locale as Locale} />} />
    </>
  );
}
