import { Metadata } from "next";

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
export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: "ML Agency",
        url: "https://ml-agency.com",
        logo: "https://ml-agency.com/logo.png",
        description: "Leading machine learning agency delivering production-ready AI solutions for Fortune 500 companies.",
        foundingDate: "2020",
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-0123',
          contactType: 'customer service',
          email: 'hello@ml-agency.com',
        },
        sameAs: [
          'https://twitter.com/mlagency',
          'https://linkedin.com/company/ml-agency',
          'https://github.com/ml-agency',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Innovation Drive',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          postalCode: '94105',
          addressCountry: 'US',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI Solutions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Computer Vision Solutions',
                description: 'Advanced neural networks for real-time image recognition and object detection.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Natural Language Processing',
                description: 'Transformer-based architectures for sentiment analysis and conversational AI.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Deep Learning',
                description: 'Custom neural network design and distributed training pipelines.',
              },
            },
          ],
        },
      }}
    />
  );
}

export function WebSiteStructuredData() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: "ML Agency",
        url: "https://ml-agency.com",
        description: "Leading machine learning agency delivering production-ready AI solutions.",
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://ml-agency.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
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
          name: "ML Agency",
          url: "https://ml-agency.com",
        },
      }}
    />
  );
}