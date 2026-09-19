import { useState } from 'react';
import { ScreenType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { NotificationModal } from './components/NotificationModal';
import { QuizModal } from './components/QuizModal';
import { HomeScreen } from './components/HomeScreen';
import { LiveClassesScreen } from './components/LiveClassesScreen';
import { RecordedLibraryScreen } from './components/RecordedLibraryScreen';
import { LiveClassroomScreen } from './components/LiveClassroomScreen';
import { MyAccountScreen } from './components/MyAccountScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedSubject, setSelectedSubject] = useState<string>('physics');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const showToast = (message: string, icon: string = 'check_circle') => {
    setToastMessage(message);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLiveStream = currentScreen === 'live-classroom';

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary">
      {/* Universal Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Main Content Area */}
      <main
        className={`flex flex-col relative w-full pt-16 min-h-screen bg-surface px-margin-mobile max-w-2xl mx-auto ${
          isLiveStream ? 'pb-8' : 'pb-28'
        }`}
      >
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onShowToast={showToast}
            onSelectSubject={(subj) => setSelectedSubject(subj)}
          />
        )}

        {currentScreen === 'live-classes' && (
          <LiveClassesScreen
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'recorded-library' && (
          <RecordedLibraryScreen
            selectedSubject={selectedSubject}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'live-classroom' && (
          <LiveClassroomScreen
            onNavigate={handleNavigate}
            onShowToast={showToast}
            onOpenQuiz={() => setShowQuiz(true)}
          />
        )}

        {currentScreen === 'my-account' && (
          <MyAccountScreen onShowToast={showToast} />
        )}
      </main>

      {/* Persistent Bottom Navigation (Hidden only during immersive live class if preferred, or persistent) */}
      {!isLiveStream && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
        />
      )}

      {/* Modals and Overlays */}
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onJoinLive={() => handleNavigate('live-classroom')}
      />

      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        onShowToast={showToast}
      />

      {/* Visual Toast Notification */}
      <Toast message={toastMessage} icon={toastIcon} />
    </div>
  );
}
