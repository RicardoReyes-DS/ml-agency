import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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
  return (
    <StructuredData
      type="Organization"
      data={{
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: SITE_DESCRIPTION,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: CONTACT_EMAIL,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: "AI Solutions",
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Computer Vision Solutions",
                description:
                  "Computer vision systems for inspection, document capture, and visual exception handling.",
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Natural Language Processing",
                description:
                  "Search, triage, and operator workflow systems built on document and text understanding.",
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Predictive Analytics and Custom Models",
                description:
                  "Forecasting, anomaly detection, and custom model delivery designed for production constraints.",
              },
            },
          ],
        },
      }}
    />
  );
}

export function WebSiteStructuredData({ locale = "es" }: { locale?: SupportedLocale }) {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
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
