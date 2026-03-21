import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoTemplate } from "@/components/templates/demo-template";
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
  const content = getLocalizedDemoContent(locale, "predictiveAnalytics");
  const href = localizeHref(locale, "/demos/predictive-analytics");

  return {
    title: content.workflowTitle,
    description: content.workflowSummary,
    keywords:
      locale === "es"
        ? [
            "analítica predictiva para empresas en México",
            "pronóstico de demanda con IA",
            "detección de anomalías para operaciones",
            "machine learning para planeación",
          ]
        : [
            "predictive analytics services",
            "demand forecasting ai",
            "anomaly detection operations",
            "machine learning planning workflows",
          ],
    alternates: {
      canonical: href,
      languages: {
        es: "/es/demos/predictive-analytics",
        en: "/en/demos/predictive-analytics",
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

export default async function LocalizedPredictiveAnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getLocalizedDemoContent(locale, "predictiveAnalytics");
  const baseUrl = `${SITE_URL}${localizeHref(locale as Locale, "/demos/predictive-analytics")}`;

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
      <DemoTemplate content={content} locale={locale as Locale} />
    </>
  );
}
