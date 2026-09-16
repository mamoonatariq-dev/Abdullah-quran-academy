import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { AppSettings } from '../types';

interface SerpPreviewProps {
  seoTitle: string;
  seoDescription: string;
  url: string;
  brandName?: string;
  titleSeparator?: string;
}

export const SerpPreview: React.FC<SerpPreviewProps> = ({
  seoTitle,
  seoDescription,
  url,
  brandName = 'Abdullah Quran Academy UK',
  titleSeparator = '|',
}) => {
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');

  const fullTitle = seoTitle
    ? `${seoTitle} ${titleSeparator} ${brandName}`
    : `Page Title ${titleSeparator} ${brandName}`;

  const cleanUrl = url || 'https://mywebsite.com/page-slug';

  // Google truncation rules
  // Desktop title truncated around 60 chars
  const displayTitle = fullTitle.length > 60 ? fullTitle.substring(0, 58) + '...' : fullTitle;
  
  // Meta description truncated around 155-160 chars
  const displayDesc = seoDescription
    ? seoDescription.length > 160
      ? seoDescription.substring(0, 157) + '...'
      : seoDescription
    : 'Please enter a meta description to see how your page snippet will appear in Google search results...';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Google SERP Snippet Preview</h4>
          <p className="text-xs text-gray-500">Live search engine result preview</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'desktop' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            type="button"
            onClick={() => setMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'mobile' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>
      </div>

      {mode === 'desktop' ? (
        <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-100 font-sans max-w-2xl">
          <div className="flex items-center gap-2 mb-1 text-xs text-gray-700">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
              G
            </div>
            <span className="font-normal text-gray-900 truncate">{brandName}</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600 truncate">{cleanUrl}</span>
          </div>

          <h3 className="text-xl font-normal text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 truncate">
            {displayTitle}
          </h3>

          <p className="text-sm text-[#4d5156] leading-snug line-clamp-2">
            {displayDesc}
          </p>
        </div>
      ) : (
        <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-100 font-sans max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-1 text-xs">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              G
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-xs leading-none">{brandName}</span>
              <span className="text-[11px] text-gray-500 truncate max-w-[200px]">{cleanUrl}</span>
            </div>
          </div>

          <h3 className="text-base font-medium text-[#1a0dab] leading-snug mb-1">
            {displayTitle}
          </h3>

          <p className="text-xs text-[#4d5156] leading-relaxed">
            {displayDesc}
          </p>
        </div>
      )}
    </div>
  );
};
