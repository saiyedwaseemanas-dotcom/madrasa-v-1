import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: 'home' as ScreenType,
      label: 'الرئيسية',
      icon: 'home',
      badge: false,
    },
    {
      id: 'live-classes' as ScreenType,
      label: 'المباشر',
      icon: 'sensors',
      badge: true,
    },
    {
      id: 'recorded-library' as ScreenType,
      label: 'المسجلة',
      icon: 'video_library',
      badge: false,
    },
    {
      id: 'my-account' as ScreenType,
      label: 'حسابي',
      icon: 'person',
      badge: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_16px_rgba(11,37,69,0.06)]">
      <div className="h-20 max-w-2xl mx-auto px-margin-mobile flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-space-xs py-1 px-3 rounded-xl transition-all duration-200 group min-w-[64px] ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div
                className={`relative w-10 h-8 flex items-center justify-center rounded-full transition-all ${
                  isActive ? 'bg-primary-container/20 text-primary' : 'group-hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">{tab.icon}</span>
                {tab.badge && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-tertiary animate-pulse ring-1 ring-surface"></span>
                )}
              </div>
              <span className="font-label-md text-label-md text-center">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
