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
  const content = getLocalizedDemoContent(locale, "deepLearning");
  const href = localizeHref(locale, "/demos/deep-learning");

  return {
    title: content.workflowTitle,
    description: content.workflowSummary,
    alternates: {
      canonical: href,
      languages: {
        es: "/es/demos/deep-learning",
        en: "/en/demos/deep-learning",
      },
    },
  };
}

export default async function LocalizedDeepLearningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getLocalizedDemoContent(locale, "deepLearning");
  const baseUrl = `${SITE_URL}${localizeHref(locale as Locale, "/demos/deep-learning")}`;

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: `${SITE_URL}/${locale}` },
          { name: locale === "es" ? "Demos" : "Demos", url: `${SITE_URL}/${locale}/demos` },
          { name: content.title, url: baseUrl },
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
