import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoTemplate } from "@/components/templates/demo-template";
import { RAGInterface } from "@/components/demos/nlp/rag-interface";
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
  const content = getLocalizedDemoContent(locale, "nlp");
  const href = localizeHref(locale, "/demos/nlp");

  return {
    title: content.workflowTitle,
    description: content.workflowSummary,
    alternates: {
      canonical: href,
      languages: {
        es: "/es/demos/nlp",
        en: "/en/demos/nlp",
      },
    },
  };
}

export default async function LocalizedNlpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getLocalizedDemoContent(locale, "nlp");
  const baseUrl = `https://ml-agency.com${localizeHref(locale as Locale, "/demos/nlp")}`;

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
      <DemoTemplate content={content} locale={locale as Locale} customDemoComponent={<RAGInterface key="nlp-rag-interface" locale={locale as Locale} />} />
    </>
  );
}
