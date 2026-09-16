import React, { useState } from 'react';
import { coursesData, CourseDetail } from '../data/coursesData';
import { CanonicalHead } from './CanonicalHead';
import { getWhatsAppUrl, ACADEMY_WHATSAPP_DISPLAY } from '../utils/contactConfig';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Users,
  Clock,
  ShieldCheck,
  ChevronRight,
  Filter,
  GraduationCap,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  HelpCircle,
  Layers,
  HeartHandshake,
} from 'lucide-react';

interface CoreCoursesViewProps {
  onSelectCourse: (courseId: string) => void;
  onGoToFreeTrial: (preselectedCourse?: string) => void;
  onGoToHome: () => void;
  onGoToContact: () => void;
}

export const CoreCoursesView: React.FC<CoreCoursesViewProps> = ({
  onSelectCourse,
  onGoToFreeTrial,
  onGoToHome,
  onGoToContact,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const filters = [
    { id: 'all', label: 'All 5 Core Courses' },
    { id: 'Foundation', label: 'Beginner / Qaida' },
    { id: 'Recitation', label: 'Tajweed & Reading' },
    { id: 'Memorisation', label: 'Hifdh Program' },
    { id: 'Islamic Studies', label: 'Tafseer & Duas' },
    { id: 'Advanced Tajweed', label: 'Ijazah Level 16+' },
  ];

  const filteredCourses =
    selectedFilter === 'all'
      ? coursesData
      : coursesData.filter(
          (c) =>
            c.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            c.badge.toLowerCase().includes(selectedFilter.toLowerCase())
        );

  const learningStages = [
    {
      step: '01',
      title: 'Noorani Qaida',
      subtitle: 'Ground Zero Alphabet & Makharij',
      desc: 'Master Arabic letters, vowels (Harakat), Tanween, Sukoon, and Tashdeed for fluent character joining.',
      badge: 'Ages 4+ & Beginners',
      icon: '📖',
      courseId: 'noorani-qaida',
    },
    {
      step: '02',
      title: 'Quran Reading & Tajweed',
      subtitle: 'Nazra Recitation with Rules',
      desc: 'Read direct from the Mushaf with Noon Sakin, Meem Sakin, Madd elongation, and Waqf stop rules.',
      badge: 'Fluent Recitation',
      icon: '🌿',
      courseId: 'quran-reading',
    },
    {
      step: '03',
      title: 'Tahfeez / Hifdh',
      subtitle: 'Systematic Memorization',
      desc: 'Structured Sabaq, Sabqi, and Manzil revisions for Juz Amma, selected Surahs, or complete Quran.',
      badge: 'Memory Track',
      icon: '🌟',
      courseId: 'hifdh-memorization',
    },
    {
      step: '04',
      title: 'Tafseer & Islamic Studies',
      subtitle: 'Comprehension & Daily Fiqh',
      desc: 'Understand Quranic meaning, Shan-e-Nuzool, Seerah, daily Masnoon Duas, and Salah etiquette.',
      badge: 'Youth & Sisters',
      icon: '🕌',
      courseId: 'tafseer-islamic-studies',
    },
    {
      step: '05',
      title: 'Advanced Tajweed & Ijazah',
      subtitle: 'Certification & Sanad',
      desc: 'Master Al-Jazariyyah, deep phonetics, and recite full Mushaf to obtain verified Sanad certificate.',
      badge: 'Certified Scholars',
      icon: '📜',
      courseId: 'tajweed-rules',
    },
  ];

  const coreFaqs = [
    {
      q: 'Which core course should my child start with?',
      a: 'If your child is learning Arabic letters for the first time or cannot read joined Arabic words, they should start with the Noorani Qaida Course. During the 3-day free trial, our female teacher evaluates their exact current level and recommends whether to start from lesson 1 or an intermediate stage.',
    },
    {
      q: 'Are all core courses taught by female teachers?',
      a: 'Yes, 100% of our classes for sisters, young girls, and children are taught by certified, DBS-checked female tutors in a secure one-to-one Zoom environment with cameras off or strictly sister-to-sister.',
    },
    {
      q: 'How flexible are the UK class timings?',
      a: 'We operate 7 days a week from 8:00 AM to 10:00 PM UK time. We have dedicated slots after UK school hours (4:00 PM - 8:00 PM) as well as weekend morning and afternoon batches to accommodate UK family routines.',
    },
    {
      q: 'Do you provide course books and learning materials?',
      a: 'Yes. Students receive free digital PDF copies of our structured Noorani Qaida and our complete Tajweed Guidebook with English explanations and Arabic color-coded examples.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-gray-800 font-sans min-h-screen">
      <CanonicalHead
        path="/courses"
        title="Core Online Quran Courses UK | Certified Female Quran Tutors"
        description="Explore accredited core online Quran courses for kids and sisters across the UK. Noorani Qaida, Tajweed, Nazra, Hifdh, and Tafseer with certified female teachers."
      />
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onGoToHome}
              className="hover:text-[#0b3c2d] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#0b3c2d] font-bold">Core Courses</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> 1-on-1 Certified Female Tutors
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={onGoToContact}
              className="text-[#0b3c2d] hover:underline font-bold"
            >
              Need Guidance? Contact Us &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Core Courses Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#07251c] via-[#0b3c2d] to-[#0d4635] text-white py-14 sm:py-20 border-b-4 border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> UK's Premier 1-on-1 Online Quran Curriculum
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Core Quran Courses for <span className="text-amber-400">Kids & Sisters</span> in the UK
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 mt-4 max-w-3xl mx-auto leading-relaxed">
            From learning the very first Arabic letter in Noorani Qaida to achieving certified Ijazah in Tajweed.
            Structured, step-by-step academic modules taught live on Zoom by experienced female scholars.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={() => onGoToFreeTrial()}
              className="px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-gray-950" />
              <span>Book 3-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onGoToContact}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>Contact Admissions</span>
            </button>

            <a
              href={getWhatsAppUrl('Assalamu Alaikum! I would like to inquire about your Core Quran Courses.')}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp {ACADEMY_WHATSAPP_DISPLAY}</span>
            </a>
          </div>

          {/* Trust Value Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-8 border-t border-emerald-800/60 text-left">
            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">100% Female Staff</div>
                <div className="text-[10px] text-emerald-200">DBS checked & verified</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">UK Timings</div>
                <div className="text-[10px] text-emerald-200">After-school & weekends</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <Users className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">1-on-1 Attention</div>
                <div className="text-[10px] text-emerald-200">Private customized pace</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">No Obligation</div>
                <div className="text-[10px] text-emerald-200">3-Day Free Trial class</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Curriculum Pathway / Roadmap */}
      <section className="py-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              5-Stage Academic Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif mt-2">
              The Step-by-Step Learning Journey
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Every student progresses systematically from alphabet fundamentals to fluent recitation and memorization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {learningStages.map((stage, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#FAF8F5] to-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer hover:border-emerald-300"
                onClick={() => onSelectCourse(stage.courseId)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">{stage.icon}</span>
                    <span className="text-xs font-black font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      STAGE {stage.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                    {stage.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                    {stage.subtitle}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {stage.badge}
                  </span>
                  <span className="text-xs font-bold text-[#0b3c2d] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Details &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs & Courses Showcase Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Curriculum Syllabi
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif mt-2">
                Detailed Core Courses Catalog
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Select any course to view full learning outcomes, modules breakdown, and schedule options.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-gray-200/70 rounded-2xl">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedFilter === f.id
                      ? 'bg-[#0b3c2d] text-amber-300 shadow-xs'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course: CourseDetail) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:border-emerald-300"
              >
                {/* Course Header Banner */}
                <div className="p-6 sm:p-7 border-b border-gray-100 bg-gradient-to-r from-emerald-900 via-[#0b3c2d] to-[#0f4d3a] text-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-white/20">
                        {course.icon}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                          {course.badge}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold font-serif text-white mt-1 leading-snug">
                          {course.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-3 leading-relaxed">
                    {course.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-emerald-800/60 flex flex-wrap gap-4 text-xs text-emerald-200">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <strong>Audience:</strong> {course.ageRange}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <strong>Duration:</strong> {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Body Content */}
                <div className="p-6 sm:p-7 space-y-5 flex-1">
                  {/* What You Will Master */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Key Learning Outcomes:
                    </h4>
                    <ul className="space-y-2">
                      {course.learningOutcomes.slice(0, 4).map((outcome, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modules Preview Pills */}
                  {course.modules && course.modules.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-amber-600" /> Curriculum Highlights ({course.modules.length} Modules):
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.modules.slice(0, 3).map((mod, mIdx) => (
                          <div
                            key={mIdx}
                            className="bg-[#FAF8F5] p-2.5 rounded-xl border border-gray-200 text-xs"
                          >
                            <span className="font-bold text-[#0b3c2d] block truncate">{mod.title}</span>
                            <span className="text-[11px] text-gray-500 block truncate">{mod.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tutor Qualification Note */}
                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/70 flex items-center justify-between text-xs text-emerald-900">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span><strong>Teacher:</strong> {course.tutors}</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      1-on-1 Class
                    </span>
                  </div>
                </div>

                {/* Course Card Action Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectCourse(course.id)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-[#0b3c2d] hover:bg-white text-gray-800 hover:text-[#0b3c2d] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Full Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onGoToFreeTrial(course.title)}
                      className="px-5 py-2.5 rounded-xl bg-[#0b3c2d] hover:bg-[#135741] text-amber-300 font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Book Free Trial</span>
                    </button>
                    <a
                      href={getWhatsAppUrl(`Assalamu Alaikum! I am interested in enrolling in ${course.title}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                      title="Quick Inquiry on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Core Program Section */}
      <section className="py-14 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif">
              Why British Families Trust Our Core Program
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Designed to fit the demands of UK schooling, after-school routines, and modern family life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Patient Female Educators</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Specialists in child psychology and gentle Quranic pedagogy. Kids who are initially shy or hesitant quickly feel safe, encouraged, and excited for their next lesson.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">UK School Routine Friendly</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Class schedules are organized around UK term times. Easily reschedule classes when school exams, illness, or family commitments arise with convenient notice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Parent WhatsApp Updates</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Stay updated on your child’s weekly progress, new Surahs memorized, and teacher remarks directly via our WhatsApp parent communication channel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Courses FAQ Accordion */}
      <section className="py-14 bg-[#FAF8F5] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif mt-2">
              Frequently Asked Questions on Core Courses
            </h2>
          </div>

          <div className="space-y-3">
            {coreFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:text-[#0b3c2d] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      activeFaq === idx ? 'rotate-90 text-emerald-800' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-[#07251c] to-[#0b3c2d] text-white border-t border-emerald-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Start Your 3-Day Free Online Quran Trial Today
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-2xl mx-auto">
            Experience our 1-on-1 female teaching methodology live on Zoom before deciding.
            Zero commitment, no credit card required.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onGoToFreeTrial()}
              className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-gray-950" />
              <span>Book Your Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onGoToContact}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>Contact Admissions Form</span>
            </button>

            <button
              type="button"
              onClick={onGoToHome}
              className="px-6 py-3.5 rounded-full text-emerald-200 hover:text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              &larr; Back to Homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
