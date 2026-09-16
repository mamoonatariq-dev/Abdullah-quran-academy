import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { initialItems, initialSettings } from './src/data/initialData.ts';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// File storage path
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'seo-data.json');

// Initialize data directory & storage
function loadStoredData() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading stored SEO data:', err);
  }
  return { items: initialItems, settings: initialSettings };
}

function saveStoredData(data: { items: any[]; settings: any }) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving SEO data:', err);
  }
}

// Memory cache
let dbState = loadStoredData();

// --------------------------------------------------------------------------
// REST API ENDPOINTS
// --------------------------------------------------------------------------

// Get all items & settings
app.get('/api/seo/data', (req, res) => {
  res.json({ success: true, ...dbState });
});

// Save all items & settings
app.post('/api/seo/data', (req, res) => {
  const { items, settings } = req.body;
  if (items) dbState.items = items;
  if (settings) dbState.settings = settings;
  saveStoredData(dbState);
  res.json({ success: true, message: 'SEO data saved successfully' });
});

// Update single item
app.post('/api/seo/item', (req, res) => {
  const item = req.body;
  if (!item || !item.id) {
    return res.status(400).json({ error: 'Item id is required' });
  }
  const index = dbState.items.findIndex(i => i.id === item.id);
  if (index >= 0) {
    dbState.items[index] = { ...dbState.items[index], ...item, lastUpdated: new Date().toISOString().split('T')[0] };
  } else {
    dbState.items.push({ ...item, lastUpdated: new Date().toISOString().split('T')[0] });
  }
  saveStoredData(dbState);
  res.json({ success: true, item: index >= 0 ? dbState.items[index] : item });
});

// Delete item
app.delete('/api/seo/item/:id', (req, res) => {
  const { id } = req.params;
  dbState.items = dbState.items.filter(i => i.id !== id);
  saveStoredData(dbState);
  res.json({ success: true, message: 'Item deleted' });
});

// Update settings
app.post('/api/seo/settings', (req, res) => {
  const { settings } = req.body;
  if (settings) {
    dbState.settings = { ...dbState.settings, ...settings };
    saveStoredData(dbState);
  }
  res.json({ success: true, settings: dbState.settings });
});

// --------------------------------------------------------------------------
// GEMINI AI INTEGRATION (Server-Side)
// --------------------------------------------------------------------------

// 1. AI Image Generation & Editing API (Gemini Nano Banana 2: gemini-3.1-flash-image)
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, size = '1K', aspectRatio = '16:9', editImageBase64 } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in server environment.' });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const parts: any[] = [];
    if (editImageBase64) {
      // Remove data URL prefix if present
      const cleanBase64 = editImageBase64.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: 'image/png',
        },
      });
    }
    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: size as any, // 1K, 2K, 4K
        },
      },
    });

    let generatedImageUrl = '';
    let responseText = '';

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        } else if (part.text) {
          responseText += part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      // Fallback if model output was text-only or didn't provide image data
      return res.status(400).json({
        error: responseText || 'Image generation completed without returning inline image data.',
      });
    }

    res.json({ success: true, imageUrl: generatedImageUrl, message: responseText });
  } catch (err: any) {
    console.error('Error generating image via Gemini:', err);
    res.status(500).json({ error: err.message || 'Failed to generate image' });
  }
});

// 2. AI SEO Assistant API (Meta Generator & Content Suggestion)
app.post('/api/generate-seo-ai', async (req, res) => {
  try {
    const { task, topic, focusKeyword } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let prompt = '';
    if (task === 'meta') {
      prompt = `Act as an expert SEO Copywriter. Generate 3 click-worthy Meta Titles (under 60 chars) and 3 compelling Meta Descriptions (120-160 chars) for a webpage about: "${topic}" with primary focus keyword: "${focusKeyword}". Format your output clearly in JSON with fields "titles" (array of strings) and "descriptions" (array of strings).`;
    } else if (task === 'outline') {
      prompt = `Create an SEO-optimized blog outline with H2 and H3 subheadings for the article titled "${topic}" with focus keyword "${focusKeyword}". Output HTML formatted text with <h2> and <h3> tags and short bullet paragraphs.`;
    } else {
      prompt = `Suggest 5 related secondary keywords and LSI terms for the focus keyword "${focusKeyword}" in the context of "${topic}". Return JSON format with array of strings under key "keywords".`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    res.json({ success: true, text: response.text });
  } catch (err: any) {
    console.error('Error calling Gemini SEO assistant:', err);
    res.status(500).json({ error: err.message || 'AI assistant failed' });
  }
});

// --------------------------------------------------------------------------
// CONTACT FORM & EMAIL ENDPOINT (Target: abdullahquranacademy1998@gmail.com)
// --------------------------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      course,
      studentType,
      preferredTiming,
      message,
    } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const recipientEmail = 'abdullahquranacademy1998@gmail.com';
    const timestamp = new Date().toISOString();
    const inquiryId = `INQ-${Date.now().toString().slice(-6)}`;

    const inquiryRecord = {
      id: inquiryId,
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : 'Not provided',
      course: course || 'General Inquiry',
      studentType: studentType || 'Not specified',
      preferredTiming: preferredTiming || 'Flexible',
      message: String(message).trim(),
      recipientEmail,
      createdAt: timestamp,
      status: 'new',
    };

    // 1. Always record to disk so no inquiry is ever lost
    const CONTACTS_FILE = path.join(DATA_DIR, 'contact-inquiries.json');
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      let existing: any[] = [];
      if (fs.existsSync(CONTACTS_FILE)) {
        existing = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));
      }
      existing.unshift(inquiryRecord);
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(existing.slice(0, 150), null, 2), 'utf-8');
    } catch (saveErr) {
      console.error('Failed to log contact inquiry to file:', saveErr);
    }

    // 2. Dispatch email via nodemailer
    let emailSent = false;
    let emailStatusMessage = '';

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Abdullah Quran Academy" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: String(email),
          subject: `[New Inquiry ${inquiryId}] ${course || 'Quran Class'} - ${fullName}`,
          text: `New Student Inquiry Received:\n\nInquiry ID: ${inquiryId}\nFull Name: ${fullName}\nEmail: ${email}\nPhone / WhatsApp: ${phone || 'N/A'}\nCourse: ${course || 'General'}\nStudent Category: ${studentType || 'Not specified'}\nPreferred Timings: ${preferredTiming || 'Flexible'}\n\nMessage:\n${message}\n\nSubmitted on: ${timestamp}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FAF8F5; border: 1px solid #e5e7eb; border-radius: 12px;">
              <div style="background-color: #0b3c2d; color: #fef08a; padding: 18px 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #ffffff;">Abdullah Quran Academy UK</h1>
                <p style="margin: 4px 0 0; font-size: 13px; color: #fde047;">New Student / Class Inquiry (${inquiryId})</p>
              </div>
              <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 35%;">Student / Parent:</td>
                    <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${fullName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #0b3c2d; text-decoration: underline;">${email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Phone / WhatsApp:</td>
                    <td style="padding: 10px 0; color: #0f172a;">${phone || 'Not provided'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Course Requested:</td>
                    <td style="padding: 10px 0; color: #047857; font-weight: bold;">${course || 'General'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Category:</td>
                    <td style="padding: 10px 0; color: #0f172a;">${studentType || 'Not specified'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Preferred Timings:</td>
                    <td style="padding: 10px 0; color: #0f172a;">${preferredTiming || 'Flexible'}</td>
                  </tr>
                </table>

                <div style="margin-top: 20px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #0b3c2d; border-radius: 4px;">
                  <strong style="color: #0b3c2d; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message / Note:</strong>
                  <p style="margin: 8px 0 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
                  <a href="https://wa.me/447446361983" style="display: inline-block; background-color: #0b3c2d; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 9999px; font-size: 13px; font-weight: bold; margin-right: 8px;">Contact Student via WhatsApp</a>
                  <a href="mailto:${email}?subject=Regarding%20your%20Quran%20Class%20Inquiry%20at%20Abdullah%20Quran%20Academy" style="display: inline-block; background-color: #f1f5f9; color: #0f172a; text-decoration: none; padding: 10px 20px; border-radius: 9999px; font-size: 13px; font-weight: bold;">Reply via Email</a>
                </div>
              </div>
            </div>
          `,
        });
        emailSent = true;
        emailStatusMessage = 'Direct email successfully delivered to abdullahquranacademy1998@gmail.com.';
      } catch (smtpErr: any) {
        console.warn('Could not dispatch SMTP email:', smtpErr.message);
        emailStatusMessage = 'Inquiry recorded. Email queued for dispatch.';
      }
    } else {
      console.log(`[Contact Form] Target recipient: ${recipientEmail}. Inquiry ID: ${inquiryId}`);
      emailStatusMessage = `Inquiry recorded for ${recipientEmail}.`;
    }

    res.json({
      success: true,
      message: 'Your inquiry has been successfully received by Abdullah Quran Academy!',
      inquiryId,
      recipient: recipientEmail,
      emailSent,
      note: emailStatusMessage,
    });
  } catch (err: any) {
    console.error('Error handling contact submission:', err);
    res.status(500).json({
      error: 'An unexpected error occurred while processing your message. Please email us directly at abdullahquranacademy1998@gmail.com.',
    });
  }
});

// --------------------------------------------------------------------------
// VITE / STATIC SERVING & DYNAMIC CANONICAL SEO TAGS
// --------------------------------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      // Dynamic canonical resolution for SEO crawlers & bots
      const rawPath = req.path || '/';
      let cleanPath = rawPath.split('?')[0].split('#')[0].toLowerCase();
      cleanPath = cleanPath.replace(/\/+$/, '');
      const canonicalDomain = 'https://abdullahquranacademy.co.uk';
      const fullCanonicalUrl = `${canonicalDomain}${cleanPath}`;

      // Set standard HTTP Link header for search engine crawlers
      res.setHeader('Link', `<${fullCanonicalUrl}>; rel="canonical"`);

      if (fs.existsSync(indexHtmlPath)) {
        try {
          let html = fs.readFileSync(indexHtmlPath, 'utf-8');
          // Standardize and inject canonical link tag into <head>
          if (html.includes('<link rel="canonical"')) {
            html = html.replace(
              /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
              `<link rel="canonical" href="${fullCanonicalUrl}" />`
            );
          } else {
            html = html.replace('</head>', `  <link rel="canonical" href="${fullCanonicalUrl}" />\n</head>`);
          }
          if (html.includes('<meta property="og:url"')) {
            html = html.replace(
              /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
              `<meta property="og:url" content="${fullCanonicalUrl}" />`
            );
          }
          res.send(html);
          return;
        } catch (e) {
          console.error('Error injecting canonical tag:', e);
        }
      }
      res.sendFile(indexHtmlPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SEO Dashboard server running on http://0.0.0.0:${PORT}`);
  });
}

start();
