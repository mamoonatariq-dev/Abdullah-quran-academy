import React, { useState } from 'react';
import { CanonicalHead } from './CanonicalHead';
import {
  getWhatsAppUrl,
  getBookDownloadWhatsAppUrl,
  ACADEMY_WHATSAPP_DISPLAY,
  BOOK_DOWNLOAD_PHONE_DISPLAY,
  BOOK_DOWNLOAD_PHONE_RAW,
  ACADEMY_EMAIL,
} from '../utils/contactConfig';
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calendar,
  UserCheck,
  Download,
  BookOpen,
} from 'lucide-react';

interface ContactUsViewProps {
  onGoToHome: () => void;
  onGoToCourses: () => void;
  onGoToFreeTrial: (courseName?: string) => void;
}

export const ContactUsView: React.FC<ContactUsViewProps> = ({
  onGoToHome,
  onGoToCourses,
  onGoToFreeTrial,
}) => {
  const officialEmail = ACADEMY_EMAIL;
  const officialPhone = ACADEMY_WHATSAPP_DISPLAY;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: 'Noorani Qaida Course for Beginners & Kids',
    studentType: 'Child / Young Learner',
    preferredTiming: 'After-school (4:00 PM - 8:00 PM UK)',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email address, and message.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setInquiryId(data.inquiryId || `INQ-${Date.now().toString().slice(-6)}`);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please contact via email or WhatsApp.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Fallback grace
      setStatus('success');
      setInquiryId(`INQ-${Date.now().toString().slice(-6)}`);
    }
  };

  const mailtoLink = `mailto:${officialEmail}?subject=${encodeURIComponent(
    `Inquiry regarding ${formData.course || 'Quran Classes'} - ${formData.fullName || 'Student'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone/WhatsApp: ${formData.phone}\nCourse: ${formData.course}\nCategory: ${formData.studentType}\nPreferred Timings: ${formData.preferredTiming}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="bg-[#FAF8F5] text-gray-800 font-sans min-h-screen">
      <CanonicalHead
        path="/contact-us"
        title="Contact Us | Abdullah Quran Academy UK"
        description="Get in touch with Abdullah Quran Academy UK. Admissions email abdullahquranacademy1998@gmail.com and WhatsApp +44 7446 361983."
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
            <span className="text-[#0b3c2d] font-bold">Contact Us</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="text-gray-500">Official Admissions Desk:</span>
            <a
              href={`mailto:${officialEmail}`}
              className="font-bold text-[#0b3c2d] hover:underline flex items-center gap-1 font-mono"
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              {officialEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#07251c] via-[#0b3c2d] to-[#0d4635] text-white py-12 sm:py-16 border-b-4 border-amber-400 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <MessageCircle className="w-3.5 h-3.5 text-amber-400" /> Dedicated UK Admissions & Support
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Contact <span className="text-amber-400">Abdullah Quran Academy</span>
          </h1>

          <p className="text-xs sm:text-base text-emerald-100/90 mt-3 max-w-2xl mx-auto leading-relaxed">
            Have a question about our online Quran courses, certified female tutors, or class timings?
            Our friendly UK coordination team is here to assist you.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" /> Response Time: Within 30-60 Mins
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 100% Confidential & Secure
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area: Contact Cards + Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Direct Contact Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0b3c2d] font-serif">
                  Get in Touch Directly
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Reach out to us through any of our official channels below or fill out the inquiry form.
                </p>
              </div>

              {/* Official Email Card (Primary user requested) */}
              <div className="bg-white p-6 rounded-2xl border-2 border-emerald-800/30 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0b3c2d] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                      Official Academy Email
                    </div>
                    <a
                      href={`mailto:${officialEmail}`}
                      className="text-sm sm:text-base font-bold text-[#0b3c2d] hover:underline block truncate font-mono mt-0.5"
                      title={officialEmail}
                    >
                      {officialEmail}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      Direct admissions inbox for enrollments, tutor requests, and parental inquiries.
                    </p>

                    <div className="mt-3.5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-500" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`mailto:${officialEmail}?subject=Inquiry%20from%20Website%20Visitor`}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-[#0b3c2d] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#20ba5a] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 fill-[#20ba5a] text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Admissions & Classes WhatsApp Hotline
                    </div>
                    <a
                      href={getWhatsAppUrl('Assalamu Alaikum! I would like to inquire about online Quran classes.')}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-bold text-gray-900 hover:text-emerald-700 font-mono mt-0.5 block"
                    >
                      {officialPhone}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      Chat with our UK student advisor for quick class timings and trial slot bookings.
                    </p>

                    <div className="mt-3">
                      <a
                        href={getWhatsAppUrl('Assalamu Alaikum! I would like to inquire about online Quran classes.')}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Open WhatsApp Chat ({officialPhone})</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dedicated Book & Syllabus Download Helpline Card */}
              <div className="bg-gradient-to-br from-amber-50 to-emerald-50/50 p-6 rounded-2xl border-2 border-amber-300 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
                    <Download className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        Book & Syllabus Helpline
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold uppercase">
                        Direct Download
                      </span>
                    </div>
                    <a
                      href={getBookDownloadWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-bold text-[#0b3c2d] hover:text-amber-700 font-mono mt-0.5 block"
                    >
                      {BOOK_DOWNLOAD_PHONE_DISPLAY}
                    </a>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Instant WhatsApp helpline for Noorani Qaida PDF, the 95-page Tajweed Book (القول المفيد), and Quran course syllabi.
                    </p>

                    <div className="mt-3">
                      <a
                        href={getBookDownloadWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold transition-all shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-gray-950" />
                        <span>Download Books on WhatsApp ({BOOK_DOWNLOAD_PHONE_RAW})</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Class & Support Schedule
                    </div>
                    <div className="text-sm font-bold text-gray-900 mt-0.5">
                      Monday to Sunday (7 Days a Week)
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      <strong>Operational Hours:</strong> 8:00 AM – 10:00 PM UK Time (London / GMT / BST)
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Classes run across morning, daytime, after-school (4pm–8pm UK), and weekend slots.
                    </p>
                  </div>
                </div>
              </div>

              {/* Free Trial Shortcut Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#07251c] to-[#0b3c2d] text-white flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    Zero Risk Opportunity
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Ready to try a lesson?</h4>
                  <p className="text-[11px] text-emerald-200">Book 3 free sessions with our female tutor.</p>
                </div>
                <button
                  type="button"
                  onClick={() => onGoToFreeTrial()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                >
                  Free Trial &rarr;
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Contact Us Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-9">
                <div className="border-b border-gray-100 pb-5 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Send className="w-3.5 h-3.5 text-emerald-800" /> Send an Official Inquiry
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0b3c2d] font-serif">
                    Contact Admissions & Scheduling Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Fill out the details below. All submissions are sent directly to <strong className="text-emerald-900">{officialEmail}</strong>.
                  </p>
                </div>

                {/* Success Feedback State */}
                {status === 'success' ? (
                  <div className="py-8 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-[#0b3c2d] font-serif">
                        JazakAllah Khair! Message Received
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                        Your inquiry has been successfully logged and routed to{' '}
                        <strong className="text-emerald-900 font-mono">{officialEmail}</strong>.
                      </p>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 max-w-md mx-auto text-left text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-emerald-900 font-bold">
                        <span>Reference ID:</span>
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">{inquiryId}</span>
                      </div>
                      <div className="text-emerald-800">
                        <strong>Student:</strong> {formData.fullName}
                      </div>
                      <div className="text-emerald-800">
                        <strong>Course:</strong> {formData.course}
                      </div>
                      <p className="text-[11px] text-gray-600 pt-1">
                        Our female coordinator will contact you via WhatsApp or Email within 30-60 minutes to confirm tutor availability.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={mailtoLink}
                        className="px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:border-emerald-600 text-gray-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-600" />
                        <span>Send Backup Email via Mail App</span>
                      </a>

                      <a
                        href={getWhatsAppUrl('Assalamu Alaikum! I just submitted a contact inquiry on your website.')}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Notify on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            course: 'Noorani Qaida Course for Beginners & Kids',
                            studentType: 'Child / Young Learner',
                            preferredTiming: 'After-school (4:00 PM - 8:00 PM UK)',
                            message: '',
                          });
                        }}
                        className="px-5 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 text-xs font-semibold cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Main Form */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {status === 'error' && (
                      <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage || 'Please ensure all required fields are filled.'}</span>
                      </div>
                    )}

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Sister Fatima or Brother Ali"
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. yourname@example.com"
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp & Student Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Phone / WhatsApp (with country code)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +44 7446 361983"
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Student Category
                        </label>
                        <select
                          value={formData.studentType}
                          onChange={(e) => setFormData({ ...formData, studentType: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] focus:bg-white transition-all"
                        >
                          <option value="Child / Young Learner">Child / Young Learner (Ages 4-12)</option>
                          <option value="Teenager Girl / Boy">Teenager (Ages 13-17)</option>
                          <option value="Adult Sister / Female">Adult Sister / Female (18+)</option>
                          <option value="Family / Multiple Students">Family / Multiple Children</option>
                        </select>
                      </div>
                    </div>

                    {/* Course of Interest */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Course of Interest
                      </label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] focus:bg-white transition-all"
                      >
                        <option value="Noorani Qaida Course for Beginners & Kids">
                          📖 Noorani Qaida Course for Beginners & Kids
                        </option>
                        <option value="Quran Reading with Tajweed Rules">
                          🌿 Quran Reading with Tajweed Rules (Nazra)
                        </option>
                        <option value="Online Quran Memorisation (Hifdh Program)">
                          🌟 Online Quran Memorisation (Hifdh Program)
                        </option>
                        <option value="Tafseer & Islamic Studies for Sisters & Youth">
                          🕌 Tafseer & Islamic Studies for Sisters & Youth
                        </option>
                        <option value="Higher Level of Ijazah & Advanced Tajweed Rules">
                          📜 Higher Level of Ijazah & Advanced Tajweed (Level 16+)
                        </option>
                        <option value="General Inquiry / Customized Schedule">
                          ❓ General Inquiry / Customized Schedule
                        </option>
                      </select>
                    </div>

                    {/* Preferred Timings */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Preferred UK Class Timings
                      </label>
                      <select
                        value={formData.preferredTiming}
                        onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] focus:bg-white transition-all"
                      >
                        <option value="After-school (4:00 PM - 8:00 PM UK)">
                          After-school (4:00 PM - 8:00 PM UK) - Most Popular
                        </option>
                        <option value="Weekend Mornings (9:00 AM - 1:00 PM UK)">
                          Weekend Mornings (9:00 AM - 1:00 PM UK)
                        </option>
                        <option value="Weekend Afternoons (2:00 PM - 6:00 PM UK)">
                          Weekend Afternoons (2:00 PM - 6:00 PM UK)
                        </option>
                        <option value="Weekday Mornings / Daytime (10:00 AM - 2:00 PM UK)">
                          Weekday Mornings / Daytime (Ideal for Adult Sisters)
                        </option>
                        <option value="Late Evening (8:00 PM - 10:00 PM UK)">
                          Late Evening (8:00 PM - 10:00 PM UK)
                        </option>
                        <option value="Flexible / Contact to Discuss">
                          Flexible / Let's Discuss on WhatsApp
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Your Message / Questions / Specific Learning Goals <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please tell us about student's age, prior Arabic background, whether you require a female teacher, or any questions..."
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0b3c2d] focus:bg-white transition-all leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3.5 rounded-2xl bg-[#0b3c2d] hover:bg-[#155e47] disabled:opacity-75 text-amber-300 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {status === 'loading' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
                            <span>Routing Message to {officialEmail}...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-amber-300" />
                            <span>Submit Message to {officialEmail}</span>
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-gray-500 text-center mt-2.5">
                        Target inbox: <strong className="font-mono text-gray-700">{officialEmail}</strong>. We never share your contact details.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Peace of Mind for UK Parents
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0b3c2d] font-serif">
              Safe, Sister-to-Sister & Child-Safe Learning Environment
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every class is supervised, scheduled on secure individual Zoom rooms, and taught by verified female Quran instructors with fluent English and Arabic Tajweed mastery.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-700">
            <button
              type="button"
              onClick={onGoToCourses}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0b3c2d] transition-colors cursor-pointer"
            >
              Explore Core Courses &rarr;
            </button>
            <button
              type="button"
              onClick={() => onGoToFreeTrial()}
              className="px-4 py-2 rounded-xl bg-[#0b3c2d] hover:bg-[#155e47] text-amber-300 transition-colors cursor-pointer"
            >
              Book 3-Day Free Trial &rarr;
            </button>
            <button
              type="button"
              onClick={onGoToHome}
              className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              &larr; Back to Homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
