import { CONTACT_EMAIL, SITE_DESCRIPTION_EN, SITE_DESCRIPTION_ES, SITE_NAME, SITE_URL } from "@/lib/site";

type SchemaOrgType =
  | "Organization"
  | "WebSite"
  | "Service"
  | "BreadcrumbList"
  | "SoftwareApplication"
  | "TechArticle";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

interface StructuredDataProps {
  type: SchemaOrgType;
  data: Record<string, JsonLdValue>;
}

type SupportedLocale = "es" | "en";

const localizedSchemaCopy = {
  es: {
    siteDescription: SITE_DESCRIPTION_ES,
    websiteName: `${SITE_NAME} | Servicios de machine learning para empresas en México`,
    inLanguage: "es-MX",
    offerCatalogName: "Servicios de IA para empresas",
    services: [
      {
        name: "Soluciones de visión por computadora",
        description:
          "Servicios de visión por computadora para inspección, captura documental y manejo de excepciones visuales.",
      },
      {
        name: "Inteligencia documental y NLP",
        description:
          "Servicios de inteligencia documental, búsqueda, triage y soporte operativo basados en documentos, correos y texto.",
      },
      {
        name: "Analítica predictiva y modelos a medida",
        description:
          "Servicios de analítica predictiva, detección de anomalías y modelos a medida diseñados para restricciones reales de operación.",
      },
    ],
    areaServed: ["México", "Latinoamérica"],
  },
  en: {
    siteDescription: SITE_DESCRIPTION_EN,
    websiteName: SITE_NAME,
    inLanguage: "en-US",
    offerCatalogName: "AI Solutions",
    services: [
      {
        name: "Computer Vision Solutions",
        description:
          "Computer vision systems for inspection, document capture, and visual exception handling.",
      },
      {
        name: "Natural Language Processing",
        description:
          "Search, triage, and operator workflow systems built on document and text understanding.",
      },
      {
        name: "Predictive Analytics and Custom Models",
        description:
          "Forecasting, anomaly detection, and custom model delivery designed for production constraints.",
      },
    ],
    areaServed: ["Mexico", "Latin America"],
  },
} as const;

export function StructuredData({ type, data }: StructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}

// Predefined structured data components
export function OrganizationStructuredData({ locale = "es" }: { locale?: SupportedLocale }) {
  const copy = localizedSchemaCopy[locale];

  return (
    <StructuredData
      type="Organization"
      data={{
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: copy.siteDescription,
        areaServed: [...copy.areaServed],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: CONTACT_EMAIL,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: copy.offerCatalogName,
          itemListElement: copy.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
            },
          })),
        },
      }}
    />
  );
}

export function WebSiteStructuredData({ locale = "es" }: { locale?: SupportedLocale }) {
  const copy = localizedSchemaCopy[locale];

  return (
    <StructuredData
      type="WebSite"
      data={{
        name: copy.websiteName,
        url: SITE_URL,
        description: copy.siteDescription,
        inLanguage: copy.inLanguage,
      }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <StructuredData
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export interface SoftwareApplicationStructuredDataProps {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: { price: string; priceCurrency: string };
}

export function SoftwareApplicationStructuredData({
  name,
  description,
  url,
  applicationCategory = "DeveloperApplication",
  operatingSystem = "Web",
}: SoftwareApplicationStructuredDataProps) {
  return (
    <StructuredData
      type="SoftwareApplication"
      data={{
        name,
        description,
        url,
        applicationCategory,
        operatingSystem,
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  );
}
