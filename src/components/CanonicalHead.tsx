import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { resolveCleanCanonicalUrl, setDocumentCanonical } from '../utils/canonical';

interface CanonicalHeadProps {
  /**
   * The current relative path (e.g. '/' or '/courses' or '/contact-us' or '/courses/noorani-qaida')
   */
  path: string;
  title?: string;
  description?: string;
}

/**
 * Dynamic CanonicalHead component
 * Ensures <link rel="canonical"> and <meta property="og:url"> are correctly set
 * via react-helmet-async as well as immediate DOM fallback.
 */
export const CanonicalHead: React.FC<CanonicalHeadProps> = ({ path, title, description }) => {
  const canonicalUrl = resolveCleanCanonicalUrl(path);

  useEffect(() => {
    setDocumentCanonical(canonicalUrl);
    if (title) {
      document.title = title;
    }
  }, [canonicalUrl, title]);

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
};
