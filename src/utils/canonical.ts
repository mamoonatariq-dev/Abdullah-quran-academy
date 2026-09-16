/**
 * Dynamic Canonical URL Generator & Standardizer
 * 
 * Implements Google & SEO Best Practices:
 * 1. Protocol: Always enforces secure https://
 * 2. Domain: https://abdullahquranacademy.co.uk
 * 3. Lowercase: Normalizes all route paths to lowercase
 * 4. Query & Hash Stripping: Eliminates ?utm_*, ?ref=, #hash, and dynamic filters
 * 5. Trailing Slash Rule: Consistently removes trailing slashes (e.g., /courses, root is domain with no trailing slash)
 */

export const PRIMARY_CANONICAL_DOMAIN = 'https://abdullahquranacademy.co.uk';

/**
 * Standardizes any input path/URL into a clean, canonical URL string
 */
export function resolveCleanCanonicalUrl(
  pathOrUrl?: string,
  baseDomain: string = PRIMARY_CANONICAL_DOMAIN
): string {
  // 1. Clean and normalize base domain
  let domain = (baseDomain || PRIMARY_CANONICAL_DOMAIN).trim();
  if (domain.startsWith('http://')) {
    domain = domain.replace('http://', 'https://');
  } else if (!domain.startsWith('https://')) {
    domain = `https://${domain}`;
  }
  domain = domain.replace(/\/+$/, '');

  // 2. If empty, root slash, or not provided, return root domain without trailing slash
  if (!pathOrUrl || pathOrUrl === '/' || pathOrUrl.trim() === '') {
    return domain;
  }

  // 3. If a full URL was supplied, extract pathname
  let extractedPath = pathOrUrl.trim();
  if (extractedPath.startsWith('http://') || extractedPath.startsWith('https://')) {
    try {
      const parsed = new URL(extractedPath);
      extractedPath = parsed.pathname;
    } catch {
      extractedPath = extractedPath.replace(/^https?:\/\/[^/]+/, '');
    }
  }

  // 4. Strip query parameters (?utm_source=..., ?ref=...) and fragments (#section)
  extractedPath = extractedPath.split('?')[0].split('#')[0].trim();

  // 5. Convert to lowercase
  extractedPath = extractedPath.toLowerCase();

  // 6. Ensure leading slash
  if (!extractedPath.startsWith('/')) {
    extractedPath = '/' + extractedPath;
  }

  // 7. Strip trailing slashes (e.g. /courses/ -> /courses; root '/' becomes '')
  extractedPath = extractedPath.replace(/\/+$/, '');

  return `${domain}${extractedPath}`;
}

/**
 * Directly updates or injects the <link rel="canonical"> and <meta property="og:url">
 * tags in document.head.
 */
export function setDocumentCanonical(canonicalUrl: string): void {
  if (typeof document === 'undefined') return;

  // 1. <link rel="canonical" href="..." />
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', canonicalUrl);

  // 2. <meta property="og:url" content="..." />
  let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', canonicalUrl);
}
