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
} from 'lucide-react';

interface CoursesHubViewProps {
  onSelectCourse: (courseId: string) => void;
  onGoToFreeTrial: (preselectedCourse?: string) => void;
  onGoToHome: () => void;
}

export const CoursesHubView: React.FC<CoursesHubViewProps> = ({
  onSelectCourse,
  onGoToFreeTrial,
  onGoToHome,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCourses =
    activeCategory === 'all'
      ? coursesData
      : coursesData.filter(
          (c) => c.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="bg-[#FAF8F5] text-gray-800 font-sans min-h-screen">
      <CanonicalHead
        path="/online-quran-courses"
        title="Online Quran Courses Hub UK | Structured Syllabi for Kids & Sisters"
        description="Explore 5 accredited online Quran courses for kids and sisters in the UK. Noorani Qaida, Tajweed, Hifz, and Tafseer with certified female teachers."
      />
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-gray-500 gap-2">
          <button
            onClick={onGoToHome}
            className="hover:text-[#0b3c2d] font-medium transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#0b3c2d] font-bold">Online Quran Courses (Course Hub)</span>
        </div>
      </div>

      {/* Hub Hero Header */}
      <section className="relative bg-linear-to-b from-[#0b3c2d] to-[#07251c] text-white py-14 lg:py-20 overflow-hidden border-b-4 border-amber-400">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            Tier 2 • Central Course Hub
          </div>

          <h1 className="animate-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-tight max-w-4xl mx-auto text-white">
            Online Quran Courses in the UK — <span className="text-amber-400">Complete Learning Hub</span>
          </h1>

          <p className="animate-subheading mt-4 text-sm sm:text-base text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
            Explore our structured, accredited curriculum for kids, female students, and adult sisters across the UK. Live one-to-one classes with certified female tutors with flexible UK timings.
          </p>

          {/* Quick Hub Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-emerald-200">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10 box-hover-lift">
              <Check className="w-4 h-4 text-amber-400" /> 5 Accredited Specializations
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10 box-hover-lift">
              <Check className="w-4 h-4 text-amber-400" /> Certified Female Tutors for Sisters & Kids
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10 box-hover-lift">
              <Check className="w-4 h-4 text-amber-400" /> 3-Day Free Trial (No Card)
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Pathway Roadmap */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              From Beginner to Scholar
            </span>
            <h2 className="animate-heading text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif mt-1">
              The 5-Stage Quranic Learning Pathway
            </h2>
            <p className="animate-subheading text-xs text-gray-500 mt-1">
              Every student progresses through a clearly defined pedagogical roadmap tailored to their level.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                step: '01',
                title: 'Noorani Qaida',
                desc: 'Arabic alphabet, phonetics, and basic Makharij.',
                tag: 'Foundation',
                id: 'noorani-qaida',
              },
              {
                step: '02',
                title: 'Quran Reading',
                desc: 'Fluent Nazra directly from the Holy Mushaf.',
                tag: 'Fluency',
                id: 'quran-reading',
              },
              {
                step: '03',
                title: 'Tajweed Rules',
                desc: '17 Makharij, Sifaat, Madd, and Waqf symbols.',
                tag: 'Mastery',
                id: 'tajweed-rules',
              },
              {
                step: '04',
                title: 'Hifdh Program',
                desc: 'Systematic memorization with Sabaq & Manzil.',
                tag: 'Retention',
                id: 'quran-hifz',
              },
              {
                step: '05',
                title: 'Tafseer & Meaning',
                desc: 'Word-by-word meaning and revelation context.',
                tag: 'Understanding',
                id: 'translation-tafseer',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCourse(p.id)}
                className="group p-4 rounded-2xl bg-[#FAF8F5] hover:bg-emerald-50/70 border border-gray-200 hover:border-emerald-500/50 transition-all cursor-pointer relative flex flex-col justify-between shadow-2xs box-hover-lift animate-box"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-600 font-mono">Stage {p.step}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0b3c2d] mt-2 group-hover:text-emerald-800">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] font-bold text-[#0b3c2d]">
                  <span>Explore &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Courses Grid with Category Filter */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="animate-heading text-2xl sm:text-3xl font-bold text-[#0b3c2d] font-serif">
              Explore Our Accredited Courses
            </h2>
            <p className="animate-subheading text-xs text-gray-500 mt-1">
              Select a course to view detailed syllabus, learning outcomes, and module breakdowns.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'foundation', label: 'Foundation' },
              { id: 'fluency', label: 'Fluency' },
              { id: 'mastery', label: 'Tajweed' },
              { id: 'memorization', label: 'Hifdh' },
              { id: 'understanding', label: 'Tafseer' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#0b3c2d] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-200 hover:border-amber-400 overflow-hidden shadow-xs box-hover-lift animate-box flex flex-col justify-between group"
            >
              {/* Card Header Banner */}
              <div className="p-6 pb-4 bg-linear-to-b from-emerald-50/50 to-transparent">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-2xl shadow-inner">
                    {course.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {course.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0b3c2d] font-serif leading-snug group-hover:text-amber-700 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {course.tagline}
                </p>
              </div>

              {/* Card Meta Specs */}
              <div className="px-6 py-3 border-y border-gray-100 bg-[#FAF8F5]/80 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{course.ageRange}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{course.tutors}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>1-on-1 Online Live</span>
                </div>
              </div>

              {/* Key Learning Highlights */}
              <div className="p-6 pt-4 space-y-2.5 flex-1">
                <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  What You Will Learn:
                </div>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {course.learningOutcomes.slice(0, 3).map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectCourse(course.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0b3c2d] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  View Full Syllabus
                </button>
                <a
                  href={getWhatsAppUrl(`Assalam o Alaikum! I want to join the ${course.title} with a Female Teacher.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center gap-1 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Join on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Why Learn With Abdullah Quran Academy Hub Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0b3c2d] via-[#114b39] to-[#0b3c2d] text-white rounded-3xl p-8 sm:p-12 border-2 border-amber-400 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Trusted British Quran Education
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Need Help Choosing the Right Course for Your Child or Yourself?
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
                Our academic advisor is available on WhatsApp to evaluate your current reading level and recommend the ideal course, certified female teacher, and schedule.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onGoToFreeTrial()}
                  className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  Book 3-Day Free Trial Evaluation
                </button>
                <button
                  type="button"
                  onClick={onGoToHome}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                >
                  &larr; Return to Homepage
                </button>
                <a
                  href={getWhatsAppUrl('Assalam o Alaikum! I need advice on which Quran course to choose.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider border border-emerald-500/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  Chat on WhatsApp ({ACADEMY_WHATSAPP_DISPLAY})
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-amber-400/30 text-xs space-y-3">
              <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                Parent Guarantees:
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Free 3-Day Trial (Zero deposit)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Strictly private 1-on-1 Zoom classrooms</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dedicated Female Tutors for Sisters</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>UK school-friendly evening & weekend hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
