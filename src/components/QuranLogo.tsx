import React from 'react';
import logoImg from '../assets/images/abdullah_quran_logo_trimmed.png';

interface QuranLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  brandName?: string;
  subText?: string;
  variant?: 'light' | 'dark';
}

export const QuranLogoIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 60,
  className = '',
}) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative flex items-center justify-center shrink-0 overflow-hidden ${className}`}
    >
      <img
        src={logoImg}
        alt="Abdullah Quran Academy UK - Online Quran Academy"
        title="Abdullah Quran Academy UK"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export const QuranLogo: React.FC<QuranLogoProps> = ({
  className = '',
  size = 76,
  showText = false,
  layout = 'horizontal',
  brandName = 'Abdullah Quran Academy',
  subText = 'UK, 2026',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className={`p-2 rounded-2xl ${isDark ? 'bg-white/95 shadow-md' : 'bg-transparent'}`}>
          <img
            src={logoImg}
            alt="Abdullah Quran Academy UK - Certified 1-to-1 Quran Classes"
            title="Abdullah Quran Academy UK Logo"
            width={Math.round(size * 2)}
            height={Math.round(size * 1.3)}
            loading="eager"
            decoding="async"
            style={{ height: `${size * 1.3}px` }}
            className="w-auto max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Complete Emblem + Name + Country Logo Image */}
      <div className={`flex items-center justify-center transition-all ${isDark ? 'bg-white/95 p-1.5 sm:p-2 rounded-2xl shadow-xs' : 'bg-transparent'}`}>
        <img
          src={logoImg}
          alt={`${brandName || "Abdullah Quran Academy"} UK - Online Quran Academy`}
          title={`${brandName || "Abdullah Quran Academy"} UK - Online Quran Classes`}
          width={Math.round(size * 2)}
          height={size}
          loading="eager"
          decoding="async"
          style={{ height: `${size}px` }}
          className="w-auto max-h-[58px] xs:max-h-[68px] sm:max-h-[85px] md:max-h-[95px] object-contain drop-shadow-xs"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-serif font-bold text-lg sm:text-xl tracking-tight leading-tight ${
              isDark ? 'text-amber-300' : 'text-[#0a4227]'
            }`}
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            {brandName}
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] mt-0.5 ${
              isDark ? 'text-emerald-200' : 'text-[#0a4227]/80'
            }`}
          >
            {subText}
          </span>
        </div>
      )}
    </div>
  );
};
