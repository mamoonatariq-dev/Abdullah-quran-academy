export type ItemType = 'page' | 'post';
export type ItemStatus = 'published' | 'draft';
export type SchemaType = 'Article' | 'LocalBusiness' | 'Service' | 'FAQ' | 'Product' | 'Organization';

export interface RobotsMeta {
  index: boolean;
  follow: boolean;
}

export interface SchemaFAQItem {
  question: string;
  answer: string;
}

export interface SchemaFields {
  // Common
  author?: string;
  publisher?: string;
  // LocalBusiness / Organization / Service
  businessName?: string;
  provider?: string;
  address?: string;
  phone?: string;
  serviceType?: string;
  priceRange?: string;
  // Product
  price?: string;
  currency?: string;
  sku?: string;
  // FAQ
  faqs?: SchemaFAQItem[];
}

export interface SeoItem {
  id: string;
  type: ItemType;
  title: string;
  slug: string;
  status: ItemStatus;
  focusKeyword: string;
  relatedKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schemaType: SchemaType;
  schemaFields: SchemaFields;
  robotsMeta: RobotsMeta;
  content: string;
  seoScore: number;
  lastUpdated: string;
}

export interface SitemapItem {
  id: string;
  title: string;
  url: string;
  keywords: string[];
}

export interface AppSettings {
  titleSeparator: string;
  brandName: string;
  targetDensityMin: number;
  targetDensityMax: number;
  sitemapList: SitemapItem[];
}

export interface CheckItem {
  id: string;
  category: 'basic' | 'readability' | 'additional';
  label: string;
  passed: boolean;
  warning?: boolean;
  details: string;
  tip?: string;
  targetField?: string;
}

export interface SeoAnalysisResult {
  score: number;
  scoreColor: 'red' | 'orange' | 'green';
  wordCount: number;
  keywordDensity: number;
  keywordCount: number;
  checks: CheckItem[];
  basicPassedCount: number;
  basicTotalCount: number;
  readabilityPassedCount: number;
  readabilityTotalCount: number;
  additionalPassedCount: number;
  additionalTotalCount: number;
}
