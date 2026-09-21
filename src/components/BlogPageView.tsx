import React, { useState, useMemo, useEffect } from 'react';
import {
  blogArticles,
  blogCategories,
  BlogPost,
  BlogCategory,
} from '../data/blogData';
import {
  BookOpen,
  Sparkles,
  Clock,
  User,
  Calendar,
  ArrowRight,
  Search,
  ChevronRight,
  CheckCircle2,
  Share2,
  MessageCircle,
  ShieldCheck,
  GraduationCap,
  Star,
  ArrowLeft,
  Check,
  HelpCircle,
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/contactConfig';

interface BlogPageViewProps {
  currentSlug?: string;
  onNavigate: (
    view: 'home' | 'courses-hub' | 'core-courses' | 'course-detail' | 'free-trial' | 'contact-us' | 'blog',
    courseId?: string,
    courseName?: string,
    hash?: string,
    blogSlug?: string
  ) => void;
}

export const BlogPageView: React.FC<BlogPageViewProps> = ({ currentSlug, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All Topics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Active article based on currentSlug
  const activeArticle = useMemo(() => {
    if (!currentSlug) return null;
    return (
      blogArticles.find(
        (art) => art.slug.toLowerCase() === currentSlug.toLowerCase() || art.id === currentSlug
      ) || null
    );
  }, [currentSlug]);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlug]);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All Topics' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article for blog index
  const featuredArticle = useMemo(() => {
    return blogArticles.find((art) => art.featured) || blogArticles[0];
  }, []);

  // Other articles excluding the featured one
  const regularArticles = useMemo(() => {
    if (selectedCategory === 'All Topics' && searchQuery.trim() === '') {
      return filteredArticles.filter((art) => art.slug !== featuredArticle.slug);
    }
    return filteredArticles;
  }, [filteredArticles, selectedCategory, searchQuery, featuredArticle]);

  // Related articles for single post view
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return blogArticles
      .filter((art) => art.slug !== activeArticle.slug)
      .sort((a, b) => {
        if (a.category === activeArticle.category) return -1;
        if (b.category === activeArticle.category) return 1;
        return 0;
      })
      .slice(0, 3);
  }, [activeArticle]);

  // Handle URL share
  const handleShare = (article: BlogPost) => {
    const postUrl = `https://abdullahquranacademy.co.uk/blog/${article.slug}/`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Intercept in-content link clicks to keep SPA routing smooth
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;
    const href = target.getAttribute('href');
    if (!href) return;

    if (href.startsWith('/blog/')) {
      e.preventDefault();
      const slug = href.replace('/blog/', '').replace(/\/+$/, '');
      if (slug) {
        onNavigate('blog', undefined, undefined, undefined, slug);
      } else {
        onNavigate('blog');
      }
    } else if (href.startsWith('/courses/')) {
      e.preventDefault();
      const courseSlug = href.replace('/courses/', '').replace(/\/+$/, '');
      onNavigate('course-detail', courseSlug);
    } else if (href === '/core-courses') {
      e.preventDefault();
      onNavigate('core-courses');
    } else if (href === '/free-trial') {
      e.preventDefault();
      onNavigate('free-trial');
    } else if (href === '/contact-us') {
      e.preventDefault();
      onNavigate('contact-us');
    }
  };

  // ============================================================================
  // VIEW A: DEDICATED INDIVIDUAL BLOG POST VIEW (/blog/:slug/)
  // ============================================================================
  if (activeArticle) {
    const canonicalPostUrl = `https://abdullahquranacademy.co.uk/blog/${activeArticle.slug}/`;

    return (
      <article className="bg-white min-h-screen text-gray-800">
        {/* Schema.org Structured Data for this specific BlogPosting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: activeArticle.title,
              description: activeArticle.excerpt,
              image: activeArticle.image,
              author: {
                '@type': 'Person',
                name: activeArticle.author.name,
                jobTitle: activeArticle.author.role,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Abdullah Quran Academy',
                url: 'https://abdullahquranacademy.co.uk',
                logo: 'https://abdullahquranacademy.co.uk/favicon.png',
              },
              datePublished: activeArticle.publishedDate,
              mainEntityOfPage: canonicalPostUrl,
              keywords: activeArticle.tags.join(', '),
            }),
          }}
        />

        {/* Breadcrumb & Navigation Bar */}
        <div className="bg-[#FAF8F5] border-b border-gray-200 sticky top-20 z-20 backdrop-blur-md bg-[#FAF8F5]/95">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 uppercase tracking-wider cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Blog Hub</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleShare(activeArticle)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-emerald-500 bg-white text-gray-700 hover:text-emerald-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                title="Copy canonical blog link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('free-trial')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-gray-950 text-xs font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-gray-950" />
                <span>3-Day Free Trial</span>
              </button>
            </div>
          </div>
        </div>

        {/* Post Hero Header */}
        <header className="pt-10 pb-8 px-4 sm:px-6 max-w-4xl mx-auto space-y-5">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Blog
            </button>
            <span>/</span>
            <span className="text-emerald-800 font-semibold">{activeArticle.category}</span>
          </nav>

          {/* Category Pill */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            {activeArticle.category}
          </div>

          {/* Post Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            {activeArticle.title}
          </h1>

          {/* Author, Date & Reading Time */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#0b3c2d] text-amber-300 flex items-center justify-center font-bold text-sm font-serif shadow-xs">
                {activeArticle.author.name.charAt(0)}
              </div>
              <div>
                <span className="block font-bold text-gray-900">{activeArticle.author.name}</span>
                <span className="text-[11px] text-gray-500">{activeArticle.author.role}</span>
              </div>
            </div>

            <div className="hidden sm:block h-6 w-px bg-gray-200" />

            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                {activeArticle.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                {activeArticle.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
          <div className="rounded-3xl overflow-hidden aspect-16/9 bg-gray-100 shadow-md border border-gray-200/80">
            <img
              src={activeArticle.image}
              alt={activeArticle.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Article Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
          {/* Key Takeaways Box */}
          {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
            <aside
              aria-label="Key Takeaways"
              className="bg-emerald-50/70 border-l-4 border-emerald-700 p-5 sm:p-6 rounded-r-2xl space-y-3 shadow-2xs"
            >
              <h2 className="font-bold text-base text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Key Takeaways &amp; Quick Summary</span>
              </h2>
              <ul className="space-y-2 text-sm text-emerald-900/90 leading-relaxed">
                {activeArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold text-lg leading-none mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Main Article Body (Human & Educational) */}
          <div
            onClick={handleContentClick}
            className="prose prose-emerald max-w-none text-gray-700 text-base sm:text-lg leading-relaxed space-y-6 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-10 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mt-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>p]:leading-relaxed [&>blockquote]:border-l-4 [&>blockquote]:border-amber-400 [&>blockquote]:bg-amber-50/50 [&>blockquote]:py-3 [&>blockquote]:px-4 [&>blockquote]:rounded-r-xl [&>blockquote]:font-serif [&>blockquote]:italic"
            dangerouslySetInnerHTML={{ __html: activeArticle.content }}
          />

          {/* Practical Recommended Course Banner */}
          {activeArticle.relatedCourseId && (
            <section
              aria-label="Recommended Quran Course"
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0b3c2d] to-[#07251c] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-700/50"
            >
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles className="w-3.5 h-3.5" /> Recommended Live Course
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {activeArticle.relatedCourseName}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/90 max-w-md">
                  Practice these principles with verified female and male tutors through personalized 1-on-1 Zoom sessions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('course-detail', activeArticle.relatedCourseId)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  View Course Details &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('free-trial')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 cursor-pointer"
                >
                  Book Free Trial
                </button>
              </div>
            </section>
          )}

          {/* Article Specific FAQs */}
          {activeArticle.faqs && activeArticle.faqs.length > 0 && (
            <section aria-label="Frequently Asked Questions" className="pt-6 space-y-4">
              <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-700" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-3">
                {activeArticle.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900">{faq.q}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio Box & WhatsApp Consultation */}
          <footer className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-[#0b3c2d] text-amber-300 flex items-center justify-center font-bold text-xl font-serif shrink-0">
                {activeArticle.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">{activeArticle.author.name}</div>
                <div className="text-xs text-gray-500">{activeArticle.author.role}</div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  Abdullah Quran Academy Academic Faculty
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppUrl(`Assalam o Alaikum! I read the article "${activeArticle.title}" on your blog and would like to ask about Quran classes.`)}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>Ask Tutor on WhatsApp</span>
            </a>
          </footer>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section aria-label="Related Articles" className="pt-10 border-t border-gray-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Continue Reading
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                    Related Quran Articles
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 uppercase tracking-wider cursor-pointer"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedArticles.map((rel) => (
                  <article
                    key={`rel-${rel.slug}`}
                    onClick={() => onNavigate('blog', undefined, undefined, undefined, rel.slug)}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-16/10 bg-gray-100 overflow-hidden">
                        <img
                          src={rel.image}
                          alt={rel.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {rel.category}
                        </span>
                        <h3 className="font-serif font-bold text-sm text-gray-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{rel.excerpt}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-gray-400">
                      <span>{rel.readTime}</span>
                      <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform">
                        Read &rarr;
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Global CTA Section */}
        <section className="bg-[#0b3c2d] text-white py-14 px-4 sm:px-6 text-center space-y-4 border-t border-amber-400/30">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Start Your Quran Learning Journey Today
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto">
            Experience 1-on-1 personalized lessons with certified female tutors. No credit card required.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('free-trial')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Start 3-Day Free Trial
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact-us')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs border border-emerald-600 transition-all cursor-pointer"
            >
              Contact Admissions
            </button>
          </div>
        </section>
      </article>
    );
  }

  // ============================================================================
  // VIEW B: MAIN BLOG DIRECTORY / HUB (/blog/)
  // ============================================================================
  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Schema.org Structured Data for CollectionPage & BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Islamic & Quran Learning Blog | Abdullah Quran Academy',
            description:
              'Official Quran learning resources, Islamic guidance, Tajweed tips, Quran reading lessons, and educational articles by certified UK Quran tutors.',
            url: 'https://abdullahquranacademy.co.uk/blog/',
            publisher: {
              '@type': 'Organization',
              name: 'Abdullah Quran Academy',
              url: 'https://abdullahquranacademy.co.uk',
              logo: 'https://abdullahquranacademy.co.uk/favicon.png',
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: blogArticles.map((art, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'BlogPosting',
                  headline: art.title,
                  description: art.excerpt,
                  image: art.image,
                  author: {
                    '@type': 'Person',
                    name: art.author.name,
                    jobTitle: art.author.role,
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: 'Abdullah Quran Academy',
                  },
                  datePublished: art.publishedDate,
                  mainEntityOfPage: `https://abdullahquranacademy.co.uk/blog/${art.slug}/`,
                },
              })),
            },
          }),
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#07251c] via-[#0b3c2d] to-[#0d4a37] text-white py-14 sm:py-20 border-b border-emerald-800/60">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-600/60 text-emerald-200 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Abdullah Quran Academy Knowledge Base</span>
            <span className="text-emerald-400">•</span>
            <span className="text-amber-300">Free Resources &amp; Articles</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Quran &amp; Islamic Learning Blog
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-3xl mx-auto font-sans font-normal">
            Discover practical Quran learning roadmaps, Tajweed pronunciation advice, parenting guides for kids, and spiritual reminders prepared by accredited Islamic tutors.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-emerald-200 font-medium">
            <span className="flex items-center gap-1.5 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-700/50">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> Verified Islamic Tutors
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-700/50">
              <GraduationCap className="w-4 h-4 text-emerald-300" /> Classical Tajweed &amp; Noorani Qaida
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-700/50">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" /> 1-on-1 Classes for Kids &amp; Sisters
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('free-trial')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-sm tracking-wide uppercase transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-gray-950" />
              <span>Start Learning Quran</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('core-courses')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-sm transition-all border border-emerald-600/60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Explore Core Courses</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & CATEGORIES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 space-y-5">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., Noorani Qaida, Tajweed, Kids)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-gray-500 font-medium self-end md:self-center">
              Showing <span className="font-bold text-gray-900">{filteredArticles.length}</span> articles
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('All Topics')}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'All Topics'
                  ? 'bg-[#0b3c2d] text-amber-300 shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Topics ({blogArticles.length})
            </button>

            {blogCategories.map((cat) => {
              const count = blogArticles.filter((a) => a.category === cat.name).length;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-[#0b3c2d] text-amber-300 shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  {count > 0 && <span className="opacity-70 text-[11px]">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED BLOG POST (Only when on 'All Topics' and no search query) */}
      {selectedCategory === 'All Topics' && searchQuery.trim() === '' && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Featured Article
            </span>
          </div>

          <div className="bg-gradient-to-br from-emerald-950 via-[#0b3c2d] to-[#07251c] text-white rounded-3xl overflow-hidden shadow-xl border border-emerald-800/40 grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-gray-900">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-gray-950 font-bold text-xs uppercase tracking-wider shadow-md">
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-emerald-300">
                  <span>{featuredArticle.publishedDate}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight hover:text-amber-300 transition-colors">
                  <button
                    type="button"
                    onClick={() => onNavigate('blog', undefined, undefined, undefined, featuredArticle.slug)}
                    className="text-left cursor-pointer"
                  >
                    {featuredArticle.title}
                  </button>
                </h2>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed line-clamp-4">
                  {featuredArticle.excerpt}
                </p>

                {featuredArticle.keyTakeaways && (
                  <div className="pt-2 space-y-1.5 text-xs text-emerald-200">
                    <span className="font-bold text-amber-300 text-[11px] uppercase tracking-wider block">
                      Key Takeaway:
                    </span>
                    <p className="italic text-emerald-100/90">
                      "{featuredArticle.keyTakeaways[0]}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-emerald-800/80 flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-bold text-white">{featuredArticle.author.name}</div>
                  <div className="text-[11px] text-emerald-300">{featuredArticle.author.role}</div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('blog', undefined, undefined, undefined, featuredArticle.slug)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. LATEST ARTICLES (3-COLUMN RESPONSIVE GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Curated Quran Lessons
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              {selectedCategory === 'All Topics' ? 'Latest Blog Articles' : `${selectedCategory} Articles`}
            </h2>
          </div>

          <span className="text-xs text-gray-500">
            Click any article to read the full guide
          </span>
        </div>

        {regularArticles.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">No articles found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We couldn't find any articles matching your search query. Try clearing filters or exploring another topic.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Topics');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularArticles.map((article) => (
              <article
                key={article.slug}
                onClick={() => onNavigate('blog', undefined, undefined, undefined, article.slug)}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#0b3c2d]/90 backdrop-blur-xs text-amber-300 font-bold text-[11px] shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-700" />
                        {article.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-700" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {article.author.name.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-700 font-medium truncate max-w-[130px]">
                      {article.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 group-hover:text-emerald-950">
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5. SUGGESTED BLOG TOPICS / QUICK PILLARS */}
      <section className="bg-[#FAF8F5] py-14 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Explore Our Complete Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Essential Islamic &amp; Quran Learning Guides
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Handpicked practical lessons covering fundamental Quran recitation, Tajweed accuracy, Hifdh routines, and positive Islamic parenting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogArticles.slice(0, 8).map((article, idx) => (
              <div
                key={`topic-${article.slug}`}
                onClick={() => onNavigate('blog', undefined, undefined, undefined, article.slug)}
                className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-emerald-700 font-bold">#0{idx + 1}</span>
                    <span className="text-[10px] uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400 text-[11px]">{article.readTime}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:text-emerald-900">
                    Read &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#07251c] via-[#0b3c2d] to-[#0d4a37] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-amber-400/40">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dedicated Online Quran Academy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Start Your Quran Learning Journey Today
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
            Learn the Quran with experienced teachers through flexible online Quran classes for kids and adults.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('free-trial')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Start Learning
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact-us')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider border border-emerald-500/50 shadow-md transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" /> 3-Day Free Trial (No Card Required)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" /> Vetted Female Tutors for Sisters &amp; Kids
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" /> Flexible UK Morning &amp; Evening Slots
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
