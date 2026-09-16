import React from 'react';
import { SitemapItem } from '../types';
import { Link2, Sparkles, Plus, Check } from 'lucide-react';

interface InternalLinkHelperProps {
  content: string;
  sitemapList: SitemapItem[];
  onInsertLink: (phraseToReplace: string, targetUrl: string, anchorText: string) => void;
}

export const InternalLinkHelper: React.FC<InternalLinkHelperProps> = ({
  content,
  sitemapList,
  onInsertLink,
}) => {
  const lowerContent = content.toLowerCase();

  // Find candidate matches in content from stored sitemap list
  const suggestions: Array<{
    sitemapItem: SitemapItem;
    matchedKeyword: string;
    alreadyLinked: boolean;
  }> = [];

  sitemapList.forEach((item) => {
    item.keywords.forEach((kw) => {
      if (kw && lowerContent.includes(kw.toLowerCase())) {
        // Check if keyword is already inside an <a> tag in content
        const linkRegex = new RegExp(`<a\\s+[^>]*>.*?${kw}.*?<\\/a>`, 'gi');
        const alreadyLinked = linkRegex.test(content);

        suggestions.push({
          sitemapItem: item,
          matchedKeyword: kw,
          alreadyLinked,
        });
      }
    });
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Link2 className="w-4 h-4 text-indigo-600" /> Internal Linking Assistant
        </h4>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
          {suggestions.length} Suggested
        </span>
      </div>

      {suggestions.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-xs text-gray-500">
            No matching sitemap keywords detected in current draft yet.
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Write content about topics in your Sitemap Settings to unlock 1-click internal link suggestions.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {suggestions.map((sug, idx) => (
            <div
              key={`${sug.sitemapItem.id}-${sug.matchedKeyword}-${idx}`}
              className="p-2.5 rounded-lg border border-gray-200/90 hover:border-indigo-300 bg-gray-50/60 hover:bg-indigo-50/30 transition-all flex items-start justify-between gap-3 text-xs"
            >
              <div>
                <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <span className="bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded text-[11px]">
                    "{sug.matchedKeyword}"
                  </span>
                  {sug.alreadyLinked && (
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Already linked
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-600 mt-1 font-medium truncate max-w-xs">
                  Target: {sug.sitemapItem.title}
                </div>
                <div className="text-[10px] text-gray-400 truncate max-w-xs">{sug.sitemapItem.url}</div>
              </div>

              <button
                type="button"
                disabled={sug.alreadyLinked}
                onClick={() => onInsertLink(sug.matchedKeyword, sug.sitemapItem.url, sug.matchedKeyword)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 shrink-0 transition-all ${
                  sug.alreadyLinked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                }`}
              >
                <Plus className="w-3 h-3" /> {sug.alreadyLinked ? 'Linked' : 'Insert Link'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
