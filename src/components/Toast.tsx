import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div 
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-inverse-surface/95 text-inverse-on-surface shadow-xl flex items-center gap-2 transition-all duration-300 font-label-md text-label-md animate-bounce"
      style={{ animationDuration: '0.6s', animationIterationCount: '1' }}
    >
      <span className="material-symbols-outlined text-[18px] text-primary-fixed-dim">
        {icon}
      </span>
      <span>{message}</span>
    </div>
  );
};
