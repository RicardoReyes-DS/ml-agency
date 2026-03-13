import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/home-page";
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
  const href = localizeHref(locale, "/");

  return {
    title: copy.home.metadata.title,
    description: copy.home.metadata.description,
    alternates: {
      canonical: href,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      title: copy.home.metadata.title,
      description: copy.home.metadata.description,
      url: href,
      locale: copy.metadata.ogLocale,
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale as Locale} />;
}
