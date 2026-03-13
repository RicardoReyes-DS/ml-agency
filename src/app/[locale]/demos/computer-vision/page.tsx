import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoTemplate } from "@/components/templates/demo-template";
import { ObjectDetectionInterface } from "@/components/demos/computer-vision/object-detection-interface";
import { BreadcrumbStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import { getLocalizedDemoContent } from "@/lib/demo-data";
import { isLocale, localizeHref, type Locale } from "@/lib/i18n";

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
    alternates: {
      canonical: href,
      languages: {
        es: "/es/demos/computer-vision",
        en: "/en/demos/computer-vision",
      },
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
  const baseUrl = `https://ml-agency.com${localizeHref(locale as Locale, "/demos/computer-vision")}`;

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: `https://ml-agency.com/${locale}` },
          { name: locale === "es" ? "Demos" : "Demos", url: `https://ml-agency.com/${locale}/demos` },
          { name: content.title, url: baseUrl },
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
