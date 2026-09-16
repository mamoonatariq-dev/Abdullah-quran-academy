import { SeoItem } from '../types';

export function generateJsonLd(item: Partial<SeoItem>): string {
  const schemaType = item.schemaType || 'Article';
  const fields = item.schemaFields || {};
  const pageUrl = item.canonicalUrl || `https://mywebsite.com/${item.slug || ''}`;
  const pageTitle = item.seoTitle || item.title || 'Page Title';
  const pageDescription = item.seoDescription || '';
  const pageImage = item.ogImage || item.twitterImage || 'https://picsum.photos/seed/schema/1200/630';

  let schemaObj: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
  };

  switch (schemaType) {
    case 'Article':
      schemaObj = {
        ...schemaObj,
        headline: pageTitle,
        description: pageDescription,
        image: pageImage,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        author: {
          '@type': 'Person',
          name: fields.author || 'Author Name',
        },
        publisher: {
          '@type': 'Organization',
          name: fields.publisher || 'Publisher Name',
          logo: {
            '@type': 'ImageObject',
            url: pageImage,
          },
        },
        datePublished: item.lastUpdated ? `${item.lastUpdated}T08:00:00+00:00` : new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };
      break;

    case 'LocalBusiness':
      schemaObj = {
        ...schemaObj,
        name: fields.businessName || pageTitle,
        description: pageDescription,
        url: pageUrl,
        image: pageImage,
        telephone: fields.phone || '+44 7446 361983',
        priceRange: fields.priceRange || '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: fields.address || '123 Business Way',
          addressLocality: 'London',
          addressCountry: 'UK',
        },
      };
      break;

    case 'Service':
      schemaObj = {
        ...schemaObj,
        name: pageTitle,
        serviceType: fields.serviceType || 'Online Education',
        description: pageDescription,
        provider: {
          '@type': 'Organization',
          name: fields.publisher || fields.businessName || 'My Business',
        },
        offers: {
          '@type': 'Offer',
          price: fields.priceRange || 'Flexible',
          priceCurrency: 'GBP',
        },
      };
      break;

    case 'FAQ':
      const faqs = fields.faqs && fields.faqs.length > 0 ? fields.faqs : [
        {
          question: 'What is the duration of each class?',
          answer: 'Each online session is typically 30 or 45 minutes long, tailored to the student\'s age and learning speed.',
        },
        {
          question: 'Do you offer a free trial?',
          answer: 'Yes, we offer up to 3 free trial sessions for new students to experience our teaching methodology.',
        },
      ];
      schemaObj = {
        ...schemaObj,
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
      break;

    case 'Product':
      schemaObj = {
        ...schemaObj,
        name: pageTitle,
        image: pageImage,
        description: pageDescription,
        sku: fields.sku || 'PROD-1001',
        offers: {
          '@type': 'Offer',
          url: pageUrl,
          priceCurrency: fields.currency || 'GBP',
          price: fields.price || '49.99',
          availability: 'https://schema.org/InStock',
        },
      };
      break;

    case 'Organization':
      schemaObj = {
        ...schemaObj,
        name: fields.businessName || fields.publisher || 'Organization Name',
        url: pageUrl,
        logo: pageImage,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: fields.phone || '+44 7446 361983',
          contactType: 'customer service',
        },
      };
      break;

    default:
      schemaObj = {
        ...schemaObj,
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
      };
      break;
  }

  return JSON.stringify(schemaObj, null, 2);
}
