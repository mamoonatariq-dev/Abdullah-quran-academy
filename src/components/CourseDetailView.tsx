import React, { useState } from 'react';
import { coursesData, CourseDetail } from '../data/coursesData';
import { CanonicalHead } from './CanonicalHead';
import { getWhatsAppUrl, getBookDownloadWhatsAppUrl, BOOK_DOWNLOAD_PHONE_RAW } from '../utils/contactConfig';
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Calendar,
  MessageCircle,
  HelpCircle,
  Phone,
  FileText,
  Download,
} from 'lucide-react';

interface CourseDetailViewProps {
  courseId: string;
  onBackToHub: () => void;
  onGoToHome: () => void;
  onGoToFreeTrial: (courseTitle?: string) => void;
  onSelectOtherCourse: (id: string) => void;
  onOpenTajweedBook?: () => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  courseId,
  onBackToHub,
  onGoToHome,
  onGoToFreeTrial,
  onSelectOtherCourse,
  onOpenTajweedBook,
}) => {
  const course =
    coursesData.find((c) => c.id === courseId) || coursesData[0];

  const [activeModule, setActiveModule] = useState<number>(0);

  const relatedCourses = coursesData.filter((c) => c.id !== course.id);

  return (
    <div className="bg-[#FAF8F5] text-gray-800 font-sans min-h-screen">
      <CanonicalHead
        path={`/courses/${course.id}`}
        title={`${course.title} Course UK | Certified Female Tutors`}
        description={course.description}
      />
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-gray-500 gap-2 flex-wrap">
          <button
            onClick={onGoToHome}
            className="hover:text-[#0b3c2d] font-medium transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={onBackToHub}
            className="hover:text-[#0b3c2d] font-medium transition-colors cursor-pointer"
          >
            Online Quran Courses
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#0b3c2d] font-bold">{course.title}</span>
        </div>
      </div>

      {/* Course Detail Hero Header */}
      <section className="relative bg-linear-to-b from-[#0b3c2d] to-[#07251c] text-white py-14 lg:py-16 overflow-hidden border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-gray-950 font-black text-[11px] uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-200 font-medium text-[11px] border border-white/20">
                  {course.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-tight text-white">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
                {course.description}
              </p>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-emerald-300">Target Students</div>
                  <div className="text-xs font-bold text-white mt-0.5">{course.ageRange}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-emerald-300">Typical Duration</div>
                  <div className="text-xs font-bold text-white mt-0.5">{course.duration}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-emerald-300">Qualified Tutors</div>
                  <div className="text-xs font-bold text-white mt-0.5">{course.tutors}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-emerald-300">Enrollment</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">Join via WhatsApp</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={getWhatsAppUrl(`Assalam o Alaikum! I want to join the ${course.title} with a Female Teacher.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-gray-950" />
                  <span>Join this Course on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onGoToFreeTrial(course.title)}
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>3-Day Free Trial</span>
                </button>
              </div>
            </div>

            {/* Right Quick Booking Card */}
            <div className="lg:col-span-4">
              <div className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl border-2 border-amber-400">
                <div className="text-center pb-4 border-b border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
                    100% Risk Free
                  </span>
                  <h3 className="font-bold text-lg text-[#0b3c2d] mt-2">Start with 3 Free Lessons</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Safe 1-on-1 classes with certified female teachers.</p>
                </div>

                <div className="space-y-3 py-4 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated 1-on-1 certified female tutor</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Flexible UK morning & evening slots</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zoom interactive screen-sharing</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete learning material & PDF notes</span>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl(`Assalam o Alaikum! I want to join the ${course.title} with a Female Teacher.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all text-center shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  <span>Join via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content: Learning Outcomes & Modules */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Main Column: Syllabus Breakdown */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Learning Outcomes */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0b3c2d] font-serif mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Key Learning Outcomes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-gray-100"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700 leading-snug font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Modules Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0b3c2d] font-serif">
                    Course Curriculum & Modules
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Step-by-step syllabus taught across 1-on-1 private lessons.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {course.modules.length} Detailed Modules
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-[#FAF8F5]"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveModule(activeModule === idx ? -1 : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-amber-50/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#0b3c2d] text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm text-gray-900">{mod.title}</h3>
                          <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{mod.description}</p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          activeModule === idx ? 'rotate-90 text-amber-600' : ''
                        }`}
                      />
                    </button>

                    {activeModule === idx && (
                      <div className="p-5 pt-0 border-t border-gray-200 bg-white space-y-3">
                        <p className="text-xs text-gray-600 pt-3 leading-relaxed">
                          {mod.description}
                        </p>
                        <div className="pt-2">
                          <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                            Topics Covered in this Module:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mod.topics.map((t, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-gray-700 p-2 rounded-lg bg-emerald-50/40 border border-emerald-100"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Special Tajweed Book Callout if on Tajweed Course */}
            {course.id === 'tajweed-rules' && onOpenTajweedBook && (
              <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-emerald-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-2.5 py-1 rounded bg-amber-200 text-amber-900 font-bold text-[10px] uppercase">
                    Official Reference Book
                  </span>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0b3c2d] font-serif">
                    القول المفيد في قواعد التجويد (Umm Abdullah)
                  </h3>
                  <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
                    This course follows the complete 95-page curriculum covering all 21 chapters of classical Tajweed rules with diagrams.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={onOpenTajweedBook}
                    className="px-5 py-2.5 rounded-xl bg-[#0b3c2d] text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-900 transition-all cursor-pointer shadow-md"
                  >
                    Preview Tajweed Book (PDF)
                  </button>
                  <a
                    href={getBookDownloadWhatsAppUrl('Tajweed Book - Al-Qawl Al-Mufeed')}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-gray-950" />
                    <span>Download Book ({BOOK_DOWNLOAD_PHONE_RAW})</span>
                  </a>
                </div>
              </div>
            )}

            {/* Who Is This Course For */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0b3c2d] font-serif mb-4">
                Who Is This Course For?
              </h2>
              <div className="space-y-3">
                {course.whoIsThisFor.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <strong>Prerequisites:</strong> {course.prerequisites}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Booking Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#0b3c2d] font-serif">
                Schedule Options
              </h3>
              <p className="text-xs text-gray-500">
                Pick your preferred weekly class frequency:
              </p>
              <div className="space-y-2">
                {course.scheduleOptions.map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 text-xs font-semibold text-gray-800"
                  >
                    <span>{opt}</span>
                    <span className="text-emerald-700 font-bold">1-on-1 Live</span>
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppUrl(`Assalam o Alaikum! I want to enroll in the ${course.title} with a Female Teacher.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all text-center shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>Join this Course on WhatsApp</span>
              </a>
            </div>

            {/* Other Courses in Hub */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#0b3c2d] font-serif">
                  Other Quran Courses
                </h3>
                <button
                  onClick={onBackToHub}
                  className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="space-y-2.5">
                {relatedCourses.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectOtherCourse(rel.id)}
                    className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-amber-50/70 border border-gray-200 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{rel.icon}</span>
                      <div>
                        <div className="font-bold text-xs text-gray-900">{rel.title}</div>
                        <div className="text-[10px] text-gray-500">{rel.category}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={onGoToHome}
                  className="font-bold text-[#0b3c2d] hover:text-amber-700 transition-colors cursor-pointer flex items-center gap-1"
                >
                  &larr; Homepage
                </button>
                <button
                  type="button"
                  onClick={onBackToHub}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Courses Hub &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
