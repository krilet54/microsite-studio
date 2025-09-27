import React from 'react';

interface WhyInfoBoxProps {
  title: string;
  description: React.ReactNode;
  delayMs?: number;
  className?: string;
}

// Reusable styled informational box used across package pages for consistency
export const WhyInfoBox: React.FC<WhyInfoBoxProps> = ({ title, description, delayMs = 60, className = '' }) => {
  return (
    <div
      className={`max-w-3xl mx-auto mb-14 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 p-6 md:p-8 relative overflow-hidden fade-up-on-scroll ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(255,43,43,0.12),transparent_60%)] opacity-80" />
      <div className="relative">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h3>
        <div className="text-[13px] md:text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
};

export default WhyInfoBox;
