import React from 'react';
import { ScreenType } from '../types';
import { LOGO_URL, STUDENT_PROFILE } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenNotifications }) => {
  const getSubTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Home';
      case 'live-classes':
        return 'Live Classes';
      case 'recorded-library':
        return 'Recorded Library';
      case 'live-classroom':
        return 'Live Classroom Stream';
      case 'my-account':
        return 'حسابي ومسيرتي';
    }
  };

  const isLiveStream = currentScreen === 'live-classroom';

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-outline-variant/20">
      <div className="h-16 px-margin-mobile max-w-2xl mx-auto flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0">
          {isLiveStream ? (
            <button
              onClick={() => onNavigate('live-classes')}
              aria-label="العودة"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            </button>
          ) : null}

          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-space-sm cursor-pointer select-none min-w-0"
          >
            <img
              alt="Madrasti Live Logo"
              className="h-8 w-auto object-contain shrink-0"
              src={LOGO_URL}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">
                مدرستي لايف
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {getSubTitle()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs shrink-0">
          <button
            onClick={onOpenNotifications}
            aria-label="الإشعارات"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-tertiary ring-2 ring-surface"></span>
          </button>

          <button
            onClick={() => onNavigate('my-account')}
            aria-label="الملف الشخصي"
            className="p-0.5 rounded-full ring-2 ring-primary-container/30 hover:ring-primary transition-all active:scale-95 cursor-pointer"
          >
            <img
              alt={STUDENT_PROFILE.name}
              className="w-8 h-8 rounded-full object-cover"
              src={STUDENT_PROFILE.avatarUrl}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
