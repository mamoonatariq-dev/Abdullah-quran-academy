import React, { useState } from 'react';
import { CanonicalHead } from './CanonicalHead';
import { getWhatsAppUrl, ACADEMY_WHATSAPP_DISPLAY } from '../utils/contactConfig';
import {
  Sparkles,
  Check,
  ShieldCheck,
  Users,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Lock,
  ArrowRight,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface FreeTrialViewProps {
  initialCourse?: string;
  onGoToHome: () => void;
  onGoToCoursesHub: () => void;
}

export const FreeTrialView: React.FC<FreeTrialViewProps> = ({
  initialCourse,
  onGoToHome,
  onGoToCoursesHub,
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    studentAge: 'Kids (8-12 yrs)',
    phone: '',
    email: '',
    course: initialCourse || 'Noorani Qaida for Beginners & Kids',
    tutorPreference: 'Female Tutor',
    timing: 'Evening (4pm - 8pm UK)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.email) return;
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum! I would like to book a 3-Day Free Trial at Abdullah Quran Academy UK.
Student Name: ${formData.studentName || 'New Student'}
Course: ${formData.course}
Tutor: ${formData.tutorPreference}
Timing: ${formData.timing}`
  );

  return (
    <div className="bg-[#FAF8F5] text-gray-800 font-sans min-h-screen">
      <CanonicalHead
        path="/free-trial"
        title="Book 3-Day Free Trial | Online Quran Classes UK"
        description="Register for a 3-Day Free Trial with certified female Quran tutors in the UK. 1-to-1 live Zoom classes for children & sisters."
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-gray-500 gap-2">
          <button
            onClick={onGoToHome}
            className="hover:text-[#0b3c2d] font-medium transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={onGoToCoursesHub}
            className="hover:text-[#0b3c2d] font-medium transition-colors cursor-pointer"
          >
            Online Quran Courses
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#0b3c2d] font-bold">3-Day Free Trial (Conversion Page)</span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-linear-to-b from-[#0b3c2d] to-[#07251c] text-white py-12 lg:py-16 text-center relative border-b-4 border-amber-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Tier 5 • Main Conversion Page
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight text-white">
            Book Your <span className="text-amber-400">3-Day Free Trial</span> Class
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Experience our 1-on-1 private online Quran classes with certified female UK teachers. Zero registration fees, no credit card required, 100% free evaluation.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-lg">
              
              {submitted ? (
                <div className="text-center py-12 space-y-5 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h2 className="text-2xl font-bold text-[#0b3c2d] font-serif">
                    JazakAllah Khair! Free Trial Request Received
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                    Our academic coordinator is reviewing your details. We will message you on WhatsApp (or call) within 2 to 4 hours to confirm your tutor and schedule your first 1-on-1 Zoom lesson.
                  </p>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs max-w-md mx-auto space-y-1">
                    <div className="font-bold text-[#0b3c2d]">Student: {formData.studentName}</div>
                    <div className="text-gray-600">Course: {formData.course}</div>
                    <div className="text-gray-600">Tutor: {formData.tutorPreference}</div>
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <a
                      href={getWhatsAppUrl(decodeURIComponent(whatsappMessage))}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Speed Up on WhatsApp ({ACADEMY_WHATSAPP_DISPLAY})
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Submit Another Registration
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0b3c2d] font-serif">
                      Student Registration Form
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Please fill out your details so we can match you with the right teacher and schedule.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Student Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ibrahim or Ayesha"
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({ ...formData, studentName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden"
                      />
                    </div>

                    {/* Parent Name (if student is child) */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Parent / Guardian Name (if under 18)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Brother Farooq"
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({ ...formData, parentName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Student Age Category */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Student Age Category *
                      </label>
                      <select
                        value={formData.studentAge}
                        onChange={(e) =>
                          setFormData({ ...formData, studentAge: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden bg-white"
                      >
                        <option value="Kids (8-12 yrs)">Kids (8 - 12 years old)</option>
                        <option value="Teens & Girls (13-17 yrs)">Teens & Girls (13 - 17 years old)</option>
                        <option value="Adult Sister (18+ yrs)">Adult Sister / Female Learner (18+)</option>
                        <option value="Ijazah Candidate (16+ Females Only)">Higher Level of Ijazah (16+ Females Only)</option>
                      </select>
                    </div>

                    {/* Preferred Tutor */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Preferred Teacher *
                      </label>
                      <select
                        value={formData.tutorPreference}
                        onChange={(e) =>
                          setFormData({ ...formData, tutorPreference: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden bg-white"
                      >
                        <option value="Female Hafiza">Certified Female Hafiza (Quran & Tajweed)</option>
                        <option value="Female Alimah">Senior Female Alimah (Tafseer & Arabic)</option>
                        <option value="Kids Specialist">Kids Phonics Specialist Female Teacher</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WhatsApp Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7446 361983"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden font-mono"
                      />
                      <span className="text-[10px] text-gray-500 mt-1 block">
                        We send lesson links and schedule updates via WhatsApp.
                      </span>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="youremail@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Course Selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Select Desired Course *
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden bg-white"
                    >
                      <option value="Noorani Qaida for Beginners & Kids">
                        Noorani Qaida Course (Beginners & Kids)
                      </option>
                      <option value="Online Quran Reading (Nazra Fluency Course)">
                        Online Quran Reading & Nazra Fluency Course
                      </option>
                      <option value="Learn Quran with Tajweed & Higher Level of Tajweed">
                        Tajweed & Higher Level of Tajweed Course
                      </option>
                      <option value="Online Quran Hifdh Program (Systematic Memorization)">
                        Online Quran Hifdh Program (Memorization)
                      </option>
                      <option value="Quran Translation & Tafseer Course (Understanding Quran)">
                        Quran Translation & Tafseer Course
                      </option>
                      <option value="Higher Level of Ijazah Certification (16+ Females Only)">
                        Higher Level of Ijazah Certification (Exclusively 16+ Females)
                      </option>
                    </select>
                  </div>

                  {/* Preferred Timing */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Preferred UK Timing Slot *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Morning (8am - 12pm)',
                        'Afternoon (12pm - 4pm)',
                        'Evening (4pm - 8pm)',
                        'Weekend (Sat/Sun)',
                      ].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setFormData({ ...formData, timing: slot })}
                          className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                            formData.timing === slot
                              ? 'bg-[#0b3c2d] text-white border-[#0b3c2d]'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes / Current Level */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Current Reading Level / Special Instructions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Completed Qaida, needs Tajweed help on Madd and Makharij, or complete beginner..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-hidden"
                    />
                  </div>

                  {/* Submit & WhatsApp Buttons */}
                  <div className="pt-2 space-y-3">
                    <a
                      href={getWhatsAppUrl('Assalam o Alaikum! I want to join a course with a Female Quran Teacher.')}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-amber-300" />
                      <span>Join Directly via WhatsApp (Fastest)</span>
                    </a>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0b3c2d] font-black text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#0b3c2d]" />
                      <span>Confirm & Book 3-Day Free Trial Online</span>
                      <ArrowRight className="w-4 h-4 text-[#0b3c2d]" />
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 mt-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Zero payment info required • 100% private with certified female teachers</span>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Guarantees & Why Free Trial */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Guarantee Box */}
            <div className="bg-[#0b3c2d] text-white rounded-3xl p-6 sm:p-7 border border-amber-400 shadow-lg space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Our British Standard
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                What to Expect During Your Free 3 Days:
              </h3>

              <div className="space-y-3.5 text-xs text-emerald-100">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-gray-950 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Day 1: Level Assessment</strong>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">
                      Teacher assesses letter pronunciation, Makhraj, or Nazra fluency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-gray-950 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white">Day 2: Live Guided Practice</strong>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">
                      Full 30-minute interactive lesson with digital Quran overlays.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-gray-950 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Day 3: Learning Roadmap</strong>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">
                      Teacher delivers a tailored progression plan and schedule recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-800 text-[11px] text-emerald-200">
                ★ If not 100% satisfied, there is zero obligation to continue.
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">Prefer Instant WhatsApp Booking?</h3>
              <p className="text-xs text-gray-500">
                Connect directly with our UK administration team:
              </p>
              <a
                href={getWhatsAppUrl('Assalam o Alaikum! I want to book a free trial class.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{ACADEMY_WHATSAPP_DISPLAY}</span>
              </a>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={onGoToHome}
                  className="font-bold text-[#0b3c2d] hover:text-amber-700 transition-colors cursor-pointer flex items-center gap-1"
                >
                  &larr; Homepage
                </button>
                <button
                  type="button"
                  onClick={onGoToCoursesHub}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Browse All Courses &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
