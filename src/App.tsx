import React, { useState, useEffect } from 'react';
import { SeoItem, AppSettings, ItemType } from './types';
import { initialItems, initialSettings } from './data/initialData';
import { OverviewDashboard } from './components/OverviewDashboard';
import { BlogEditor } from './components/BlogEditor';
import { AiImageStudio } from './components/AiImageStudio';
import { SettingsPage } from './components/SettingsPage';
import { PublicWebsite } from './components/PublicWebsite';
import {
  BarChart3,
  Globe,
  FileText,
  Sparkles,
  Settings,
  Search,
  Plus,
  RefreshCw,
  Check,
  ShieldCheck,
  Zap,
  Eye,
  Sliders,
} from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<SeoItem[]>(initialItems);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);
  const [viewMode, setViewMode] = useState<'frontend' | 'dashboard'>('frontend');
  const [currentNav, setCurrentNav] = useState<'overview' | 'pages' | 'posts' | 'ai-studio' | 'settings'>('overview');
  const [selectedItem, setSelectedItem] = useState<SeoItem | null>(null);
  const [aiImagePrompt, setAiImagePrompt] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Fetch from server DB API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/seo/data');
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) setItems(data.items);
          if (data.settings) setSettings(data.settings);
        }
      } catch (err) {
        console.warn('Using initial fallback state:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync to server API
  const saveAllState = async (newItems: SeoItem[], newSettings: AppSettings) => {
    setItems(newItems);
    setSettings(newSettings);
    try {
      await fetch('/api/seo/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: newItems, settings: newSettings }),
      });
    } catch (err) {
      console.error('Failed to sync state to server:', err);
    }
  };

  const handleUpdateItem = async (updatedItem: SeoItem) => {
    const updatedList = items.map((i) => (i.id === updatedItem.id ? updatedItem : i));
    setItems(updatedList);
    setSelectedItem(updatedItem);
    await saveAllState(updatedList, settings);
  };

  const handleAddNewItem = async (type: ItemType, title: string, keyword: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newItem: SeoItem = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      slug,
      status: 'draft',
      focusKeyword: keyword,
      relatedKeywords: [],
      seoTitle: `${title} | ${settings.brandName}`,
      seoDescription: `Learn more about ${title} on ${settings.brandName}.`,
      canonicalUrl: `https://mywebsite.com/${slug}`,
      ogTitle: title,
      ogDescription: `Learn more about ${title}.`,
      ogImage: 'https://picsum.photos/seed/seo/1200/630',
      twitterTitle: title,
      twitterDescription: `Learn more about ${title}.`,
      twitterImage: 'https://picsum.photos/seed/seo/1200/630',
      schemaType: type === 'post' ? 'Article' : 'LocalBusiness',
      schemaFields: { author: 'Admin', publisher: settings.brandName },
      robotsMeta: { index: true, follow: true },
      content: `<h2>Introduction</h2>\n<p>Write your detailed content about ${keyword || title} here.</p>`,
      seoScore: 45,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    const updatedList = [newItem, ...items];
    setItems(updatedList);
    setSelectedItem(newItem);
    setCurrentNav(type === 'post' ? 'posts' : 'pages');
    await saveAllState(updatedList, settings);
  };

  const handleDeleteItem = async (id: string) => {
    const updatedList = items.filter((i) => i.id !== id);
    setItems(updatedList);
    if (selectedItem?.id === id) setSelectedItem(null);
    await saveAllState(updatedList, settings);
  };

  const handleExportData = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const dataStr = JSON.stringify({ items, settings }, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seo-dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
  };

  const handleImportData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.items && Array.isArray(parsed.items)) {
        setItems(parsed.items);
        if (parsed.settings) setSettings(parsed.settings);
        saveAllState(parsed.items, parsed.settings || settings);
        alert('SEO Data imported successfully!');
      }
    } catch (err) {
      alert('Invalid JSON file format.');
    }
  };

  const handleOpenAiStudio = (promptText?: string) => {
    if (promptText) setAiImagePrompt(promptText);
    setCurrentNav('ai-studio');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col antialiased">
      {viewMode === 'frontend' ? (
        <PublicWebsite
          settings={settings}
          blogItems={items}
          onOpenBlogEditor={(post) => {
            setSelectedItem(post);
            setCurrentNav('posts');
            setViewMode('dashboard');
          }}
          onOpenDashboard={() => setViewMode('dashboard')}
        />
      ) : (
        <>
          {/* Top Main Navigation Header for SEO Dashboard */}
          <header className="bg-white border-b border-gray-200 sticky top-7 z-30 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  setCurrentNav('overview');
                  setSelectedItem(null);
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-200">
                  R
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-gray-900 text-base tracking-tight">SEO Master Pro</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Rank Math Core
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">Non-WordPress SEO & Content Analyzer</p>
                </div>
              </div>

              {/* Nav Items */}
              <nav className="hidden md:flex items-center gap-1 bg-gray-100/70 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentNav('overview');
                    setSelectedItem(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    currentNav === 'overview' && !selectedItem
                      ? 'bg-white text-gray-900 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" /> Overview
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentNav('pages');
                    const firstPage = items.find((i) => i.type === 'page');
                    if (firstPage) setSelectedItem(firstPage);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    currentNav === 'pages' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" /> Page SEO Manager
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentNav('posts');
                    const firstPost = items.find((i) => i.type === 'post');
                    if (firstPost) setSelectedItem(firstPost);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    currentNav === 'posts' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-600" /> Blog Post Editor
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentNav('ai-studio')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    currentNav === 'ai-studio'
                      ? 'bg-white text-indigo-900 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Image Studio
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentNav('settings')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    currentNav === 'settings' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" /> Settings
                </button>
              </nav>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                  Site: <span className="text-gray-900 font-bold">{settings.brandName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('frontend')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Live Site</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
                <p className="text-xs font-semibold text-gray-600">Loading Rank Math SEO Engine...</p>
              </div>
            ) : selectedItem && (currentNav === 'pages' || currentNav === 'posts') ? (
              <div className="space-y-4">
                {/* Breadcrumb back button */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    &larr; Back to Dashboard Overview
                  </button>

                  {/* Quick item switcher */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium">Switch item:</span>
                    <select
                      value={selectedItem.id}
                      onChange={(e) => {
                        const found = items.find((i) => i.id === e.target.value);
                        if (found) setSelectedItem(found);
                      }}
                      className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 font-medium text-xs max-w-xs truncate"
                    >
                      {items
                        .filter((i) => (currentNav === 'pages' ? i.type === 'page' : i.type === 'post'))
                        .map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title} ({item.seoScore}/100)
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <BlogEditor
                  item={selectedItem}
                  settings={settings}
                  onSave={handleUpdateItem}
                  onOpenAiImage={handleOpenAiStudio}
                />
              </div>
            ) : currentNav === 'overview' ? (
              <OverviewDashboard
                items={items}
                onSelectItem={(item) => {
                  setSelectedItem(item);
                  setCurrentNav(item.type === 'post' ? 'posts' : 'pages');
                }}
                onAddNewItem={handleAddNewItem}
                onDeleteItem={handleDeleteItem}
                onExportData={handleExportData}
                onImportData={handleImportData}
              />
            ) : currentNav === 'pages' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Page SEO Manager</h2>
                    <p className="text-xs text-gray-500">
                      Manage titles, meta descriptions, canonical URLs, and schema for existing static pages.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items
                    .filter((i) => i.type === 'page')
                    .map((page) => (
                      <div
                        key={page.id}
                        onClick={() => setSelectedItem(page)}
                        className="p-5 bg-white border border-gray-200 hover:border-indigo-400 rounded-xl shadow-xs cursor-pointer transition-all hover:shadow-md space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                            {page.schemaType}
                          </span>
                          <span className="font-bold text-sm text-indigo-600">{page.seoScore} / 100</span>
                        </div>

                        <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-2">{page.title}</h3>
                        <p className="text-xs text-gray-500 font-mono truncate">/{page.slug}</p>

                        <div className="text-xs text-gray-600 border-t border-gray-100 pt-2 flex items-center justify-between">
                          <span>
                            KW: <strong>{page.focusKeyword || 'None'}</strong>
                          </span>
                          <span className="text-indigo-600 font-semibold">Edit SEO &rarr;</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : currentNav === 'posts' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Blog Posts SEO Studio</h2>
                    <p className="text-xs text-gray-500">
                      Select a blog post to optimize with real-time Rank Math content analysis scoring.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items
                    .filter((i) => i.type === 'post')
                    .map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedItem(post)}
                        className="p-5 bg-white border border-gray-200 hover:border-indigo-400 rounded-xl shadow-xs cursor-pointer transition-all hover:shadow-md space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-800">
                            {post.status}
                          </span>
                          <span className="font-bold text-sm text-indigo-600">{post.seoScore} / 100</span>
                        </div>

                        <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-2">{post.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {post.seoDescription || post.content.replace(/<[^>]*>/g, '')}
                        </p>

                        <div className="text-xs text-gray-600 border-t border-gray-100 pt-2 flex items-center justify-between">
                          <span>
                            KW: <strong>{post.focusKeyword || 'None'}</strong>
                          </span>
                          <span className="text-indigo-600 font-semibold">Open Editor &rarr;</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : currentNav === 'ai-studio' ? (
              <AiImageStudio
                initialPrompt={aiImagePrompt}
                onApplyImage={(imgUrl) => {
                  if (selectedItem) {
                    setSelectedItem((prev) => (prev ? { ...prev, ogImage: imgUrl, twitterImage: imgUrl } : null));
                    setCurrentNav(selectedItem.type === 'post' ? 'posts' : 'pages');
                  }
                }}
              />
            ) : (
              <SettingsPage settings={settings} onSaveSettings={(newSettings) => saveAllState(items, newSettings)} />
            )}
          </main>
        </>
      )}
    </div>
  );
}
