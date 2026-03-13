import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemosPage } from "@/components/pages/demos-page";
import { getDictionary, isLocale, localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = getDictionary(locale);
  const href = localizeHref(locale, "/demos");

  return {
    title: copy.demos.metadata.title,
    description: copy.demos.metadata.description,
    alternates: {
      canonical: href,
      languages: {
        es: "/es/demos",
        en: "/en/demos",
      },
    },
    openGraph: {
      title: copy.demos.metadata.title,
      description: copy.demos.metadata.description,
      url: href,
      locale: copy.metadata.ogLocale,
    },
  };
}

export default async function LocaleDemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <DemosPage locale={locale as Locale} />;
}
