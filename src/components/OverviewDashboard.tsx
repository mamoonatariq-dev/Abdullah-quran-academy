import React, { useState } from 'react';
import { SeoItem, ItemType } from '../types';
import { ScoreBadge } from './ScoreBadge';
import {
  Search,
  Plus,
  FileText,
  Globe,
  Download,
  Upload,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface OverviewDashboardProps {
  items: SeoItem[];
  onSelectItem: (item: SeoItem) => void;
  onAddNewItem: (type: ItemType, title: string, keyword: string) => void;
  onDeleteItem: (id: string) => void;
  onExportData: (format: 'json' | 'csv') => void;
  onImportData: (jsonStr: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  items,
  onSelectItem,
  onAddNewItem,
  onDeleteItem,
  onExportData,
  onImportData,
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'page' | 'post'>('all');
  const [filterScore, setFilterScore] = useState<'all' | 'good' | 'medium' | 'poor'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newType, setNewType] = useState<ItemType>('post');

  // Metrics
  const totalItems = items.length;
  const avgScore = totalItems > 0 ? Math.round(items.reduce((acc, i) => acc + i.seoScore, 0) / totalItems) : 0;
  const goodCount = items.filter((i) => i.seoScore >= 80).length;
  const needsWorkCount = items.filter((i) => i.seoScore < 80).length;

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.focusKeyword.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'all' || item.type === filterType;

    let matchesScore = true;
    if (filterScore === 'good') matchesScore = item.seoScore >= 80;
    else if (filterScore === 'medium') matchesScore = item.seoScore >= 50 && item.seoScore < 80;
    else if (filterScore === 'poor') matchesScore = item.seoScore < 50;

    return matchesSearch && matchesType && matchesScore;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    onAddNewItem(newType, newTitle, newKeyword);
    setNewTitle('');
    setNewKeyword('');
    setShowAddModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImportData(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pages & Posts</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{totalItems}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {items.filter((i) => i.type === 'page').length} Pages / {items.filter((i) => i.type === 'post').length} Posts
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Average SEO Score</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{avgScore} / 100</div>
          <div className="text-xs text-gray-500 mt-0.5">Across all website URLs</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">High SEO Performing (80+)</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{goodCount}</div>
          <div className="text-xs text-emerald-600 mt-0.5 font-medium">Rank Math Green Badge</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Needs SEO Fixes (&lt;80)</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{needsWorkCount}</div>
          <div className="text-xs text-amber-600 mt-0.5 font-medium">Optimization recommended</div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Add & Import/Export */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, keyword, or URL..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium"
          >
            <option value="all">All Content Types</option>
            <option value="page">Pages Only</option>
            <option value="post">Blog Posts Only</option>
          </select>

          {/* Score Filter */}
          <select
            value={filterScore}
            onChange={(e) => setFilterScore(e.target.value as any)}
            className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium"
          >
            <option value="all">All SEO Scores</option>
            <option value="good">Good (80+)</option>
            <option value="medium">Needs Improvement (50-79)</option>
            <option value="poor">Poor (&lt;50)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Export button */}
          <button
            type="button"
            onClick={() => onExportData('json')}
            className="px-3 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON
          </button>

          {/* Import button */}
          <label className="px-3 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" /> Import
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Add New Button */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Page / Post
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Focus Keyword</th>
                <th className="py-3 px-4">Rank Math Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No pages or posts match your current search/filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-gray-900 max-w-xs">
                      <div className="font-semibold text-sm line-clamp-1">{item.title}</div>
                      <div className="text-[11px] font-mono text-gray-500 truncate mt-0.5">/{item.slug}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-800">
                        {item.type === 'post' ? <FileText className="w-3 h-3 text-indigo-600" /> : <Globe className="w-3 h-3 text-emerald-600" />}
                        {item.type === 'post' ? 'Blog Post' : 'Page'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {item.focusKeyword ? (
                        <span className="font-medium text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded text-[11px]">
                          {item.focusKeyword}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic text-[11px]">Not set</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <ScoreBadge score={item.seoScore} size="sm" />
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-gray-500 text-[11px]">{item.lastUpdated || '2026-07-31'}</td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => onSelectItem(item)}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit SEO
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddSubmit} className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-gray-900">Add New Page or Blog Post</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Content Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="post"
                    checked={newType === 'post'}
                    onChange={() => setNewType('post')}
                  />
                  Blog Post
                </label>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="page"
                    checked={newType === 'page'}
                    onChange={() => setNewType('page')}
                  />
                  Page
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. 10 Mistakes to Avoid When Learning Tajweed"
                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Focus Keyword</label>
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="e.g. learn tajweed mistakes"
                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Create Draft
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
