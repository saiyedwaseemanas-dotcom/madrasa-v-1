import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES, STUDENT_PROFILE } from '../data/mockData';

interface LiveClassroomScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onOpenQuiz: () => void;
}

export const LiveClassroomScreen: React.FC<LiveClassroomScreenProps> = ({
  onNavigate,
  onShowToast,
  onOpenQuiz,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [handRaised, setHandRaised] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'summary'>('chat');
  const [showRoster, setShowRoster] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(42 * 60 + 15);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Live stream elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll chat on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatStreamTimer = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = inputText.trim();
    if (!cleanText) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderName: STUDENT_PROFILE.name,
      senderInitials: 'أق',
      isSelf: true,
      time: timeStr,
      text: cleanText,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    onShowToast('تم إرسال رسالتك في المحادثة الحية', 'chat');

    // Simulate teacher response after 4 seconds
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `teacher-${Date.now()}`,
          senderName: 'أ. فهد السعيد',
          senderInitials: 'فس',
          isTeacher: true,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          text: 'أحسنت يا أحمد، سؤالك في محله تماماً! سنطبق عليه بالمسألة القادمة.',
        },
      ]);
    }, 4000);
  };

  const handleQuickReaction = (reactionText: string) => {
    setInputText((prev) => (prev ? `${prev} ${reactionText}` : reactionText));
  };

  const toggleHandRaise = () => {
    const next = !handRaised;
    setHandRaised(next);
    if (next) {
      onShowToast('تم رفع اليد ✋، سيتم تنبيه المعلم للإذن لك بالحديث', 'front_hand');
      // Add system announcement in chat
      setMessages((prev) => [
        ...prev,
        {
          id: `hand-${Date.now()}`,
          senderName: 'النظام',
          senderInitials: 'ن',
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          text: `✋ طلب ${STUDENT_PROFILE.name} التحدث صوتياً في الحصة`,
        },
      ]);
    } else {
      onShowToast('تم إنزال اليد', 'pan_tool');
    }
  };

  const toggleMic = () => {
    const next = !isMuted;
    setIsMuted(next);
    onShowToast(next ? 'تم كتم الميكروفون' : 'تم تشغيل الميكروفون المباشر 🎙️', next ? 'mic_off' : 'mic');
  };

  return (
    <div className="flex flex-col w-full pb-6 select-none" dir="rtl">
      {/* Top Video Stage (16:9 dominant viewport) */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-xl aspect-[16/9] mb-space-md border border-outline-variant/30">
        {/* Digital Whiteboard Presentation Canvas */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E2E] via-[#0D2A3F] to-[#04121E] flex flex-col justify-between p-3.5">
          {/* Ambient subtle grid watermark */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#60d7e5 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          ></div>

          {/* Live Stream Top Header Overlay */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Live Telemetry Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary shadow-md">
                <span className="w-2 h-2 rounded-full bg-surface-container-lowest animate-ping"></span>
                <span className="font-label-sm text-label-sm tracking-wide font-bold">مباشر</span>
                <span className="font-label-sm text-label-sm opacity-90 font-mono">
                  {formatStreamTimer(elapsedSeconds)}
                </span>
              </div>

              {/* Resolution Badge */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-inverse-surface/80 backdrop-blur text-inverse-on-surface">
                <span className="material-symbols-outlined text-[14px] text-primary-fixed-dim">hd</span>
                <span className="font-label-sm text-label-sm">1080p</span>
              </div>

              {/* Teacher Subject Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-inverse-surface/80 backdrop-blur text-inverse-on-surface">
                <span className="material-symbols-outlined text-[15px] text-primary-fixed">menu_book</span>
                <span className="font-label-sm text-label-sm truncate max-w-[140px]">
                  أ. فهد السعيد • الرياضيات
                </span>
              </div>
            </div>

            {/* Utility Overlays */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onShowToast('إعدادات الصوت والبث', 'tune')}
                aria-label="إعدادات الصوت"
                className="w-8 h-8 rounded-full bg-inverse-surface/70 hover:bg-inverse-surface backdrop-blur flex items-center justify-center text-inverse-on-surface transition-transform active:scale-90"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>

              <button
                onClick={() => onShowToast('تكبير شاشة القاعة التفاعلية', 'fullscreen')}
                aria-label="ملء الشاشة"
                className="w-8 h-8 rounded-full bg-inverse-surface/70 hover:bg-inverse-surface backdrop-blur flex items-center justify-center text-inverse-on-surface transition-transform active:scale-90"
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              </button>

              <button
                onClick={() => {
                  onShowToast('تمت مغادرة القاعة التفاعلية', 'logout');
                  onNavigate('live-classes');
                }}
                aria-label="مغادرة الحصة"
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-error text-on-error hover:bg-tertiary transition-transform active:scale-95 shadow-sm font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span className="font-label-sm text-label-sm hidden xs:inline">مغادرة</span>
              </button>
            </div>
          </div>

          {/* Main Slide / Mathematical Whiteboard Graphic Content */}
          <div className="relative z-0 my-auto flex flex-col items-center justify-center text-center px-4 py-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary-fixed mb-1">
              <span className="material-symbols-outlined text-[16px]">functions</span>
              <span className="font-label-sm text-label-sm font-semibold">
                الوحدة الرابعة: حساب التفاضل والتكامل
              </span>
            </div>
            <div className="font-headline-sm text-headline-sm text-surface-container-lowest font-mono tracking-wider dir-ltr text-center font-bold">
              lim<span className="text-xs">x→0</span> [sin(3x) / x] = 3
            </div>
            <p className="font-body-sm text-body-sm text-surface-variant/80 mt-0.5">
              نظرية نهاية الدوال الدائرية وتطبيقاتها في المسائل الوزارية
            </p>
          </div>

          {/* Bottom Audio Activity Indicator Bar */}
          <div className="relative z-10 flex items-center justify-between text-surface-variant text-[11px] pt-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-primary-fixed-dim animate-pulse">
                mic
              </span>
              <span className="font-label-sm text-label-sm text-primary-fixed-dim font-medium">
                المعلم يتحدث الآن...
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-2 rounded-full bg-primary-fixed animate-bounce"></span>
              <span
                className="w-1 h-3.5 rounded-full bg-primary-fixed animate-bounce"
                style={{ animationDelay: '0.15s' }}
              ></span>
              <span
                className="w-1 h-2 rounded-full bg-primary-fixed animate-bounce"
                style={{ animationDelay: '0.3s' }}
              ></span>
            </div>
          </div>
        </div>

        {/* Floating Picture-in-Picture Teacher Camera Feed */}
        <div
          onClick={() => onShowToast('كاميرا المعلم (أ. فهد السعيد) مباشرة', 'videocam')}
          className="absolute bottom-2.5 left-2.5 z-20 w-24 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-surface-container-highest transition-transform hover:scale-105 group cursor-pointer border border-white/20"
        >
          <img
            alt="Teacher PiP Camera"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA82Y9RYr__uwq-CYMzTLaxg_PL8TvXw5S6dbiIScUfUIb6tAvWoI5e85cL_4jyrTThsRqVGHw7l0XltF2RhhfPOGLOc0yBHgAMI-KKR86uuXo1NGmJAXIBHZf8TamZFabWye2bhFWos6TGkZoGxHv2B4U59GfhZD77T7LALY-Gvrn8FPyWfvR_i8UeKN8_o27isqPFkcfCTltEV9oUpQq2Saxa_nMd8P4eTEsmKFFQ4KC6JRmb17rPLg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-1.5">
            <span className="font-label-sm text-label-sm text-surface-container-lowest font-bold truncate">
              أ. فهد
            </span>
          </div>
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-primary-container"></div>
        </div>
      </section>

      {/* Interactive Classroom Control Ribbon */}
      <section className="grid grid-cols-4 gap-2 mb-space-md">
        {/* Raise Hand CTA */}
        <button
          onClick={toggleHandRaise}
          className={`group flex flex-col items-center justify-center p-2.5 rounded-xl shadow-sm hover:bg-surface-container transition-all active:scale-95 text-on-surface border border-outline-variant/20 ${
            handRaised ? 'bg-tertiary-fixed' : 'bg-surface-container-lowest'
          }`}
          id="btn-raise-hand"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${
              handRaised ? 'bg-tertiary text-on-tertiary' : 'bg-tertiary-fixed text-on-tertiary-fixed'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: handRaised ? "'FILL' 1" : "'FILL' 0" }}
            >
              back_hand
            </span>
          </div>
          <span className="font-label-sm text-label-sm font-bold text-center truncate w-full">
            {handRaised ? 'تم رفع اليد ✋' : 'رفع اليد ✋'}
          </span>
        </button>

        {/* Mute/Unmute Mic */}
        <button
          onClick={toggleMic}
          className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all active:scale-95 text-on-surface border border-outline-variant/20"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${
              isMuted
                ? 'bg-surface-container text-on-surface-variant'
                : 'bg-primary-container text-on-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </div>
          <span className="font-label-sm text-label-sm font-bold text-center truncate w-full">
            {isMuted ? 'كتم الصوت' : 'المايك متصل'}
          </span>
        </button>

        {/* Participants Count */}
        <button
          onClick={() => setShowRoster(true)}
          className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all active:scale-95 text-on-surface border border-outline-variant/20"
        >
          <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">groups</span>
          </div>
          <span className="font-label-sm text-label-sm font-bold text-center truncate w-full">
            الطلاب (٢٨٤)
          </span>
        </button>

        {/* Share Screen / Resources */}
        <button
          onClick={() => setShowShareModal(true)}
          className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all active:scale-95 text-on-surface border border-outline-variant/20"
        >
          <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">screen_share</span>
          </div>
          <span className="font-label-sm text-label-sm font-bold text-center truncate w-full">
            المشاركة
          </span>
        </button>
      </section>

      {/* Interactive Segment Tabs */}
      <div className="flex items-center bg-surface-container-low p-1 rounded-xl mb-space-sm">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'chat'
              ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>الدردشة الحية</span>
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
        </button>

        <button
          onClick={() => {
            setActiveTab('qa');
            onOpenQuiz();
          }}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'qa'
              ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">quiz</span>
          <span>الأسئلة والواجبات</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('summary');
            onShowToast('ملخص الحصة والملاحظات المكتوبة', 'folder_open');
          }}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'summary'
              ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">folder_open</span>
          <span>الملخص (٣)</span>
        </button>
      </div>

      {/* Live Stream Interaction Container */}
      <section className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm p-3.5 min-h-[360px] justify-between border border-outline-variant/20">
        {/* Notification Banner */}
        <div
          onClick={onOpenQuiz}
          className="flex items-center gap-2 p-2 rounded-xl bg-primary-container/10 text-on-primary-container mb-space-sm cursor-pointer hover:bg-primary-container/20 transition-colors border border-primary/20"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">campaign</span>
          <p className="font-body-sm text-body-sm flex-1 font-medium">
            تنبيه: سيتم إطلاق الاختبار القصير التفاعلي بعد ٥ دقائق. اضغط هنا للمعاينة!
          </p>
          <span className="material-symbols-outlined text-primary text-[18px]">arrow_back</span>
        </div>

        {/* Live Stream Chat Stream */}
        <div
          ref={chatScrollRef}
          className="flex flex-col gap-2.5 overflow-y-auto max-h-[280px] pr-0.5 mb-3 no-scrollbar"
        >
          {messages.map((msg) => {
            if (msg.senderName === 'النظام') {
              return (
                <div key={msg.id} className="flex items-center justify-center my-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm animate-pulse">
                    <span className="material-symbols-outlined text-[16px]">back_hand</span>
                    <span>{msg.text}</span>
                  </div>
                </div>
              );
            }

            if (msg.isTeacher) {
              return (
                <div key={msg.id} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                  </div>
                  <div className="flex flex-col max-w-[88%] bg-primary/10 p-2.5 rounded-2xl rounded-tr-none border border-primary/20">
                    <div className="flex items-center justify-between gap-3 mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-md text-label-md font-bold text-primary">
                          {msg.senderName}
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
                          معلم الحصة
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary">{msg.time}</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface font-medium">{msg.text}</p>
                  </div>
                </div>
              );
            }

            if (msg.isSelf) {
              return (
                <div key={msg.id} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center shrink-0 font-label-md text-label-md font-bold">
                    أنا
                  </div>
                  <div className="flex flex-col max-w-[85%] bg-secondary-fixed/30 p-2.5 rounded-2xl rounded-tr-none border border-secondary/20">
                    <div className="flex items-center justify-between gap-3 mb-0.5">
                      <span className="font-label-md text-label-md font-bold text-primary">
                        أنت (طالب)
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">{msg.time}</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface">{msg.text}</p>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 font-label-md text-label-md font-bold">
                  {msg.senderInitials}
                </div>
                <div className="flex flex-col max-w-[85%] bg-surface-container-low p-2.5 rounded-2xl rounded-tr-none">
                  <div className="flex items-center justify-between gap-3 mb-0.5">
                    <span className="font-label-md text-label-md font-semibold text-secondary">
                      {msg.senderName}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">{msg.time}</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Interactive Input Toolbar */}
        <div className="pt-2 border-t border-outline-variant/20">
          {/* Quick Reaction Emojis */}
          <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1 no-scrollbar">
            {['👍 فهمت', '✋ لدي استفسار', '👏 رائع', '💡 فكرة'].map((rx) => (
              <button
                key={rx}
                onClick={() => handleQuickReaction(rx)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-body-sm font-label-sm transition-transform active:scale-90"
                type="button"
              >
                {rx}
              </button>
            ))}
          </div>

          {/* Form Field */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 bg-surface-container-low rounded-xl p-1.5 border border-outline-variant/30"
          >
            <button
              onClick={() => handleQuickReaction('🌟')}
              aria-label="الرموز التعبيرية"
              className="w-9 h-9 rounded-lg hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">sentiment_satisfied</span>
            </button>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              autoComplete="off"
              className="flex-1 bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline px-1"
              placeholder="اسأل المعلم سؤالاً أو شارك إجابتك..."
              type="text"
            />
            <button
              aria-label="إرسال"
              className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center transition-all hover:bg-primary-container active:scale-95 shadow-sm"
              type="submit"
            >
              <span className="material-symbols-outlined text-[20px] transform -rotate-180">send</span>
            </button>
          </form>
        </div>
      </section>

      {/* Roster Modal */}
      {showRoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline-sm text-[16px] text-on-surface font-bold">
                قائمة الحضور (٢٨٤ طالباً)
              </span>
              <button
                onClick={() => setShowRoster(false)}
                className="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10">
                <span className="font-label-md text-label-md font-bold text-primary">
                  أ. فهد السعيد (معلم الحصة)
                </span>
                <span className="material-symbols-outlined text-[16px] text-primary">mic</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-label-md text-label-md text-on-surface">
                  {STUDENT_PROFILE.name} (أنت)
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  {isMuted ? 'مكتوم' : 'متصل'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-label-md text-label-md text-on-surface">سارة محمد</span>
                <span className="text-outline font-label-sm text-[10px]">مستمع</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-label-md text-label-md text-on-surface">عمر خالد</span>
                <span className="text-tertiary font-label-sm text-[10px] font-bold">رافع اليد ✋</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-label-md text-label-md text-on-surface">ريان الغامدي</span>
                <span className="text-outline font-label-sm text-[10px]">مستمع</span>
              </div>
            </div>
            <button
              onClick={() => setShowRoster(false)}
              className="mt-1 w-full py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Share Screen Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline-sm text-[16px] text-on-surface font-bold">
                مشاركة الموارد مع القاعة
              </span>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowShareModal(false);
                  onShowToast('تم نسخ رابط القاعة التفاعلية للمشاركة', 'link');
                }}
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center gap-2 text-right"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">share</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    نسخ رابط دعوة الزملاء
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">
                    انضمام فوري للقاعة برمز الصف
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowShareModal(false);
                  onShowToast('طلب مشاركة الشاشة في انتظار موافقة المعلم', 'screen_share');
                }}
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center gap-2 text-right"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">cast</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    طلب بث الشاشة إلى السبورة
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">
                    عرض حلول التمارين أمام الطلاب
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
