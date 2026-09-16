/**
 * Abdullah Quran Academy UK
 * Centralized Contact & Brand Configuration
 * Site features 2 dedicated numbers:
 * 1. Admissions & Classes Hotline: +44 7446 361983 (WhatsApp: https://wa.me/447446361983 | tel:+447446361983)
 * 2. Book & PDF Download Helpline: 0327 7741707 (WhatsApp: https://wa.me/923277741707 | tel:+923277741707)
 */

// 1. Primary Academy Admissions, Classes & Student Support
export const ACADEMY_PHONE = '+44 7446 361983';
export const ACADEMY_PHONE_TEL = 'tel:+447446361983';
export const ACADEMY_WHATSAPP_NUMBER = '447446361983';
export const ACADEMY_WHATSAPP_DISPLAY = '+44 7446 361983';
export const ACADEMY_WHATSAPP_RAW = '044 7446361983';

// 2. Book & Syllabus PDF Download Helpline
export const BOOK_DOWNLOAD_PHONE_DISPLAY = '0327 7741707';
export const BOOK_DOWNLOAD_PHONE_RAW = '03277741707';
export const BOOK_DOWNLOAD_PHONE_INTL = '+92 327 7741707';
export const BOOK_DOWNLOAD_PHONE_TEL = 'tel:+923277741707';
export const BOOK_DOWNLOAD_WHATSAPP_NUMBER = '923277741707';

export const ACADEMY_EMAIL = 'abdullahquranacademy1998@gmail.com';
export const ACADEMY_CANONICAL_DOMAIN = 'https://abdullahquranacademy.co.uk';

/**
 * Builds a direct wa.me link for admissions / classes
 * Format: https://wa.me/447446361983
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const base = `https://wa.me/${ACADEMY_WHATSAPP_NUMBER}`;
  if (!customMessage) return base;
  return `${base}?text=${encodeURIComponent(customMessage)}`;
}

/**
 * Builds a direct wa.me link for downloading books, Qaida, and syllabus PDFs
 * Number: 03277741707 -> https://wa.me/923277741707
 */
export function getBookDownloadWhatsAppUrl(bookTitle?: string): string {
  const defaultMsg = bookTitle
    ? `Assalamu Alaikum! I would like to download the PDF for: ${bookTitle}. Please send the download link / file.`
    : 'Assalamu Alaikum! I would like to download the Noorani Qaida and Quran Course Books PDF.';
  return `https://wa.me/${BOOK_DOWNLOAD_WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMsg)}`;
}
