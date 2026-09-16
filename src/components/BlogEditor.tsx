import React, { useState, useRef } from 'react';
import { SeoItem, AppSettings } from '../types';
import { analyzeSeo } from '../utils/seoAnalyzer';
import { RankMathSidebar } from './RankMathSidebar';
import { SerpPreview } from './SerpPreview';
import { InternalLinkHelper } from './InternalLinkHelper';
import { SchemaBuilder } from './SchemaBuilder';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
  Sparkles,
  Search,
  Check,
  Globe,
  Tag,
  FileText,
} from 'lucide-react';

interface BlogEditorProps {
  item: SeoItem;
  settings: AppSettings;
  onSave: (updatedItem: SeoItem) => void;
  onOpenAiImage?: (initialPrompt?: string) => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ item, settings, onSave, onOpenAiImage }) => {
  const [formData, setFormData] = useState<SeoItem>({ ...item });
  const [activeTab, setActiveTab] = useState<'content' | 'snippet' | 'schema'>('content');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const metaDescRef = useRef<HTMLTextAreaElement>(null);

  // Analyze in real-time
  const seoAnalysis = analyzeSeo(formData, settings);

  const handleChange = (field: keyof SeoItem, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Keep score in sync
      const freshAnalysis = analyzeSeo(updated, settings);
      return { ...updated, seoScore: freshAnalysis.score };
    });
  };

  const handleSave = () => {
    const freshAnalysis = analyzeSeo(formData, settings);
    const finalItem = {
      ...formData,
      seoScore: freshAnalysis.score,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    onSave(finalItem);
  };

  // Format Helper for Textarea Editor
  const insertFormatting = (tagStart: string, tagEnd: string = '') => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const currentText = formData.content;
    const selectedText = currentText.substring(start, end) || 'Sample text';
    const newText =
      currentText.substring(0, start) +
      `${tagStart}${selectedText}${tagEnd}` +
      currentText.substring(end);

    handleChange('content', newText);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + tagStart.length, end + tagStart.length);
    }, 50);
  };

  const handleInsertImage = () => {
    if (!imgUrl) return;
    const altText = imgAlt || formData.focusKeyword || formData.title;
    const titleText = imgAlt || formData.title || formData.focusKeyword;
    const imgHtml = `<img src="${imgUrl}" alt="${altText}" title="${titleText}" />`;
    insertFormatting(imgHtml);
    setImgUrl('');
    setImgAlt('');
    setShowImageModal(false);
  };

  const handleInsertInternalLink = (phrase: string, url: string, anchor: string) => {
    const linkHtml = `<a href="${url}" target="_blank" rel="noopener"><strong>${anchor}</strong></a>`;
    if (formData.content.includes(phrase)) {
      const updatedContent = formData.content.replace(phrase, linkHtml);
      handleChange('content', updatedContent);
    } else {
      insertFormatting(linkHtml);
    }
  };

  const handleJumpToCheck = (targetField?: string) => {
    if (targetField === 'seoTitle' && titleInputRef.current) {
      setActiveTab('snippet');
      titleInputRef.current.focus();
    } else if (targetField === 'seoDescription' && metaDescRef.current) {
      setActiveTab('snippet');
      metaDescRef.current.focus();
    } else if (targetField === 'content' && textareaRef.current) {
      setActiveTab('content');
      textareaRef.current.focus();
    }
  };

  const triggerAiMetaHelper = async () => {
    setAiLoading(true);
    setAiSuggestion(null);
    try {
      const res = await fetch('/api/generate-seo-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'meta',
          topic: formData.title,
          focusKeyword: formData.focusKeyword,
        }),
      });
      const data = await res.json();
      if (data.text) {
        setAiSuggestion(data.text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Main Content & Editor */}
      <div className="flex-1 space-y-6">
        {/* Top Header & Save Strip */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                {formData.type === 'post' ? 'Blog Post Editor' : 'Page SEO Manager'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                formData.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {formData.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-1">{formData.title || 'Untitled Draft'}</h2>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as any)}
              className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" /> Save & Update SEO
            </button>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-gray-200 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'content'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" /> Content & Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('snippet')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'snippet'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4" /> SERP Snippet & Meta
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schema')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'schema'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Globe className="w-4 h-4" /> Schema & Social (OG)
          </button>
        </div>

        {/* Tab 1: Content & Editor */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Focus Keyword & Keywords Bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Focus Keyword <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.focusKeyword}
                    onChange={(e) => handleChange('focusKeyword', e.target.value)}
                    placeholder="e.g. online quran classes uk"
                    className="w-full text-sm font-medium px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Primary keyword you want to rank for in Google.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="e.g. online-quran-classes-uk"
                    className="w-full text-sm font-mono text-gray-800 px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Clean URL slug string used for ranking & routing.
                  </p>
                </div>
              </div>
            </div>

            {/* Rich Editor Component */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
              {/* Toolbar */}
              <div className="p-2.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-1 text-gray-700">
                <button
                  type="button"
                  onClick={() => insertFormatting('<h2>', '</h2>')}
                  className="p-1.5 hover:bg-gray-200 rounded font-bold text-xs flex items-center gap-1"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" /> H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('<h3>', '</h3>')}
                  className="p-1.5 hover:bg-gray-200 rounded font-bold text-xs flex items-center gap-1"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" /> H3
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('<strong>', '</strong>')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('<em>', '</em>')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n</ul>')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="p-1.5 hover:bg-gray-200 rounded text-indigo-700 font-medium text-xs flex items-center gap-1"
                  title="Insert Image"
                >
                  <ImageIcon className="w-4 h-4" /> Image
                </button>
                {onOpenAiImage && (
                  <button
                    type="button"
                    onClick={() => onOpenAiImage(formData.focusKeyword || formData.title)}
                    className="ml-auto px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> AI Image Studio
                  </button>
                )}
              </div>

              {/* Textarea Editor */}
              <textarea
                ref={textareaRef}
                rows={18}
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Write your blog post or page content here... Use <h2> subheadings, paragraphs, images, and links for maximum SEO score."
                className="w-full p-4 font-mono text-sm leading-relaxed text-gray-900 focus:outline-hidden border-none resize-y"
              />
            </div>

            {/* Internal Link Helper */}
            <InternalLinkHelper
              content={formData.content}
              sitemapList={settings.sitemapList}
              onInsertLink={handleInsertInternalLink}
            />
          </div>
        )}

        {/* Tab 2: Snippet & Meta */}
        {activeTab === 'snippet' && (
          <div className="space-y-6">
            <SerpPreview
              seoTitle={formData.seoTitle}
              seoDescription={formData.seoDescription}
              url={formData.canonicalUrl || `https://mywebsite.com/${formData.slug}`}
              brandName={settings.brandName}
              titleSeparator={settings.titleSeparator}
            />

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">SEO Meta Data Fields</h3>
                <button
                  type="button"
                  onClick={triggerAiMetaHelper}
                  disabled={aiLoading}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> {aiLoading ? 'Generating...' : 'AI Meta Generator'}
                </button>
              </div>

              {aiSuggestion && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs space-y-2">
                  <div className="font-bold text-indigo-900">Gemini AI Copy Suggestions:</div>
                  <pre className="whitespace-pre-wrap text-indigo-950 font-sans">{aiSuggestion}</pre>
                </div>
              )}

              {/* Meta Title with Character Counter */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    SEO Meta Title
                  </label>
                  <span
                    className={`text-xs font-bold ${
                      formData.seoTitle.length > 60
                        ? 'text-red-600'
                        : formData.seoTitle.length >= 50
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {formData.seoTitle.length} / 60 chars (Optimal: 50-60)
                  </span>
                </div>
                <input
                  ref={titleInputRef}
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleChange('seoTitle', e.target.value)}
                  placeholder="e.g. Best Online Quran Classes UK | Expert Tutors & Free Trial"
                  className={`w-full text-sm px-3.5 py-2.5 bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    formData.seoTitle.length > 60
                      ? 'border-red-400 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
              </div>

              {/* Meta Description with Character Counter */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    SEO Meta Description
                  </label>
                  <span
                    className={`text-xs font-bold ${
                      formData.seoDescription.length > 160
                        ? 'text-red-600'
                        : formData.seoDescription.length >= 120
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {formData.seoDescription.length} / 160 chars (Optimal: 120-160)
                  </span>
                </div>
                <textarea
                  ref={metaDescRef}
                  rows={3}
                  value={formData.seoDescription}
                  onChange={(e) => handleChange('seoDescription', e.target.value)}
                  placeholder="Provide a compelling summary of your page content including the focus keyword..."
                  className={`w-full text-sm p-3.5 bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    formData.seoDescription.length > 160
                      ? 'border-red-400 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                  placeholder="https://quranacademy.co.uk/online-quran-classes-uk"
                  className="w-full text-sm px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Schema & Social */}
        {activeTab === 'schema' && (
          <div className="space-y-6">
            <SchemaBuilder item={formData} onChange={(updated) => setFormData((prev) => ({ ...prev, ...updated }))} />

            {/* Social Cards (Open Graph & Twitter) */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Open Graph & Social Cards</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">Facebook / OpenGraph</h4>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">OG Title</label>
                    <input
                      type="text"
                      value={formData.ogTitle}
                      onChange={(e) => handleChange('ogTitle', e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">OG Description</label>
                    <textarea
                      rows={2}
                      value={formData.ogDescription}
                      onChange={(e) => handleChange('ogDescription', e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">OG Image URL</label>
                    <input
                      type="text"
                      value={formData.ogImage}
                      onChange={(e) => handleChange('ogImage', e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800">Twitter Card</h4>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Twitter Title</label>
                    <input
                      type="text"
                      value={formData.twitterTitle}
                      onChange={(e) => handleChange('twitterTitle', e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Twitter Description</label>
                    <textarea
                      rows={2}
                      value={formData.twitterDescription}
                      onChange={(e) => handleChange('twitterDescription', e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Twitter Image URL</label>
                    <input
                      type="text"
                      value={formData.twitterImage}
                      onChange={(e) => handleChange('twitterImage', e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar: Rank Math Analysis */}
      <div className="w-full lg:w-80 shrink-0">
        <RankMathSidebar analysis={seoAnalysis} onJumpToCheck={handleJumpToCheck} />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-gray-900">Insert Image with Alt Text</h3>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://picsum.photos/seed/quran/800/450"
                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Alt Text (Include Focus Keyword for SEO)
              </label>
              <input
                type="text"
                value={imgAlt}
                onChange={(e) => setImgAlt(e.target.value)}
                placeholder={`e.g. ${formData.focusKeyword || 'Quran tutor teaching student'}`}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Insert HTML Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
