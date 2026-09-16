import React, { useState } from 'react';
import { SeoAnalysisResult, CheckItem } from '../types';
import { ScoreBadge } from './ScoreBadge';
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, Search, Eye, Sparkles } from 'lucide-react';

interface RankMathSidebarProps {
  analysis: SeoAnalysisResult;
  onJumpToCheck?: (targetField?: string) => void;
}

export const RankMathSidebar: React.FC<RankMathSidebarProps> = ({ analysis, onJumpToCheck }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'readability' | 'additional'>('basic');
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);

  const basicChecks = analysis.checks.filter((c) => c.category === 'basic');
  const readabilityChecks = analysis.checks.filter((c) => c.category === 'readability');
  const additionalChecks = analysis.checks.filter((c) => c.category === 'additional');

  const currentChecks =
    activeTab === 'basic' ? basicChecks : activeTab === 'readability' ? readabilityChecks : additionalChecks;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-full">
      {/* Header with Rank Math Score */}
      <div className="p-4 border-b border-gray-100 bg-linear-to-b from-gray-50/80 to-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> Content SEO Analysis
          </h3>
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Rank Math Engine</span>
        </div>

        {/* Big Score Card */}
        <ScoreBadge score={analysis.score} size="lg" />

        {/* Metrics Quick Strip */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-center">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-[10px] text-gray-500 font-medium">Word Count</div>
            <div className="text-sm font-bold text-gray-900">{analysis.wordCount}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-[10px] text-gray-500 font-medium">KW Density</div>
            <div className="text-sm font-bold text-gray-900">{analysis.keywordDensity}%</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-[10px] text-gray-500 font-medium">KW Count</div>
            <div className="text-sm font-bold text-gray-900">{analysis.keywordCount}x</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50/50">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex-1 py-2.5 px-2 text-xs font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'basic'
              ? 'border-indigo-600 text-indigo-900 bg-white'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Basic ({analysis.basicPassedCount}/{analysis.basicTotalCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('readability')}
          className={`flex-1 py-2.5 px-2 text-xs font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'readability'
              ? 'border-indigo-600 text-indigo-900 bg-white'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Readability ({analysis.readabilityPassedCount}/{analysis.readabilityTotalCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('additional')}
          className={`flex-1 py-2.5 px-2 text-xs font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'additional'
              ? 'border-indigo-600 text-indigo-900 bg-white'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Additional ({analysis.additionalPassedCount}/{analysis.additionalTotalCount})
        </button>
      </div>

      {/* Check Items List */}
      <div className="p-3 overflow-y-auto space-y-2 flex-1">
        {currentChecks.map((check) => {
          const isExpanded = expandedCheck === check.id;

          return (
            <div
              key={check.id}
              className={`border rounded-lg transition-all ${
                check.passed
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : check.warning
                  ? 'border-amber-200 bg-amber-50/30'
                  : 'border-red-200 bg-red-50/30'
              }`}
            >
              <div
                onClick={() => setExpandedCheck(isExpanded ? null : check.id)}
                className="p-2.5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : check.warning ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span className="text-xs font-medium text-gray-900">{check.label}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-400">
                  {onJumpToCheck && (
                    <button
                      type="button"
                      title="Jump to field"
                      onClick={(e) => {
                        e.stopPropagation();
                        onJumpToCheck(check.targetField);
                      }}
                      className="p-1 hover:text-indigo-600 rounded hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-200/60 text-xs text-gray-700 space-y-2">
                  <p>{check.details}</p>
                  {onJumpToCheck && (
                    <button
                      type="button"
                      onClick={() => onJumpToCheck(check.targetField)}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-1"
                    >
                      Fix or Edit Field &rarr;
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
