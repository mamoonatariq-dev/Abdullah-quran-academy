import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, size = 'md', showLabel = true }) => {
  let colorBg = 'bg-red-50 text-red-700 border-red-200';
  let badgeRing = 'text-red-600';
  let statusText = 'Poor';

  if (score >= 80) {
    colorBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    badgeRing = 'text-emerald-600';
    statusText = 'Good';
  } else if (score >= 50) {
    colorBg = 'bg-amber-50 text-amber-800 border-amber-200';
    badgeRing = 'text-amber-600';
    statusText = 'Needs Work';
  }

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorBg}`}>
        <span className={`w-2 h-2 rounded-full ${score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} />
        {score}/100
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`p-4 rounded-xl border ${colorBg} flex items-center gap-4`}>
        <div className="relative w-16 h-16 flex items-center justify-center font-bold text-xl">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={badgeRing}
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute">{score}</span>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-gray-500">SEO Score</div>
          <div className="text-lg font-bold">{statusText}</div>
          <div className="text-xs text-gray-600">Rank Math Analysis</div>
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold border ${colorBg}`}>
      <span className="font-bold">{score}</span>
      {showLabel && <span className="text-xs font-normal opacity-80">/ 100</span>}
    </span>
  );
};
