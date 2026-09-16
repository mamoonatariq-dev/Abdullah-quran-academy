import React, { useState, useEffect } from 'react';
import { SeoItem, AppSettings } from '../types';
import { QuranLogo } from './QuranLogo';
import { CoursesHubView } from './CoursesHubView';
import { CourseDetailView } from './CourseDetailView';
import { FreeTrialView } from './FreeTrialView';
import { CoreCoursesView } from './CoreCoursesView';
import { ContactUsView } from './ContactUsView';
import { coursesData } from '../data/coursesData';
import girlReadingQuranImg from '../assets/images/girl_reading_quran.jpg';
import {
  ACADEMY_PHONE,
  ACADEMY_PHONE_TEL,
  ACADEMY_WHATSAPP_DISPLAY,
  ACADEMY_WHATSAPP_NUMBER,
  BOOK_DOWNLOAD_PHONE_DISPLAY,
  BOOK_DOWNLOAD_PHONE_RAW,
  BOOK_DOWNLOAD_WHATSAPP_NUMBER,
  getWhatsAppUrl,
  getBookDownloadWhatsAppUrl,
} from '../utils/contactConfig';
import {
  Phone,
  Mail,
  Check,
  Star,
  Play,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Award,
  Users,
  Globe,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck,
  HelpCircle,
  ExternalLink,
  Download,
  FileText,
  MessageCircle,
  Eye,
  X,
  Book,
  GraduationCap,
  Menu,
  Quote,
  MapPin,
} from 'lucide-react';

interface PublicWebsiteProps {
  settings: AppSettings;
  blogItems: SeoItem[];
  onOpenBlogEditor?: (item: SeoItem) => void;
  onOpenDashboard?: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  settings,
  blogItems,
  onOpenBlogEditor,
  onOpenDashboard,
}) => {
  const [pageView, setPageView] = useState<
    'home' | 'courses-hub' | 'core-courses' | 'course-detail' | 'free-trial' | 'contact-us'
  >('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('noorani-qaida');
  const [preselectedCourse, setPreselectedCourse] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Noorani Qaida for Beginners & Kids',
    tutor: 'Female Tutor',
    timing: 'Evening (4pm - 8pm UK)',
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [selectedCourseTab, setSelectedCourseTab] = useState<string>('all');
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [previewPage, setPreviewPage] = useState<number>(0);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState<boolean>(true);

  useEffect(() => {
    let title = 'Online Quran Academy UK | Kids & Females | 1-on-1 Tutors';
    let description =
      'Learn Quran online with certified female tutors in the UK. Flexible 1-to-1 UK schedules for kids & sisters. Book your 3-Day Free Trial today!';

    if (pageView === 'home') {
      title = 'Online Quran Academy UK | Kids & Females | 1-on-1 Tutors';
      description =
        'Learn Quran online with certified female tutors in the UK. Flexible 1-to-1 UK schedules for kids & sisters. Book your 3-Day Free Trial today!';
    } else if (pageView === 'core-courses') {
      title = 'Core Quran Courses | Abdullah Quran Academy UK';
      description =
        'Explore our 5 core online Quran courses for kids and sisters in the UK. 1-on-1 female tutors for Noorani Qaida, Tajweed reading, Hifdh, Tafseer, and Ijazah.';
    } else if (pageView === 'courses-hub') {
      title = 'Online Quran Courses Hub | Abdullah Quran Academy UK';
      description =
        'Explore accredited online Quran courses for kids and females in the UK. Noorani Qaida, Quran Reading, Tajweed, Hifdh, and Tafseer with 1-to-1 certified tutors.';
    } else if (pageView === 'course-detail') {
      const course = coursesData.find((c) => c.id === selectedCourseId);
      title = course ? `${course.title} | Abdullah Quran Academy UK` : 'Online Quran Course | Abdullah Quran Academy UK';
      if (course) {
        description = course.description;
      }
    } else if (pageView === 'free-trial') {
      title = 'Book 3-Day Free Online Quran Trial Class | Abdullah Quran Academy UK';
      description =
        'Book your 3-day free online Quran trial class in the UK. One-to-one lessons for kids and sisters with certified female Quran tutors on Zoom. No credit card required.';
    } else if (pageView === 'contact-us') {
      title = 'Contact Us | Abdullah Quran Academy UK Admissions';
      description =
        'Contact Abdullah Quran Academy UK admissions desk. Email abdullahquranacademy1998@gmail.com or WhatsApp +44 7446 361983 for 1-on-1 Quran classes for kids and sisters.';
    }

    document.title = title;

    // Update or create meta tags for SEO Chrome extension / crawlers
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    // Dynamic canonical link tag for SEO
    let canonicalUrl = 'https://quranacademy.co.uk/';
    if (pageView === 'home') {
      canonicalUrl = 'https://quranacademy.co.uk/';
    } else if (pageView === 'core-courses') {
      canonicalUrl = 'https://quranacademy.co.uk/core-courses';
    } else if (pageView === 'courses-hub') {
      canonicalUrl = 'https://quranacademy.co.uk/online-quran-courses';
    } else if (pageView === 'course-detail') {
      const course = coursesData.find((c) => c.id === selectedCourseId);
      canonicalUrl = course
        ? `https://quranacademy.co.uk/courses/${course.slug}`
        : 'https://quranacademy.co.uk/online-quran-courses';
    } else if (pageView === 'free-trial') {
      canonicalUrl = 'https://quranacademy.co.uk/free-trial';
    } else if (pageView === 'contact-us') {
      canonicalUrl = 'https://quranacademy.co.uk/contact-us';
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }
  }, [pageView, selectedCourseId]);

  const navigateTo = (
    view: 'home' | 'courses-hub' | 'core-courses' | 'course-detail' | 'free-trial' | 'contact-us',
    courseId?: string,
    courseName?: string,
    hash?: string
  ) => {
    if (courseId) setSelectedCourseId(courseId);
    if (courseName) setPreselectedCourse(courseName);
    setPageView(view);
    setIsCoursesDropdownOpen(false);
    setIsMobileMenuOpen(false);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.email) return;
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoForm({ name: '', email: '', phone: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: 'Why choose Abdullah Quran Academy as your trusted UK Quran academy?',
      a: 'As a dedicated UK Quran academy, we specialize in high-quality one-to-one online classes structured around British school terms and UK evening and weekend timezones. Our vetted female teachers provide safe, private home-based learning for children (ages 8+) and adult sisters throughout the UK.',
    },
    {
      q: 'What makes an online female Quran academy the best choice for sisters & kids?',
      a: 'Choosing an online female Quran academy ensures 100% privacy, comfort, and focused attention. All our tutors are certified female Hafizaat, Qari’ahs, and Alimahs who specialize in patient phonetics, Noorani Qaida, Tajweed rules, and Quran memorisation in a supportive environment.',
    },
    {
      q: 'What is the Higher Level of Ijazah program, and who is eligible?',
      a: 'The Higher Level of Ijazah is an advanced certification track exclusively available for 16+ female students and adult sisters. Under the direct supervision of certified female Ijazah scholars with connected Sanad (chains of transmission), students undergo rigorous theoretical Tajweed, Makharij precision, and oral Quran recitation to earn an accredited Ijazah certificate.',
    },
    {
      q: 'What is the minimum student age to join Quran classes?',
      a: 'The minimum student age is 8+ (at least 8 years old). From age 8, young students and teenagers possess the attention span and phonetic control required for structured Noorani Qaida, Tajweed rules, and fluent Quran recitation.',
    },
    {
      q: 'How do I enroll in a course via WhatsApp?',
      a: 'Enrolling is fast and simple! Tap any "Join on WhatsApp" button on our academy website or message us directly at +44 7446 361983. Our academic coordinator will discuss your requirements, match you with a certified female teacher, and schedule your free trial lesson immediately.',
    },
    {
      q: 'How do online Quran classes work on Zoom?',
      a: 'Classes are conducted 1-on-1 over Zoom with interactive screen-sharing, digital Tajweed Quran overlays, and real-time pronunciation guidance. All you need is a laptop, tablet, or smartphone with internet.',
    },
    {
      q: 'Is there a free trial class available before enrolling?',
      a: 'Yes! We offer a 3-Day Free Trial with certified female tutors. You can experience a live 1-on-1 lesson and test your schedule before confirming enrollment on WhatsApp.',
    },
  ];

  const testimonials = [
    {
      name: 'Sister Ayesha M.',
      location: 'London, UK',
      role: 'Parent Review (UK)',
      avatarInitials: 'AM',
      avatarBg: 'from-emerald-700 to-[#0b3c2d]',
      comment:
        'My 8-year-old daughter was very shy, but her female Quran tutor was so patient and encouraging. She completed her Noorani Qaida smoothly and is now reading Quran with proper Tajweed. Highly recommended!',
      tag: 'Noorani Qaida Student',
    },
    {
      name: 'Sister Fatima K.',
      location: 'Birmingham, UK',
      role: 'Adult Sister Review (UK)',
      avatarInitials: 'FK',
      avatarBg: 'from-amber-600 to-amber-700',
      comment:
        'Finding a dedicated 1-on-1 female teacher with flexible evening timings was difficult until I joined Abdullah Quran Academy. The Tajweed rules are taught clearly and systematically.',
      tag: 'Higher Level Tajweed',
    },
    {
      name: 'Brother Usman T.',
      location: 'Manchester, UK',
      role: 'Parent Review (UK)',
      avatarInitials: 'UT',
      avatarBg: 'from-emerald-800 to-teal-900',
      comment:
        'The 3-day free trial convinced us completely. The teachers are punctual, professional, and fluently speak English, which helps kids understand Quranic phonetics easily.',
      tag: 'Hifdh & Revision',
    },
  ];

  const coursesList = [
    {
      id: 'qaida',
      title: 'Noorani Qaida Course',
      desc: 'Arabic letters from zero, pronunciation and basic joining rules for beginners.',
      icon: '📖',
      tag: 'Beginner',
    },
    {
      id: 'basic-reading',
      title: 'Basic Quran Reading',
      desc: 'Fluent reading directly from the Mushaf with correct vowel and stop marks.',
      icon: '🕋',
      tag: 'Essentials',
    },
    {
      id: 'tajweed',
      title: 'Quran with Tajweed',
      desc: 'Recite correctly with precise Makharij, rules of Noon Sakinah, Meem Sakinah & Madd.',
      icon: '✨',
      tag: 'Popular',
    },
    {
      id: 'adv-tajweed',
      title: 'Advanced Tajweed & Qirat',
      desc: 'Refine your vocal melody and master classical Qirat variants with certified Teachers.',
      icon: '🎓',
      tag: 'Advanced',
    },
    {
      id: 'hifz',
      title: 'Hifdh — Quran Memorisation',
      desc: 'Systematic 1-on-1 memorisation plans with daily Sabaq, Sabqi, and Manzil reviews.',
      icon: '🧠',
      tag: 'Intensive',
    },
    {
      id: 'tafseer',
      title: 'Translation & Tafseer',
      desc: 'Understand the deep meanings, historical context, and guidance of Allah’s words.',
      icon: '💡',
      tag: 'Understanding',
    },
    {
      id: 'arabic',
      title: 'Arabic Language Course',
      desc: 'Read, write, speak, and comprehend classical Quranic and modern Arabic.',
      icon: '🌍',
      tag: 'Language',
    },
    {
      id: 'islamic-studies',
      title: 'Islamic Studies & Duas',
      desc: 'Essential Salah steps, daily Masnoon Duas, 40 Hadiths, and Islamic character building.',
      icon: '🕌',
      tag: 'Character',
    },
  ];

  const teachers = [
    {
      name: 'Umme Abdullah',
      role: 'Alimah Fazilah, Senior Tajweed Scholar & Ijazah Holder',
      exp: '12 yrs teaching experience',
      initials: 'UA',
      bg: 'bg-emerald-800',
      specs: ['Alimah Fazilah', '12 Yrs Experience', 'Ijazah Holder'],
    },
    {
      name: 'Sadia Samee',
      role: 'Basic Tajweed & Quran Reading',
      exp: '10+ yrs teaching',
      initials: 'SS',
      bg: 'bg-indigo-900',
      specs: ['Basic Tajweed', 'Quran Reading', 'Tafseer Lecturer'],
    },
    {
      name: 'Mamoona Tariq',
      role: 'Tajweed & Ijazah Holder',
      exp: '8+ yrs teaching',
      initials: 'MT',
      bg: 'bg-amber-700',
      specs: ['Tajweed', 'Ijazah Holder', 'Kids Specialist'],
    },
    {
      name: 'Saima Sohail',
      role: 'Certified Qaida, Tajweed & Ijazah Holder',
      exp: '7+ yrs teaching',
      initials: 'SS',
      bg: 'bg-teal-800',
      specs: ['Certified Qaida', 'Ijazah Holder', 'Quran Reading'],
    },
    {
      name: 'Saleha Ali',
      role: 'Certified Qaida & Quran Reading',
      exp: '6+ yrs teaching',
      initials: 'SA',
      bg: 'bg-emerald-900',
      specs: ['Certified Qaida', 'Quran Reading', 'Basic Tajweed'],
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="bg-[#FAF8F5] text-gray-800 font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Schema.org FAQPage Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Top Contact Header Bar */}
      <div className="bg-[#0b3c2d] text-emerald-100 text-[11px] py-2 border-b border-emerald-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-400" /> UK: <a href="tel:+447446361983" className="hover:underline font-mono">+44 7446 361983</a>
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-emerald-300" /> WhatsApp: <a href="https://wa.me/447446361983" target="_blank" rel="noreferrer" className="hover:underline font-mono text-emerald-300 font-bold">+44 7446 361983</a>
            </span>
            <span className="flex items-center gap-1 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30 text-amber-200">
              <Download className="w-2.5 h-2.5 text-amber-300" /> Book Download WhatsApp: <a href="https://wa.me/923277741707?text=Assalam%20o%20Alaikum!%20I%20want%20to%20download%20the%20Tajweed%20and%20Quran%20Course%20Books%20PDF." target="_blank" rel="noreferrer" className="hover:underline font-mono font-bold text-amber-300 ml-1">03277741707</a>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="w-3 h-3 text-amber-400" /> <a href="mailto:abdullahquranacademy1998@gmail.com" className="hover:underline font-mono text-amber-300">abdullahquranacademy1998@gmail.com</a>
            </span>
          </div>
          <div className="flex items-center gap-3 text-emerald-200">
            <span className="hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" /> Safe & Vetted Female Tutors Available
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Flexible UK Morning & Evening Timings</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-white border-b border-gray-100 shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 min-h-[84px] flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 hover:opacity-95 transition-opacity py-1 cursor-pointer text-left"
          >
            <QuranLogo
              brandName={settings.brandName || "Abdullah Quran Academy"}
              size={80}
              showText={false}
            />
          </button>

          {/* Navigation Links - Home, Core Courses, Online Quran Courses, Tajweed Book, Contact Us */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 font-bold text-xs tracking-wider uppercase">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                pageView === 'home'
                  ? 'bg-[#0b3c2d] text-amber-300 shadow-xs'
                  : 'text-gray-700 hover:text-[#0b3c2d] hover:bg-emerald-50'
              }`}
            >
              <span>Home</span>
            </button>

            {/* Core Courses Dedicated Page Link */}
            <button
              type="button"
              onClick={() => navigateTo('core-courses')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                pageView === 'core-courses'
                  ? 'bg-[#0b3c2d] text-amber-300 shadow-xs'
                  : 'text-gray-700 hover:text-[#0b3c2d] hover:bg-emerald-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Core Courses</span>
            </button>

            {/* Courses Hub Dropdown */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => navigateTo('courses-hub')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                  pageView === 'courses-hub' || pageView === 'course-detail'
                    ? 'bg-[#0b3c2d] text-amber-300 shadow-xs'
                    : 'text-gray-700 hover:text-[#0b3c2d] hover:bg-emerald-50'
                }`}
              >
                <span>All Courses Hub</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 hidden group-hover:block transition-all z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => navigateTo('core-courses')}
                    className="text-xs font-bold text-amber-700 hover:underline block text-left cursor-pointer mb-1"
                  >
                    ★ Explore 5 Core Courses Page &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('courses-hub')}
                    className="text-xs font-bold text-[#0b3c2d] hover:underline block text-left cursor-pointer"
                  >
                    View All Courses Catalog &rarr;
                  </button>
                  <p className="text-[10px] text-gray-500">Central Hub of all specializations</p>
                </div>
                <div className="py-1">
                  {coursesData.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => navigateTo('course-detail', course.id)}
                      className="w-full text-left px-4 py-2 hover:bg-amber-50 flex items-center gap-2.5 text-xs text-gray-700 hover:text-[#0b3c2d] transition-colors cursor-pointer"
                    >
                      <span className="text-base">{course.icon}</span>
                      <div>
                        <div className="font-bold">{course.title}</div>
                        <div className="text-[10px] text-gray-500">{course.category} • {course.ageRange}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setPreviewPage(0);
                setIsBookModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl text-gray-700 hover:text-[#0b3c2d] hover:bg-emerald-50 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Book className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tajweed Book</span>
            </button>

            {/* Contact Us Page Link */}
            <button
              type="button"
              onClick={() => navigateTo('contact-us')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                pageView === 'contact-us'
                  ? 'bg-[#0b3c2d] text-amber-300 shadow-xs'
                  : 'text-gray-700 hover:text-[#0b3c2d] hover:bg-emerald-50'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>Contact Us</span>
            </button>
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigateTo('free-trial')}
              className="px-4 sm:px-5 py-2.5 rounded-full bg-[#0b3c2d] hover:bg-[#155e47] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all hover:shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Free Trial</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:text-[#0b3c2d] hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('home');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
                pageView === 'home' ? 'bg-[#0b3c2d] text-amber-300' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('core-courses');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                pageView === 'core-courses' ? 'bg-[#0b3c2d] text-amber-300' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Core Courses (Dedicated Page)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('courses-hub');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
                pageView === 'courses-hub' || pageView === 'course-detail' ? 'bg-[#0b3c2d] text-amber-300' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Courses Hub
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setPreviewPage(0);
                setIsBookModalOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Book className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tajweed Book</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('contact-us');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                pageView === 'contact-us' ? 'bg-[#0b3c2d] text-amber-300' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>Contact Us (Admissions & Form)</span>
            </button>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <a
                href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20want%20to%20inquire%20about%20female%20tutor%20classes."
                target="_blank"
                rel="noreferrer"
                className="w-full text-center px-4 py-2.5 rounded-full bg-amber-500 text-gray-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp: +44 7446 361983
              </a>
              <a
                href="https://wa.me/923277741707?text=Assalam%20o%20Alaikum!%20I%20want%20to%20download%20the%20Quran%20and%20Tajweed%20Course%20Books%20PDF."
                target="_blank"
                rel="noreferrer"
                className="w-full text-center px-4 py-2 rounded-full bg-emerald-800 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs border border-amber-400/40"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" /> Book Download: 03277741707
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Conditional Sub-Pages: Core Courses, Courses Hub, Course Details, Free Trial, Contact Us */}
      {pageView === 'core-courses' && (
        <CoreCoursesView
          onSelectCourse={(id) => navigateTo('course-detail', id)}
          onGoToFreeTrial={(course) => navigateTo('free-trial', undefined, course)}
          onGoToHome={() => navigateTo('home')}
          onGoToContact={() => navigateTo('contact-us')}
        />
      )}

      {pageView === 'contact-us' && (
        <ContactUsView
          onGoToHome={() => navigateTo('home')}
          onGoToCourses={() => navigateTo('core-courses')}
          onGoToFreeTrial={(course) => navigateTo('free-trial', undefined, course)}
        />
      )}

      {pageView === 'courses-hub' && (
        <CoursesHubView
          onSelectCourse={(id) => navigateTo('course-detail', id)}
          onGoToFreeTrial={(course) => navigateTo('free-trial', undefined, course)}
          onGoToHome={() => navigateTo('home')}
        />
      )}

      {pageView === 'course-detail' && (
        <CourseDetailView
          courseId={selectedCourseId}
          onBackToHub={() => navigateTo('courses-hub')}
          onGoToHome={() => navigateTo('home')}
          onGoToFreeTrial={(course) => navigateTo('free-trial', undefined, course)}
          onSelectOtherCourse={(id) => navigateTo('course-detail', id)}
          onOpenTajweedBook={() => {
            setPreviewPage(0);
            setIsBookModalOpen(true);
          }}
        />
      )}

      {pageView === 'free-trial' && (
        <FreeTrialView
          initialCourse={preselectedCourse}
          onGoToHome={() => navigateTo('home')}
          onGoToCoursesHub={() => navigateTo('courses-hub')}
        />
      )}

      {/* Page 1: Homepage (Main Authority Page with Section-by-Section Architecture) */}
      {pageView === 'home' && (
        <>
          {/* Section 1: Hero & Main Authority (User Meta Title & Description) */}
          <section id="home" className="relative bg-linear-to-b from-[#FAF8F5] via-white to-[#F4EFE6] pt-8 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Visual Arch Showcase */}
                <div className="lg:col-span-5 relative flex justify-center animate-box">
                  {/* Islamic Arch Framework Background */}
                  <div className="relative w-72 sm:w-80 h-[380px] sm:h-[420px] rounded-t-full border-8 border-amber-400/80 bg-linear-to-b from-amber-100 to-amber-50/20 shadow-2xl overflow-hidden p-3 flex flex-col items-center justify-end box-hover-lift">
                    <img
                      src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=65&w=480"
                      alt="Online Quran Academy UK - 1-to-1 Quran Classes with Certified Female Teachers"
                      title="Online Quran Academy UK - Certified 1-to-1 Quran Classes for Students and Sisters"
                      width={320}
                      height={420}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover rounded-t-full shadow-md transition-transform duration-500 hover:scale-105"
                    />

                    <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-amber-200 text-center shadow-lg">
                      <div className="text-[11px] font-bold text-[#0b3c2d] uppercase tracking-wider">
                        ★ Certified 1-on-1 Tutors
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">Certified Female Islamic Teachers & Hafizaat</div>
                    </div>
                  </div>

                  {/* Floating Badge with pure CSS float */}
                  <div className="absolute top-6 left-2 sm:-left-4 bg-[#0b3c2d] text-white p-3 rounded-2xl shadow-xl border border-amber-400 max-w-[150px] animate-float-slow select-none">
                    <div className="text-xl font-bold text-amber-400">Since 2021</div>
                    <div className="text-[10px] text-emerald-100 leading-tight mt-0.5">6+ Years Online Quran Excellence</div>
                  </div>
                </div>

                {/* Right Column: Calligraphy, Hadith & Main Heading */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  {/* Surah Al-Isra Ayah 82 with Tarjuma / Translation */}
                  <div className="animate-box bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5 inline-block text-center shadow-xs max-w-xl box-hover-lift">
                    <p className="font-serif text-amber-950 font-bold text-xl sm:text-2xl leading-relaxed tracking-wide dir-rtl" dir="rtl">
                      وَنُنَزِّلُ مِنَ ٱلۡقُرۡءَانِ مَا هُوَ شِفَآءٞ وَرَحۡمَةٞ لِّلۡمُؤۡمِنِينَ
                    </p>
                    <div className="mt-2.5 pt-2.5 border-t border-amber-200/80 space-y-1.5">
                      <p className="text-xs sm:text-sm text-amber-950 font-medium font-serif leading-relaxed dir-rtl" dir="rtl">
                        ترجمہ: اور ہم قرآن میں سے وہ چیز نازل کرتے ہیں جو ایمان والوں کے لیے شفا اور رحمت ہے۔
                      </p>
                      <p className="text-[11px] sm:text-xs text-amber-900/90 italic leading-normal">
                        Translation: "And We send down of the Qur'an that which is healing and mercy for the believers."
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-amber-800 font-bold uppercase tracking-wider block mt-2">
                      — سورة الإسراء (Surah Al-Isra: 82)
                    </span>
                  </div>

                  {/* User-specified H1 (Occurrence 1 of 2: Kids & Females) */}
                  <h1 className="animate-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b3c2d] leading-tight tracking-tight font-serif">
                    Online Quran Academy in the UK for Kids & Females
                  </h1>

                  {/* Lead Description without repetitive keyword stuffing */}
                  <p className="animate-subheading text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl font-normal">
                    Learn Quran online in the UK with Abdullah Quran Academy. Expert Quran classes for young learners and adult sisters, including Tajweed, Hifdh, Qaida, Ijazah, and flexible 1-to-1 lessons with certified female tutors.
                  </p>

                  {/* Trust Highlights */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-gray-700 pt-1">
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs box-hover-lift anim-delay-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Safe for Kids & Sisters
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs box-hover-lift anim-delay-2">
                      <Clock className="w-4 h-4 text-amber-600" /> Flexible UK Timings
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs box-hover-lift anim-delay-3">
                      <Award className="w-4 h-4 text-indigo-600" /> 3-Day Free Trial Class
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                    <a
                      href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20want%20to%20join%20a%20course%20with%20a%20Female%20Teacher."
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-[#0b3c2d] font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-200 transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-[#0b3c2d]" /> Join via WhatsApp: +44 7446 361983
                    </a>

                    <button
                      type="button"
                      onClick={() => navigateTo('free-trial')}
                      className="px-6 py-3.5 rounded-full bg-[#0b3c2d] hover:bg-[#155e47] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                    >
                      Book Free Trial Class <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* Value Overview Banner - CSS Selector 1 */}
      <section className="bg-white py-12 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <h2 className="animate-heading text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif">
            Online Quran Academy UK — <span className="text-amber-600">Live 1-to-1 Classes</span> for Students & Sisters
          </h2>
          <p className="animate-subheading text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Abdullah Quran Academy is a dedicated online Quran academy in the UK, providing personalized one-to-one Quran education since 2021. British Muslim students and adult sisters in over 10+ countries learn Noorani Qaida, Tajweed, Hifdh, and Islamic studies with certified female teachers — live on Zoom, with schedules tailored to UK school routines. Parents and students can{' '}
            <button
              type="button"
              onClick={() => navigateTo('courses-hub')}
              className="text-emerald-800 font-bold underline hover:text-amber-600 transition-colors cursor-pointer"
            >
              Explore our Online Quran Courses
            </button>{' '}
            or{' '}
            <button
              type="button"
              onClick={() => navigateTo('free-trial')}
              className="text-emerald-800 font-bold underline hover:text-amber-600 transition-colors cursor-pointer"
            >
              Book a 3-Day Free Trial
            </button>{' '}
            with zero upfront commitment.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20want%20to%20join%20a%20course%20with%20a%20Female%20Teacher."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#0b3c2d] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#155e47] flex items-center gap-2 transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-amber-400" />
              Join Course via WhatsApp (+44 7446 361983)
            </a>
            <button
              type="button"
              onClick={() => navigateTo('courses-hub')}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-800 font-semibold text-xs uppercase tracking-wider hover:bg-gray-200 cursor-pointer transition-transform hover:scale-105"
            >
              View Online Courses
            </button>
          </div>
        </div>
      </section>

      {/* Counter Stats Bar - Deep Emerald - CSS Selectors 2 & 3 */}
      <section className="bg-[#0b3c2d] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="border-r border-emerald-800 p-2 box-hover-lift rounded-xl transition-all">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-serif">6+</div>
            <div className="text-xs text-emerald-100 uppercase tracking-wider mt-1 font-medium">Years Online Quran Teaching</div>
          </div>
          <div className="border-r-0 md:border-r border-emerald-800 p-2 box-hover-lift rounded-xl transition-all">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-serif">5+</div>
            <div className="text-xs text-emerald-100 uppercase tracking-wider mt-1 font-medium">Qualified Female Tutors</div>
          </div>
          <div className="border-r border-emerald-800 p-2 box-hover-lift rounded-xl transition-all">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-serif">10+</div>
            <div className="text-xs text-emerald-100 uppercase tracking-wider mt-1 font-medium">Countries Reached</div>
          </div>
          <div className="p-2 box-hover-lift rounded-xl transition-all">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-serif">99%</div>
            <div className="text-xs text-emerald-100 uppercase tracking-wider mt-1 font-medium">Parent Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Start Learning Quran Today in 3 Easy Steps */}
      <section id="about" className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="animate-heading text-3xl font-bold text-[#0b3c2d] font-serif">
              Start <span className="text-amber-600">Learning Quran</span> Today in 3 Easy Steps
            </h2>
            <p className="animate-subheading text-xs text-gray-500 mt-2">Register yourself or register your child with us today and take your first free trial class.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4 box-hover-lift animate-box anim-delay-1">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">One Click Registration</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Simply fill out our short form to{' '}
                    <button
                      type="button"
                      onClick={() => navigateTo('free-trial')}
                      className="text-emerald-800 font-bold underline hover:text-amber-600 cursor-pointer"
                    >
                      Register Today
                    </button>{' '}
                    and get paired with a dedicated female Quran teacher.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4 box-hover-lift animate-box anim-delay-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Schedule Free Trial</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Choose your suitable days and timings to{' '}
                    <button
                      type="button"
                      onClick={() => navigateTo('free-trial')}
                      className="text-emerald-800 font-bold underline hover:text-amber-600 cursor-pointer"
                    >
                      Book a 3-Day Free Trial
                    </button>{' '}
                    with live Zoom sessions and personalized feedback.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4 box-hover-lift animate-box anim-delay-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Start Taking Your First Class</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Login to our portal with credentials provided and start taking live 1-on-1 Quran classes with your dedicated Quran teacher.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image Frame */}
            <div className="lg:col-span-5 flex justify-center animate-box anim-delay-2">
              <div className="rounded-3xl border-4 border-amber-400 p-2 bg-white shadow-xl max-w-sm box-hover-lift">
                <img
                  src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=65&w=480"
                  alt="Young student reciting Holy Quran with proper Tajweed in online 1-to-1 Quran class UK"
                  title="Learn Quran Online with Tajweed - Abdullah Quran Academy UK"
                  width={384}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl w-full h-[360px] object-cover transition-transform duration-500 hover:scale-102"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center animate-box">
              <div className="rounded-3xl border-4 border-[#0b3c2d] p-2 bg-amber-50 shadow-xl max-w-sm box-hover-lift">
                <img
                  src={girlReadingQuranImg || "https://live.staticflickr.com/65535/48172471572_5d800a52b4_b.jpg"}
                  alt="Female student learning Quran recitation with qualified female Quran tutor in the UK"
                  title="Dedicated Online Quran Classes for Females and Sisters in the UK"
                  width={384}
                  height={380}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl w-full h-[380px] object-cover transition-transform duration-500 hover:scale-102"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="animate-heading text-3xl font-bold text-[#0b3c2d] font-serif">
                Why Choose Our <span className="text-amber-600">Online Quran Academy UK</span>
              </h2>

              <p className="animate-subheading text-xs text-gray-600 leading-relaxed">
                We take full responsibility for good results. We guide your children step by step at the highest level to learn to read Quran online with proper Tajweed rules, progressing from foundational Qaida up to our specialized{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('course-detail', 'tajweed-rules')}
                  className="text-emerald-800 font-bold underline hover:text-amber-600 cursor-pointer"
                >
                  Higher Level of Ijazah Program
                </button>.
              </p>

              <h3 className="text-sm font-bold text-[#0b3c2d] uppercase tracking-wider">
                Dedicated Academic Standards for UK Families
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-gray-800">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 box-hover-lift">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <button
                      type="button"
                      onClick={() => navigateTo('free-trial')}
                      className="text-gray-800 font-semibold underline hover:text-emerald-800 cursor-pointer"
                    >
                      Book a 3-Day Free Trial
                    </button>{' '}
                    class with full tutor access
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 box-hover-lift">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Your desired timings & days
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 box-hover-lift">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Tajweed Quran word by word
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 box-hover-lift">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Female Quran Teachers for young learners & sisters
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 box-hover-lift">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Monthly assessment of children progress
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 box-hover-lift">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Fluent English speaking Quran teachers
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="#courses"
                  className="px-5 py-2.5 bg-[#0b3c2d] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-transform hover:scale-105"
                >
                  Our Courses
                </a>
                <a
                  href="#demo-form"
                  className="px-5 py-2.5 bg-amber-500 text-gray-900 font-bold text-xs uppercase tracking-wider rounded-lg transition-transform hover:scale-105"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Teachers */}
      <section id="teachers" className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="animate-heading text-3xl font-bold text-[#0b3c2d] font-serif">
              Meet Our <span className="text-amber-600">Certified Female Quran Teachers</span> in the UK
            </h2>
            <p className="animate-subheading text-xs text-gray-500 mt-1">Certified Female Scholars, Ijazah Holders & Qaida Specialists — safe, dedicated 1-on-1 private classes for young learners and sisters.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {teachers.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-xs box-hover-lift animate-box space-y-3">
                <div className={`w-16 h-16 mx-auto rounded-full ${t.bg} text-white flex items-center justify-center font-bold text-xl shadow-inner`}>
                  {t.initials}
                </div>

                <div>
                  <h3 className="font-bold text-sm text-gray-900">{t.name}</h3>
                  <p className="text-[11px] font-semibold text-emerald-700">{t.role}</p>
                  <div className="text-[10px] text-gray-500 font-medium mt-0.5">{t.exp}</div>
                </div>

                <div className="flex flex-wrap justify-center gap-1 pt-1">
                  {t.specs.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-medium rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Quran Courses Preview (Links to Page 2 Course Hub) */}
      <section id="courses" className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" /> Core Quran Courses
              </span>
              <h2 className="animate-heading text-3xl font-bold text-[#0b3c2d] font-serif">
                Online Quran Courses — <span className="text-amber-600">5 Structured Learning Paths</span>
              </h2>
              <p className="animate-subheading text-xs sm:text-sm text-gray-600 mt-2">
                From foundational Noorani Qaida (age 8+) to advanced recitation and memorisation. Parents and sisters can{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('core-courses')}
                  className="text-amber-700 font-bold underline hover:text-[#0b3c2d] cursor-pointer"
                >
                  View Our Dedicated Core Courses Page
                </button>{' '}
                or{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('courses-hub')}
                  className="text-emerald-800 font-bold underline hover:text-amber-600 cursor-pointer"
                >
                  Explore Complete Syllabus Catalog
                </button>{' '}
                with detailed weekly modules.
              </p>
            </div>

            {/* Direct Links to Core Courses and Hub */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => navigateTo('core-courses')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <BookOpen className="w-4 h-4 text-gray-950" />
                <span>Dedicated Core Courses Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('courses-hub')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0b3c2d] hover:bg-[#155e47] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <span>All Courses Hub</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className="bg-[#FAF8F5] p-6 rounded-2xl border border-gray-200 hover:border-amber-400 shadow-2xs box-hover-lift animate-box flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2.5 bg-white rounded-xl shadow-2xs border border-gray-100">{course.icon}</span>
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10.5px] font-bold uppercase rounded-md border border-amber-200">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0b3c2d] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[3.75rem]">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium pt-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{course.duration}</span>
                    <span>•</span>
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{course.ageRange}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateTo('course-detail', course.id)}
                    className="text-xs font-bold text-[#0b3c2d] hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    View Syllabus &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('free-trial', undefined, course.title)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0b3c2d] hover:bg-[#155e47] text-white text-[11px] font-bold tracking-wide transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Book Free Trial</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Hub Navigation Banner */}
          <div className="mt-10 bg-linear-to-r from-emerald-900 to-[#0b3c2d] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-400/30 shadow-lg box-hover-lift">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-base text-amber-300 font-serif">Looking for our specialized syllabus & course guides?</h3>
              <p className="text-xs text-emerald-100/90">Visit the Online Quran Courses Hub to compare levels, prerequisites, and learning outcomes.</p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('courses-hub')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-md transition-transform hover:scale-105"
            >
              Go to Courses Hub Page
            </button>
          </div>
        </div>
      </section>

      {/* Course Material & Free Book Section with Preview and Download under Islamic Courses */}
      <section className="py-14 bg-gradient-to-r from-emerald-900 via-[#0b3c2d] to-emerald-950 text-white relative overflow-hidden border-t-2 border-b-2 border-amber-400">
        {/* Decorative ambient lighting */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-amber-400/30 shadow-2xl box-hover-glow">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left Info */}
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Official Tajweed Guide (95-Page Book)
                </div>

                <h2 className="animate-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
                  Master Quranic Recitation with Our <span className="text-amber-400">Tajweed Book</span>
                </h2>

                <p className="animate-subheading text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Enhance your learning with <strong>القول المفيد في قواعد التجويد (A Clear and Beneficial Guide to Tajweed Rules)</strong> by Umm Abdullah. Covering 21 comprehensive chapters from basic Makharij to advanced Sifaat, Madd, and Waqf rules. You can{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewPage(0);
                      setIsBookModalOpen(true);
                    }}
                    className="text-amber-300 font-bold underline hover:text-white transition-colors cursor-pointer"
                  >
                    Download Tajweed Book PDF
                  </button>{' '}
                  to practice alongside your live classes.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-emerald-200">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4 text-amber-400" /> 21 Complete Chapters
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4 text-amber-400" /> Makharij & Sifaat Diagrams
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4 text-amber-400" /> Full PDF on WhatsApp
                  </span>
                </div>

                {/* 2 Requested Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {/* Button 1: Preview Book */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewPage(0);
                      setIsBookModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-[#0b3c2d] font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-emerald-700" />
                    <span>Preview Book (کتاب کا جائزہ)</span>
                  </button>

                  {/* Button 2: Download on WhatsApp */}
                  <a
                    href="https://wa.me/923277741707?text=Assalam%20o%20Alaikum!%20I%20want%20to%20download%20the%20Tajweed%20Book%20(A%20Clear%20and%20Beneficial%20Guide%20to%20Tajweed%20Rules)%20PDF."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4 text-gray-950" />
                    <span>Download (03277741707)</span>
                    <MessageCircle className="w-4 h-4 text-emerald-950" />
                  </a>
                </div>
              </div>

              {/* Right Visual Book Box - Styled like the actual Tajweed Book Cover */}
              <div className="shrink-0 w-full max-w-xs flex justify-center">
                <div
                  onClick={() => {
                    setPreviewPage(0);
                    setIsBookModalOpen(true);
                  }}
                  className="group cursor-pointer bg-gradient-to-b from-[#FAF8F3] via-[#F4EFE4] to-[#EAE0D0] border-2 border-amber-400 p-4 sm:p-5 rounded-2xl shadow-2xl text-center space-y-3 box-hover-lift w-full"
                >
                  {/* Book Cover Mockup matching uploaded PDF */}
                  <div className="w-36 h-52 mx-auto bg-[#FDFBF7] rounded-xl shadow-xl border-2 border-amber-600/40 p-2.5 flex flex-col justify-between text-gray-900 relative overflow-hidden ring-4 ring-amber-400/20">
                    {/* Top Islamic Arch & Crescent */}
                    <div className="text-center">
                      <div className="w-6 h-6 mx-auto rounded-full bg-emerald-900/10 flex items-center justify-center text-amber-700 text-[10px] font-serif font-bold">
                        ☪
                      </div>
                      <div className="text-[7px] font-bold text-gray-600 tracking-wider uppercase mt-0.5">Samr Centre</div>
                    </div>

                    {/* Book Arabic Title */}
                    <div className="my-auto py-1">
                      <div className="font-serif font-black text-sm text-[#0b3c2d] leading-tight" dir="rtl">
                        القول المفيد
                      </div>
                      <div className="font-serif font-bold text-xs text-amber-800 leading-tight" dir="rtl">
                        في قواعد التجويد
                      </div>
                      <div className="w-8 h-0.5 bg-amber-500 mx-auto my-1" />
                      <div className="text-[7px] font-semibold text-gray-700 leading-tight">
                        A Clear and Beneficial Guide to Tajweed Rules
                      </div>
                      <div className="text-[6.5px] font-bold text-emerald-800 mt-1 bg-amber-100/80 px-1 py-0.5 rounded-sm inline-block">
                        By Umm Abdullah
                      </div>
                    </div>

                    {/* Open Quran Graphic / Bottom Badge */}
                    <div className="bg-[#0b3c2d] text-amber-300 rounded-md py-1 text-[7.5px] font-bold tracking-wider uppercase flex items-center justify-center gap-1">
                      <BookOpen className="w-2.5 h-2.5" /> 95-Page PDF Guide
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs text-[#0b3c2d]">Tajweed Book</h3>
                    <p className="text-[10px] text-gray-600 mt-0.5">Click to flip & preview Tajweed book</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-white/90 border border-amber-300 px-3 py-1 rounded-full shadow-xs">
                    <Eye className="w-3.5 h-3.5 text-amber-600" /> Open Quick Preview
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Flexible Class Schedules & WhatsApp Enrollment */}
      <section id="packages" className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" /> WhatsApp Course Enrollment
            </span>
            <h2 className="animate-heading text-3xl font-bold text-[#0b3c2d] font-serif">
              Flexible Class Schedules for <span className="text-amber-600">Students & Sisters</span>
            </h2>
            <p className="animate-subheading text-xs sm:text-sm text-gray-600 mt-2">
              Select your preferred weekly schedule and start one-to-one lessons on Zoom. Join directly via WhatsApp to discuss timings and tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Plan 2 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-amber-400 text-center shadow-md flex flex-col justify-between relative box-hover-lift animate-box">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-gray-950 font-bold text-[10px] uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-900 font-black text-base flex items-center justify-center mb-3">3D</div>
                <h3 className="text-lg font-bold text-[#0b3c2d]">3 Days a Week</h3>
                <p className="text-xs font-bold text-amber-700 mt-1">Consistent Progress</p>
                <p className="text-xs text-gray-500 mt-2">Recommended for fluent Quran Reading and Tajweed mastery.</p>
              </div>
              <a
                href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20want%20to%20join%20the%203-Days-a-Week%20Course%20with%20a%20Female%20Teacher."
                target="_blank"
                rel="noreferrer"
                className="mt-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-gray-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-gray-950" />
                Join via WhatsApp
              </a>
            </div>

            {/* Plan 3: Higher Level of Ijazah (Exclusively 16+ Females) */}
            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-800 text-center shadow-md flex flex-col justify-between box-hover-lift animate-box relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-800 text-amber-300 font-bold text-[10px] uppercase tracking-wider shadow-xs whitespace-nowrap">
                Exclusively 16+ Females
              </span>
              <div>
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-900 font-black text-base flex items-center justify-center mb-3">IJ</div>
                <h3 className="text-lg font-bold text-[#0b3c2d]">Higher Level of Ijazah</h3>
                <p className="text-xs font-bold text-emerald-700 mt-1">Sanad Certification Track (16+ Females)</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Specialized one-to-one Ijazah classes reserved exclusively for 16+ females and adult sisters. Learn more about our{' '}
                  <button
                    type="button"
                    onClick={() => navigateTo('course-detail', 'tajweed-rules')}
                    className="text-emerald-800 font-bold underline hover:text-amber-700 cursor-pointer"
                  >
                    Higher Level of Ijazah Program
                  </button>{' '}
                  for rigorous theoretical Tajweed, Makharij mastery, and authentic Sanad transmission with certified female scholars.
                </p>
                <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] font-semibold text-gray-700 space-y-1 text-left">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Exclusively 16+ female students</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Continuous Sanad to the Prophet (PBUH)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>1-on-1 sessions with Ijazah holders</span>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20want%20to%20apply%20for%20the%20Higher%20Level%20of%20Ijazah%20Program%20(16%2B%20Females%20Only)."
                target="_blank"
                rel="noreferrer"
                className="mt-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                Join Ijazah on WhatsApp (16+)
              </a>
            </div>

            {/* Plan 4 */}
            <div className="bg-[#0b3c2d] text-white p-6 rounded-2xl border border-amber-400 text-center shadow-lg flex flex-col justify-between box-hover-lift animate-box">
              <div>
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-gray-950 font-black text-base flex items-center justify-center mb-3">5D</div>
                <h3 className="text-lg font-bold text-amber-300">5 Days a Week</h3>
                <p className="text-xs font-bold text-emerald-200 mt-1">Intensive Track</p>
                <p className="text-xs text-emerald-100/80 mt-2">Daily Sabaq, Sabqi, and Manzil for accelerated Quran Memorisation.</p>
              </div>
              <a
                href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20want%20to%20join%20the%205-Days%20Intensive%20Course%20with%20a%20Female%20Teacher."
                target="_blank"
                rel="noreferrer"
                className="mt-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 text-gray-950" />
                Join via WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20would%20like%20to%20book%20a%203-Day%20Free%20Trial%20with%20a%20Female%20Teacher."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Or Start with a 3-Day Free Trial on WhatsApp (+44 7446 361983)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials & Parent Reviews Section */}
      <section id="testimonials" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 100+ Verified 5-Star Reviews
            </span>
            <h2 className="animate-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b3c2d] font-serif">
              What Parents & Students <span className="text-amber-600">Say About Us</span>
            </h2>
            <p className="animate-subheading text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Real feedback from UK families and sisters learning Quran with our certified female tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group box-hover-lift"
              >
                <div className="absolute top-6 right-6 text-emerald-100/90 group-hover:text-emerald-200 transition-colors pointer-events-none">
                  <Quote className="w-8 h-8" />
                </div>

                <div>
                  {/* 5-Star Rating & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {item.tag}
                    </span>
                  </div>

                  {/* Authentic Quote Styling */}
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic relative z-10">
                    "{item.comment}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.avatarBg} text-amber-300 font-bold text-sm flex items-center justify-center shadow-xs shrink-0 ring-2 ring-amber-400/30`}>
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      {item.name}
                      <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200/50">Verified</span>
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                      <span className="flex items-center gap-1 text-gray-600 font-medium">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="text-gray-500">{item.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Trust Bar */}
          <div className="mt-10 pt-6 border-t border-gray-200/70 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Safe 1-on-1 Environment</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>DBS-Checked Certified Female Tutors</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Flexible After-School & Weekend Slots</span>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="animate-heading text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif">Frequently Asked Questions — <span className="text-amber-600">Online Quran Academy UK</span></h2>
            <p className="animate-subheading text-xs text-gray-500 mt-1">Quick answers for UK parents and female students before booking a free trial.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs box-hover-lift transition-all">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-semibold text-xs sm:text-sm text-gray-900 flex items-center justify-between gap-4 hover:bg-gray-50"
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 m-0 p-0 text-left">{faq.q}</h3>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeFaq === idx ? 'rotate-180 text-amber-600' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-gray-600 border-t border-gray-100 bg-gray-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Free Trial Booking Form (Main Conversion Target) */}
      <section id="demo-form" className="py-16 bg-gradient-to-b from-[#FAF8F5] via-white to-amber-50/40 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-900/20 shadow-xl relative overflow-hidden box-hover-glow animate-box">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" /> 3-Day Free Trial Class
              </span>
              <h2 className="animate-heading text-2xl sm:text-3xl font-extrabold text-[#0b3c2d] font-serif">
                Book Your 3-Day Free Trial Class for Kids & Females
              </h2>
              <p className="animate-subheading text-xs sm:text-sm text-gray-600">
                Safe, personalised one-to-one classes with certified female tutors. Flexible UK timings. No credit card required.
              </p>
            </div>

            {demoSubmitted ? (
              <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-8 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0b3c2d]">JazakAllah Khair! Trial Request Received</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Our UK academic coordinator will contact you on WhatsApp / Phone within 15 minutes to confirm your preferred teacher and time slot.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20just%20submitted%20a%20trial%20request%20for%20a%20Female%20Teacher."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" /> Message Us on WhatsApp Instantly (+44 7446 361983)
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Parent / Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      placeholder="e.g. Sister Fatima / Parent"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] text-xs bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] text-xs bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      placeholder="+44 7446 361983"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] text-xs bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Select Course
                    </label>
                    <select
                      value={demoForm.course}
                      onChange={(e) => setDemoForm({ ...demoForm, course: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] text-xs bg-white"
                    >
                      <option>Noorani Qaida for Beginners & Kids (8+)</option>
                      <option>Quran Reading with Tajweed Rules</option>
                      <option>Higher Level of Tajweed & Tarteel</option>
                      <option>Hifdh — Quran Memorisation</option>
                      <option>Quran Translation & Tafseer</option>
                      <option>Higher Level of Ijazah (16+ Females Only)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Teacher Specialization
                    </label>
                    <select
                      value={demoForm.tutor}
                      onChange={(e) => setDemoForm({ ...demoForm, tutor: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] text-xs bg-white"
                    >
                      <option>Certified Female Tutor (Hafiza / Tajweed)</option>
                      <option>Senior Female Alimah (Tafseer & Arabic)</option>
                      <option>Kids Phonics Specialist Female Teacher</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Free Trial • Certified Female Tutors • Safe 1-on-1 Classes</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <a
                      href="https://wa.me/447446361983?text=Hello%20Abdullah%20Quran%20Academy,%20I%20want%20to%20join%20a%20Quran%20course%20with%20a%20Female%20Teacher."
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4 text-gray-950" />
                      Join on WhatsApp (+44 7446 361983)
                    </a>
                    <button
                      type="submit"
                      className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#0b3c2d] hover:bg-[#155e47] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Confirm Free Trial</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3 box-hover-lift rounded-xl transition-all">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-gray-900">Child-safe by design</div>
            <div className="text-[11px] text-gray-500">Vetted background-checked teachers.</div>
          </div>
          <div className="p-3 box-hover-lift rounded-xl transition-all">
            <Users className="w-6 h-6 text-amber-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-gray-900">One-to-one, always</div>
            <div className="text-[11px] text-gray-500">Private classes with your own teacher.</div>
          </div>
          <div className="p-3 box-hover-lift rounded-xl transition-all">
            <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-gray-900">Privacy protected</div>
            <div className="text-[11px] text-gray-500">Secure payment & student data.</div>
          </div>
          <div className="p-3 box-hover-lift rounded-xl transition-all">
            <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-gray-900">Free trial, no card</div>
            <div className="text-[11px] text-gray-500">Try 3 real lessons with zero risk.</div>
          </div>
        </div>
      </section>
      </>
      )}





      {/* Academy Footer */}
      <footer className="bg-[#07251c] text-white pt-16 pb-8 border-t-2 border-amber-400/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
            
            {/* Column 1: Brand & About */}
            <div className="space-y-4">
              <QuranLogo
                brandName={settings.brandName || "Abdullah Quran Academy"}
                subText="UK, 2026"
                size={58}
                variant="dark"
              />
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                A non-partisan, dedicated online Quran academy providing personalized 1-on-1 classes for kids, adults, and sisters worldwide with certified Islamic tutors.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://wa.me/447446361983"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 flex items-center justify-center transition-colors text-xs font-bold"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="tel:+447446361983"
                  className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 flex items-center justify-center transition-colors text-xs font-bold"
                  title="Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="mailto:abdullahquranacademy1998@gmail.com"
                  className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 flex items-center justify-center transition-colors text-xs font-bold"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Popular Courses */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-serif text-amber-300 uppercase tracking-wider">Courses (Hub & Syllabi)</h3>
              <ul className="space-y-2 text-xs text-emerald-100/80">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('core-courses')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-amber-300 font-bold"
                  >
                    <span className="text-amber-400">★</span> <strong>Core Quran Courses (5 Paths)</strong>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('courses-hub')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> All Courses Hub (Page 2)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('course-detail', 'noorani-qaida')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Noorani Qaida for Beginners
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('course-detail', 'quran-reading')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Quran Reading with Tajweed
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('course-detail', 'tajweed-rules')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Higher Level of Tajweed
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('course-detail', 'quran-hifz')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Quran Memorization (Hifdh)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('course-detail', 'translation-tafseer')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Translation & Tafseer
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-serif text-amber-300 uppercase tracking-wider">Site Hierarchy</h3>
              <ul className="space-y-2 text-xs text-emerald-100/80">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('home')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Homepage (Main Authority)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('core-courses')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-amber-200"
                  >
                    <span className="text-amber-400">›</span> Core Courses (Dedicated Page)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('courses-hub')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Online Quran Courses (Page 2)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('contact-us')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-amber-200 font-semibold"
                  >
                    <span className="text-amber-400">›</span> Contact Us (Form & Email)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('free-trial')}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Free Trial Class (Page 5)
                  </button>
                </li>
                <li>
                  <a
                    href="#packages"
                    onClick={(e) => {
                      if (pageView !== 'home') {
                        e.preventDefault();
                        navigateTo('home', undefined, undefined, 'packages');
                      }
                    }}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-amber-400">›</span> Higher Level of Ijazah (16+)
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewPage(0);
                      setIsBookModalOpen(true);
                    }}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-400">›</span> Tajweed Book (PDF)
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Trial */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-serif text-amber-300 uppercase tracking-wider">Contact & Support</h3>
              <div className="space-y-2 text-xs text-emerald-100/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>UK Phone: <a href="tel:+447446361983" className="hover:underline font-mono text-white">+44 7446 361983</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp: <a href="https://wa.me/447446361983" target="_blank" rel="noreferrer" className="hover:underline font-mono text-emerald-300 font-bold">+44 7446 361983</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Book Download: <a href="https://wa.me/923277741707" target="_blank" rel="noreferrer" className="hover:underline font-mono text-amber-300 font-bold">0327 7741707</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href="mailto:abdullahquranacademy1998@gmail.com" className="hover:text-amber-300 transition-colors">
                    <span className="break-all font-mono text-[11px]">abdullahquranacademy1998@gmail.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>24/7 Flexible Timings Available</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo('contact-us')}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer border border-emerald-600/50"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-300" /> Contact Admissions Desk
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('free-trial')}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Book 3-Day Free Trial (Page 5)
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/70 gap-3">
            <div>
              © 2021–2026 {settings.brandName || "Abdullah Quran Academy"}. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-emerald-200/80">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Safe & Secure Online Learning</span>
              <span>•</span>
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Book Preview Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0b3c2d] via-[#0d4534] to-[#0b3c2d] text-white px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-amber-500/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white font-serif">القول المفيد في قواعد التجويد</h3>
                    <span className="hidden sm:inline-block text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold uppercase">
                      95-Page PDF
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200">
                    A Clear and Beneficial Guide to Tajweed Rules • By Umm Abdullah
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Page Navigation Tabs */}
            <div className="flex border-b border-amber-200 bg-amber-50/80 overflow-x-auto text-xs font-bold text-gray-700 divide-x divide-amber-200/50">
              {[
                { name: '1. Book Cover & Dedication', icon: '📖' },
                { name: '2. Table of Contents (21 Chapters)', icon: '📑' },
                { name: '3. Makharij al-Huroof (17 Points)', icon: '🗣️' },
                { name: '4. Noon Saakinah & Tanween', icon: '✨' },
                { name: '5. Rules of Madd (Lengthening)', icon: '〰️' },
                { name: '6. Waqf & Mushaf Symbols', icon: '🛑' },
              ].map((tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewPage(idx)}
                  className={`px-3.5 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                    previewPage === idx
                      ? 'bg-white text-[#0b3c2d] border-b-2 border-[#0b3c2d] font-extrabold shadow-xs'
                      : 'hover:bg-white/60 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Book Page Viewer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F0]">
              <div className="bg-white border-2 border-amber-300/80 rounded-2xl p-4 sm:p-6 shadow-md min-h-[380px] flex flex-col justify-between">
                
                {/* Page 1: Cover & Dedication */}
                {previewPage === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left: Accurate Replica of the Cover */}
                      <div className="md:col-span-5 flex justify-center">
                        <div className="w-52 h-76 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F1E8D9] rounded-2xl shadow-xl border-4 border-amber-600/60 p-4 flex flex-col justify-between text-center relative overflow-hidden ring-4 ring-amber-400/30">
                          {/* Crescent & Lanterns Header */}
                          <div className="flex justify-between items-center px-1">
                            <span className="text-amber-600 text-xs">🏮</span>
                            <div className="text-center">
                              <div className="text-xs font-serif font-black text-amber-800">☪ Samr Centre</div>
                              <div className="text-[7.5px] text-gray-500 font-semibold tracking-wider uppercase">Serving | Improving | Empowering</div>
                            </div>
                            <span className="text-amber-600 text-xs">🏮</span>
                          </div>

                          {/* Arabic Title */}
                          <div className="my-auto py-2">
                            <div className="font-serif font-black text-2xl text-[#0b3c2d] leading-tight" dir="rtl">
                              القول المفيد
                            </div>
                            <div className="font-serif font-bold text-lg text-amber-800 leading-tight" dir="rtl">
                              في قواعد التجويد
                            </div>
                            <div className="w-12 h-0.5 bg-amber-500 mx-auto my-1.5" />
                            <div className="text-[10px] font-bold text-gray-800 leading-tight">
                              A Clear and Beneficial Guide to Tajweed Rules
                            </div>
                            <div className="text-[9px] font-bold text-emerald-900 mt-2 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block">
                              By Umm Abdullah
                            </div>
                            <div className="text-[7.5px] text-gray-500 mt-0.5 italic">
                              Compiled & edited by Zia Rajput
                            </div>
                          </div>

                          {/* Bottom Quran on Rehal graphic */}
                          <div className="bg-[#0b3c2d] text-amber-300 rounded-lg py-1.5 px-2 text-[9px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-sm">
                            <BookOpen className="w-3.5 h-3.5" /> Full 95-Page Digital E-Book
                          </div>
                        </div>
                      </div>

                      {/* Right: Dedication & Author Info */}
                      <div className="md:col-span-7 space-y-3.5 text-left">
                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase">
                          About the Author & Dedication
                        </div>
                        
                        <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-gray-700 italic space-y-1.5">
                          <p className="font-serif text-[13px] text-[#0b3c2d] font-semibold">
                            "This book is dedicated to my beloved parents, family, teachers, and all those, living and deceased, whose love, sacrifices, guidance, and sincere du'as have helped me reach this stage of my life..."
                          </p>
                          <div className="text-right font-arabic text-amber-900 font-bold" dir="rtl">
                            اللهم اجعل هذا العمل خالصاً لوجهك الكريم • آمين
                          </div>
                        </div>

                        <div className="text-xs text-gray-700 space-y-2">
                          <h4 className="font-bold text-sm text-[#0b3c2d]">About the Author (Umm Abdullah):</h4>
                          <p className="leading-relaxed">
                            Completed the 'Aalimah course at Noor ul Islam and holds certified <strong>Ijazah in the Tajweed of the Qur'an from Egypt</strong> in the Quranic narrations of <strong>Hafs 'an 'Asim</strong> and <strong>Qaloon</strong>.
                          </p>
                          <p className="leading-relaxed">
                            Written in a clear, structured, and easy-to-follow manner suitable for both beginners and advanced students of the Holy Qur'an.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* Page 2: Complete Table of Contents */}
                {previewPage === 1 && (
                  <div className="space-y-4">
                    <div className="text-center pb-2 border-b border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Contents / جدول المحتويات</span>
                      <h4 className="text-lg font-bold text-[#0b3c2d] font-serif">All 21 Chapters in the Guide</h4>
                      <p className="text-xs text-gray-500">Comprehensive syllabus from basic pronunciation to advanced stopping rules.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                      {[
                        { num: '1-3', title: 'Preface, Author & Introduction to Revelation', page: 'p. 6–11' },
                        { num: '4', title: 'What is Tajweed? Definition & Spiritual Importance', page: 'p. 12' },
                        { num: '5', title: 'Manners of Recitation, Isti‘adhah & Basmallah', page: 'p. 13–16' },
                        { num: '6', title: 'Articulation Points (17 Makharij al-Huroof)', page: 'p. 17–20' },
                        { num: '7', title: 'Rules of Noon Saakinah & Tanween (Izhar, Idgham, Qalb, Ikhfa)', page: 'p. 21–27' },
                        { num: '8', title: 'Rules of Meem Saakinah (Ikhfa Shafawi, Idgham, Izhar)', page: 'p. 28–30' },
                        { num: '9', title: 'The Laam Saakinah Rules (Harf, Ism, Fi‘l, Name of Allah)', page: 'p. 31–34' },
                        { num: '10', title: 'Qalqalah (Letters of Qutbu Jad & 3 Levels)', page: 'p. 35–36' },
                        { num: '11', title: 'The Rules of Ra (Cases of Heavy & Light Ra)', page: 'p. 37–40' },
                        { num: '12', title: 'The Rules of Lengthening (Madd Tabi‘i, Wajib, Jaiz, Lazim)', page: 'p. 41–52' },
                        { num: '13', title: 'Aqwa as-Sababayn (Stronger of Two Causes for Madd)', page: 'p. 53–54' },
                        { num: '14', title: 'An-Nabr (Accent & Voice Elevation in Recitation)', page: 'p. 55–56' },
                        { num: '15', title: 'Characteristics of Letters (Sifaat al-Huroof with & without Opposites)', page: 'p. 57–65' },
                        { num: '16', title: 'Rule of Imalah (Majreeha in Surah Hud)', page: 'p. 66' },
                        { num: '17', title: 'Heavy & Light Letters (Tafkhim & Tarqiq Levels)', page: 'p. 67–69' },
                        { num: '18', title: 'Meeting of Two Non-Vowelled Letters (Iltiqa as-Sakinayn)', page: 'p. 70–73' },
                        { num: '19', title: 'Relationship of Meeting Letters (Mutamathilan, Mutajanisan, etc.)', page: 'p. 74–85' },
                        { num: '20', title: 'Rules of Stopping (Waqf Tam, Kafi, Hasan, Qabih, Saktah, Symbols)', page: 'p. 86–91' },
                        { num: '21', title: 'Conclusion, Notes & Scholarly References', page: 'p. 92–95' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-200/70 hover:bg-emerald-50 transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#0b3c2d] text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {item.num}
                            </span>
                            <span className="font-semibold text-gray-800 text-[11.5px]">{item.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-800 font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
                            {item.page}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Page 3: Articulation Points / Makharij al-Huroof */}
                {previewPage === 2 && (
                  <div className="space-y-4">
                    <div className="text-center pb-2 border-b border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Chapter 6 / مَخَارِجُ الْحُرُوف</span>
                      <h4 className="text-lg font-bold text-[#0b3c2d] font-arabic">17 Articulation Points for the 29 Arabic Letters</h4>
                      <p className="text-xs text-gray-500">Categorized across the 5 primary vocal areas (Chapter 6, p. 17–20).</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
                      
                      {/* Area 1 */}
                      <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200">
                        <div className="flex items-center justify-between font-bold text-xs text-[#0b3c2d] mb-1">
                          <span>1. Al-Jawf (الجَوْف)</span>
                          <span className="text-[10px] bg-amber-200 px-1.5 py-0.2 rounded text-amber-900">1 Point</span>
                        </div>
                        <p className="text-[11px] text-gray-700 leading-tight">
                          The empty space in mouth and throat. Produces the 3 Madd letters: (ا ، و ، ي).
                        </p>
                      </div>

                      {/* Area 2 */}
                      <div className="p-3 bg-emerald-50/90 rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between font-bold text-xs text-emerald-900 mb-1">
                          <span>2. Al-Halq (الحَلْق)</span>
                          <span className="text-[10px] bg-emerald-200 px-1.5 py-0.2 rounded text-emerald-900">3 Points</span>
                        </div>
                        <ul className="text-[10.5px] text-gray-700 space-y-0.5">
                          <li>• <strong>Bottom (أقصى):</strong> (ء ، هـ)</li>
                          <li>• <strong>Middle (وسط):</strong> (ع ، ح)</li>
                          <li>• <strong>Top (أدنى):</strong> (غ ، خ)</li>
                        </ul>
                      </div>

                      {/* Area 3 */}
                      <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200">
                        <div className="flex items-center justify-between font-bold text-xs text-[#0b3c2d] mb-1">
                          <span>3. Al-Lisan (اللِّسَان)</span>
                          <span className="text-[10px] bg-amber-200 px-1.5 py-0.2 rounded text-amber-900">10 Points</span>
                        </div>
                        <p className="text-[10.5px] text-gray-700 leading-tight">
                          18 letters: Deepest (ق، ك), Middle (ج، ش، ي), Edge (ض، ل), and Tip (ن، ر، ت، د، ط، ز، س، ص، ث، ذ، ظ).
                        </p>
                      </div>

                      {/* Area 4 */}
                      <div className="p-3 bg-emerald-50/90 rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between font-bold text-xs text-emerald-900 mb-1">
                          <span>4. Ash-Shafatan (الشَّفَتَان)</span>
                          <span className="text-[10px] bg-emerald-200 px-1.5 py-0.2 rounded text-emerald-900">2 Points</span>
                        </div>
                        <ul className="text-[10.5px] text-gray-700 space-y-0.5">
                          <li>• <strong>Bottom lip + upper incisors:</strong> (ف)</li>
                          <li>• <strong>Both lips:</strong> (ب ، م ، و غیر مدیة)</li>
                        </ul>
                      </div>

                      {/* Area 5 */}
                      <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 sm:col-span-2 md:col-span-2">
                        <div className="flex items-center justify-between font-bold text-xs text-[#0b3c2d] mb-1">
                          <span>5. Al-Khayshoom (الخَيْشُوم)</span>
                          <span className="text-[10px] bg-amber-200 px-1.5 py-0.2 rounded text-amber-900">1 Point</span>
                        </div>
                        <p className="text-[11px] text-gray-700 leading-tight">
                          The nasal passage. Point of emission for <strong>Ghunnah (الغنة)</strong> associated with Noon (ن) and Meem (م).
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* Page 4: Noon Saakinah & Tanween */}
                {previewPage === 3 && (
                  <div className="space-y-4">
                    <div className="text-center pb-2 border-b border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Chapter 7 / أحكام النون الساكنة والتنوين</span>
                      <h4 className="text-lg font-bold text-[#0b3c2d] font-serif">The 4 Rules of Noon Saakinah & Tanween</h4>
                      <p className="text-xs text-gray-500">Essential rules for pristine recitation clarity (Chapter 7, p. 21–27).</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                        <div className="flex items-center justify-between font-bold text-xs text-[#0b3c2d]">
                          <span>1. Al-Izhar (الإظهار)</span>
                          <span className="text-[10px] text-amber-800 font-arabic">حروف الحلق (ء هـ ع ح غ خ)</span>
                        </div>
                        <p className="text-[11px] text-gray-600">Pronounce Noon clearly without extra nasalization.</p>
                        <div className="text-xs font-arabic text-right text-emerald-900 font-bold bg-white p-1 rounded" dir="rtl">
                          مِنْ هَادٍ • أَنْعَمْتَ
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                        <div className="flex items-center justify-between font-bold text-xs text-emerald-900">
                          <span>2. Al-Idgham (الإدغام)</span>
                          <span className="text-[10px] text-emerald-800 font-arabic">يَرْمَلُون (ي ر م ل و ن)</span>
                        </div>
                        <p className="text-[11px] text-gray-600">Merging Noon into next letter with/without Ghunnah.</p>
                        <div className="text-xs font-arabic text-right text-emerald-900 font-bold bg-white p-1 rounded" dir="rtl">
                          مَن يَقُولُ • مِن رَّبِّهِمْ
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                        <div className="flex items-center justify-between font-bold text-xs text-[#0b3c2d]">
                          <span>3. Al-Qalb / Iqlab (القلب)</span>
                          <span className="text-[10px] text-amber-800 font-arabic">حرف الباء (ب)</span>
                        </div>
                        <p className="text-[11px] text-gray-600">Convert Noon sound into Meem (م) with Ghunnah.</p>
                        <div className="text-xs font-arabic text-right text-emerald-900 font-bold bg-white p-1 rounded" dir="rtl">
                          مِنۢ بَعْدِ • سَمِيعٌۢ بَصِيرٌ
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                        <div className="flex items-center justify-between font-bold text-xs text-emerald-900">
                          <span>4. Al-Ikhfa (الإخفاء)</span>
                          <span className="text-[10px] text-emerald-800 font-arabic">15 Letters (ت ث ج د ذ ز س...)</span>
                        </div>
                        <p className="text-[11px] text-gray-600">Conceal Noon sound with nasalization between Izhar & Idgham.</p>
                        <div className="text-xs font-arabic text-right text-emerald-900 font-bold bg-white p-1 rounded" dir="rtl">
                          مِن تَحْتِهَا • كُنتُمْ
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 5: Rules of Madd (Lengthening) */}
                {previewPage === 4 && (
                  <div className="space-y-4">
                    <div className="text-center pb-2 border-b border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Chapter 12 & 13 / أَحْكَامُ الْمُدُود</span>
                      <h4 className="text-lg font-bold text-[#0b3c2d] font-serif">Rules of Lengthening & Count Durations</h4>
                      <p className="text-xs text-gray-500">Madd Tabi‘i, Secondary Madd, and Strength of Causes (Chapter 12, p. 41–54).</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                      <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
                        <div className="text-[11px] font-bold text-emerald-800 uppercase">2 Counts (حركتان)</div>
                        <h5 className="font-bold text-xs text-[#0b3c2d] mt-0.5">Madd Tabi‘i (الأصلي)</h5>
                        <p className="text-[10.5px] text-gray-600 mt-1">
                          Natural lengthening on (قَالَ ، يَقُولُ ، قِيلَ), Madd Silah Sughra, Madd al-‘Iwad.
                        </p>
                      </div>

                      <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
                        <div className="text-[11px] font-bold text-amber-800 uppercase">4 to 5 Counts (حركات)</div>
                        <h5 className="font-bold text-xs text-[#0b3c2d] mt-0.5">Madd Muttasil & Munfasil</h5>
                        <p className="text-[10.5px] text-gray-600 mt-1">
                          Hamzah in same word (جَآءَ) or next word (بِمَآ أُنزِلَ), and Madd Silah Kubra.
                        </p>
                      </div>

                      <div className="p-3 bg-white border border-amber-300 bg-amber-50/50 rounded-xl shadow-xs">
                        <div className="text-[11px] font-bold text-red-700 uppercase">6 Counts (Compulsory)</div>
                        <h5 className="font-bold text-xs text-[#0b3c2d] mt-0.5">Madd Lazim (اللَّازِم)</h5>
                        <p className="text-[10.5px] text-gray-600 mt-1">
                          Followed by original sukoon/shaddah (الضَّآلِّينَ ، طسم ، ءآلآن). Strongest madd.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-900 text-emerald-100 rounded-xl text-xs space-y-1">
                      <div className="font-bold text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Order of Strength (أَقْوَى السَّبَبَيْن):
                      </div>
                      <div className="text-[11px] font-medium text-emerald-200">
                        1. Madd Lazim (Strongest) &rarr; 2. Madd Wajib Muttasil &rarr; 3. Madd ‘Arid Lis-Sukun &rarr; 4. Madd Ja’iz Munfasil &rarr; 5. Madd Badal (Weakest).
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 6: Waqf & Stopping Symbols */}
                {previewPage === 5 && (
                  <div className="space-y-4">
                    <div className="text-center pb-2 border-b border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Chapter 20 / عَلَامَاتُ الْوَقْف فِي الْمُصْحَف</span>
                      <h4 className="text-lg font-bold text-[#0b3c2d] font-serif">Symbols of Stopping in the Mushaf</h4>
                      <p className="text-xs text-gray-500">Standard stop markers and guidelines for proper Quran flow (Chapter 20, p. 86–91).</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                      {[
                        { sym: 'مـ', name: 'الوقف اللازم', rule: 'Necessary stop', desc: 'Must stop to avoid changing meaning.' },
                        { sym: 'ط', name: 'الوقف المطلق', rule: 'Complete stop', desc: 'Better to stop here.' },
                        { sym: 'ج', name: 'الوقف الجائز', rule: 'Permissible stop', desc: 'Stopping & continuing are both allowed.' },
                        { sym: 'صلے', name: 'الوصل أولى', rule: 'Continue preferred', desc: 'Continuing is better than stopping.' },
                        { sym: 'قلے', name: 'الوقف أولى', rule: 'Stop preferred', desc: 'Stopping is better than continuing.' },
                        { sym: 'لا', name: 'لا تقف', rule: 'Do not stop', desc: 'Stopping may alter the verse meaning.' },
                        { sym: 'سكتة (س)', name: 'السكت', rule: 'Brief pause', desc: 'Short 2-count pause without taking breath.' },
                        { sym: '∴ ∴', name: 'معانقة الوقف', rule: 'Paired stop', desc: 'Stop at either one, not at both.' },
                      ].map((item, i) => (
                        <div key={i} className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 flex flex-col justify-between">
                          <div>
                            <div className="text-lg font-serif font-black text-emerald-800">{item.sym}</div>
                            <div className="text-[10px] font-bold text-gray-700 font-arabic">{item.name}</div>
                          </div>
                          <div className="mt-1 pt-1 border-t border-amber-200">
                            <div className="text-[10px] font-bold text-[#0b3c2d]">{item.rule}</div>
                            <div className="text-[9px] text-gray-500 leading-tight mt-0.5">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flip Navigation */}
                <div className="pt-4 border-t border-amber-200 flex items-center justify-between text-xs font-semibold text-gray-600">
                  <button
                    type="button"
                    disabled={previewPage === 0}
                    onClick={() => setPreviewPage((prev) => Math.max(0, prev - 1))}
                    className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
                  >
                    &larr; <span>Previous</span>
                  </button>
                  <span className="text-gray-500 font-mono text-[11px]">
                    Preview Section {previewPage + 1} of 6
                  </span>
                  <button
                    type="button"
                    disabled={previewPage === 5}
                    onClick={() => setPreviewPage((prev) => Math.min(5, prev + 1))}
                    className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Next</span> &rarr;
                  </button>
                </div>

              </div>
            </div>

            {/* Modal Bottom CTA Bar */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-600 text-center sm:text-left">
                <span className="font-bold text-gray-800">Want the complete 95-page Tajweed Guide PDF?</span>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  Delivered instantly via WhatsApp: <span className="font-mono font-bold">03277741707</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href="https://wa.me/923277741707?text=Assalam%20o%20Alaikum!%20I%20want%20to%20download%20the%20Complete%20Tajweed%20Book%20(A%20Clear%20and%20Beneficial%20Guide%20to%20Tajweed%20Rules)%2095-page%20PDF."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download on WhatsApp (03277741707)</span>
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
      {/* Persistent Floating WhatsApp Contact Support Button */}
      <aside
        id="floating-whatsapp-widget"
        aria-label="WhatsApp Contact Support"
        className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 flex items-center gap-3"
      >
        {showWhatsAppTooltip && (
          <div className="hidden sm:flex items-center gap-2.5 bg-white text-gray-900 pl-3.5 pr-2 py-2 rounded-2xl shadow-xl border border-emerald-100 text-xs font-semibold animate-fade-in ring-1 ring-black/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <a
              href="https://wa.me/447446361983?text=Assalamu%20Alaikum!%20I%20would%20like%20to%20inquire%20about%201-on-1%20online%20Quran%20classes."
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 hover:text-emerald-800 transition-colors"
            >
              Need Help? Chat on WhatsApp (+44 7446 361983)
            </a>
            <button
              type="button"
              onClick={() => setShowWhatsAppTooltip(false)}
              className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer ml-0.5"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href="https://wa.me/447446361983?text=Assalamu%20Alaikum!%20I%20would%20like%20to%20inquire%20about%201-on-1%20online%20Quran%20classes."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Abdullah Quran Academy on WhatsApp (+44 7446 361983)"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-hidden focus:ring-4 focus:ring-emerald-400/50 group cursor-pointer"
        >
          {/* Subtle pulse animation effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>

          {/* WhatsApp icon */}
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366] group-hover:rotate-6 transition-transform relative z-10" />

          {/* Screen reader text */}
          <span className="sr-only">Need Help? Chat with us on WhatsApp (+44 7446 361983)</span>
        </a>
      </aside>
    </div>
  );
};
