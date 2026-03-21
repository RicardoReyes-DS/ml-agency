import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoTemplate } from "@/components/templates/demo-template";
import { RAGInterface } from "@/components/demos/nlp/rag-interface";
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
  const content = getLocalizedDemoContent(locale, "nlp");
  const href = localizeHref(locale, "/demos/nlp");

  return {
    title: content.workflowTitle,
    description: content.workflowSummary,
    keywords:
      locale === "es"
        ? [
            "inteligencia documental para empresas en México",
            "RAG para empresas",
            "búsqueda documental con IA",
            "procesamiento de lenguaje natural para operaciones",
          ]
        : [
            "document intelligence services",
            "rag workflow demo",
            "enterprise search ai",
            "natural language processing operations",
          ],
    alternates: {
      canonical: href,
      languages: {
        es: "/es/demos/nlp",
        en: "/en/demos/nlp",
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

export default async function LocalizedNlpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getLocalizedDemoContent(locale, "nlp");
  const baseUrl = `${SITE_URL}${localizeHref(locale as Locale, "/demos/nlp")}`;

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
      <DemoTemplate content={content} locale={locale as Locale} customDemoComponent={<RAGInterface key="nlp-rag-interface" locale={locale as Locale} />} />
    </>
  );
}
