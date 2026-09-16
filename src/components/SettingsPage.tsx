import React, { useState } from 'react';
import { AppSettings, SitemapItem } from '../types';
import { Save, Plus, Trash2, Link2, Sliders, Check } from 'lucide-react';

interface SettingsPageProps {
  settings: AppSettings;
  onSaveSettings: (updatedSettings: AppSettings) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<AppSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sitemap management state
  const [newSmTitle, setNewSmTitle] = useState('');
  const [newSmUrl, setNewSmUrl] = useState('');
  const [newSmKeywords, setNewSmKeywords] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddSitemapItem = () => {
    if (!newSmTitle || !newSmUrl) return;

    const keywordsArray = newSmKeywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const newItem: SitemapItem = {
      id: `sm-${Date.now()}`,
      title: newSmTitle,
      url: newSmUrl,
      keywords: keywordsArray,
    };

    setFormData((prev) => ({
      ...prev,
      sitemapList: [...prev.sitemapList, newItem],
    }));

    setNewSmTitle('');
    setNewSmUrl('');
    setNewSmKeywords('');
  };

  const handleDeleteSitemapItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sitemapList: prev.sitemapList.filter((item) => item.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {/* Save Strip */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Global SEO Settings</h2>
          <p className="text-xs text-gray-500">Configure global title formats, brand tags, target keyword density, and internal linking sitemap.</p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {savedSuccess ? 'Settings Saved ✓' : 'Save Settings'}
        </button>
      </div>

      {/* Brand & Separator Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" /> Title Formatting & Brand
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Title Separator Symbol
            </label>
            <select
              value={formData.titleSeparator}
              onChange={(e) => setFormData((prev) => ({ ...prev, titleSeparator: e.target.value }))}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg font-mono font-bold"
            >
              <option value="|">| (Pipe)</option>
              <option value="-">- (Hyphen)</option>
              <option value="–">– (En Dash)</option>
              <option value="•">• (Bullet)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Brand Name (Auto-appended to titles)
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData((prev) => ({ ...prev, brandName: e.target.value }))}
              placeholder="e.g. Abdullah Quran Academy UK"
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg font-medium"
            />
          </div>
        </div>
      </div>

      {/* Target Keyword Density Range */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900">Keyword Density Target Range</h3>
        <p className="text-xs text-gray-500">
          Rank Math defaults to 1.0% – 1.5% target keyword density for optimal search engine scoring.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Minimum Target Density (%)</label>
            <input
              type="number"
              step="0.1"
              value={formData.targetDensityMin}
              onChange={(e) => setFormData((prev) => ({ ...prev, targetDensityMin: parseFloat(e.target.value) || 1.0 }))}
              className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Maximum Target Density (%)</label>
            <input
              type="number"
              step="0.1"
              value={formData.targetDensityMax}
              onChange={(e) => setFormData((prev) => ({ ...prev, targetDensityMax: parseFloat(e.target.value) || 1.5 }))}
              className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Sitemap Manager for Internal Link Suggestions */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-indigo-600" /> Internal Linking Sitemap Manager
            </h3>
            <p className="text-xs text-gray-500">
              List published URLs and their focus keywords to enable 1-click internal link suggestions in the blog editor.
            </p>
          </div>
        </div>

        {/* Add Sitemap Item Box */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
          <div className="text-xs font-bold text-gray-800">Add New Sitemap Item</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={newSmTitle}
              onChange={(e) => setNewSmTitle(e.target.value)}
              placeholder="Page Title"
              className="text-xs p-2 bg-white border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newSmUrl}
              onChange={(e) => setNewSmUrl(e.target.value)}
              placeholder="https://site.com/url"
              className="text-xs p-2 bg-white border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newSmKeywords}
              onChange={(e) => setNewSmKeywords(e.target.value)}
              placeholder="Keywords (comma separated)"
              className="text-xs p-2 bg-white border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleAddSitemapItem}
            className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add to Sitemap
          </button>
        </div>

        {/* List of Sitemap items */}
        <div className="space-y-2">
          {formData.sitemapList.map((item) => (
            <div key={item.id} className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-semibold text-gray-900">{item.title}</div>
                <div className="text-gray-500 text-[11px] font-mono">{item.url}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.keywords.map((kw, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] rounded">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteSitemapItem(item.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
