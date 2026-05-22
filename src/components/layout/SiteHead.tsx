import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_IMAGES, BUSINESS_INFO } from '../../data/site-images';

interface SiteHeadProps {
  title?: string;
  description?: string;
  schema?: Record<string, any> | Record<string, any>[];
  image?: string;
  noindex?: boolean;
  keywords?: string[];
  preloadImage?: string;
  prefetch?: string[];
  speakableSelectors?: string[];
  lastReviewed?: string;
  significantLinks?: string[];
  mainEntity?: Record<string, any>;
}

export function SiteHead({ title, description, schema, image, noindex, keywords, preloadImage, prefetch, speakableSelectors, lastReviewed, significantLinks, mainEntity }: SiteHeadProps) {
  const { pathname } = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://mattcoffeydesign.com';
  const canonicalUrl = `${siteUrl}${pathname === '/' ? '' : pathname}`;

  const baseTitle = BUSINESS_INFO.name;
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  
  const siteDesc = description || BUSINESS_INFO.description;
  const ogImage = image || `${siteUrl}${SITE_IMAGES.brand.og}`;

  // Base LocalBusiness schema included on every page
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": BUSINESS_INFO.name,
    "image": `${siteUrl}${SITE_IMAGES.brand.logo}`,
    "description": BUSINESS_INFO.description,
    "url": BUSINESS_INFO.url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BUSINESS_INFO.location.city,
      "addressRegion": BUSINESS_INFO.location.state,
      "postalCode": BUSINESS_INFO.location.zip,
      "addressCountry": BUSINESS_INFO.location.country
    },
    "areaServed": ["Grand Traverse County", "Leelanau County", "Antrim County", "Benzie County", "Michigan"],
    "telephone": BUSINESS_INFO.phone,
    "email": BUSINESS_INFO.email,
    "priceRange": "$$$",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.7631",
      "longitude": "-85.6206"
    },
    "sameAs": BUSINESS_INFO.sameAs,
    "additionalType": BUSINESS_INFO.additionalType,
    "founder": {
      "@type": "Person",
      "@id": BUSINESS_INFO.founder.id,
      "name": BUSINESS_INFO.founder.name,
      "jobTitle": BUSINESS_INFO.founder.jobTitle
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`
      },
      ...(pathname !== '/' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": title || pathname.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        "item": canonicalUrl
      }] : [])
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl,
    "url": canonicalUrl,
    "name": fullTitle,
    "description": siteDesc,
    "isPartOf": { "@type": "WebSite", "name": BUSINESS_INFO.name, "url": siteUrl },
    "primaryImageOfPage": { "@type": "ImageObject", "url": ogImage },
    "lastReviewed": lastReviewed || new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    ...(speakableSelectors?.length ? { "speakable": { "@type": "SpeakableSpecification", "cssSelector": speakableSelectors } } : {}),
    ...(significantLinks?.length ? { "significantLink": significantLinks } : {}),
    ...(mainEntity ? { "mainEntity": mainEntity } : {})
  };

  const finalSchema = schema
    ? [baseSchema, breadcrumbSchema, webPageSchema, ...(Array.isArray(schema) ? schema : [schema])]
    : [baseSchema, breadcrumbSchema, webPageSchema];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={siteDesc} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      
      {/* Preload critical images */}
      {preloadImage && <link rel="preload" as="image" href={preloadImage} fetchPriority="high" />}
      
      {/* Prefetch important routes */}
      {prefetch?.map((url, i) => (
        <link key={i} rel="prefetch" href={url} />
      ))}
      
      {/* Favicon */}
      <link rel="icon" type="image/jpeg" href={SITE_IMAGES.brand.logo} />
      <link rel="apple-touch-icon" href={SITE_IMAGES.brand.logo} />
      <meta name="theme-color" content="#0b0b0b" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={BUSINESS_INFO.name} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
