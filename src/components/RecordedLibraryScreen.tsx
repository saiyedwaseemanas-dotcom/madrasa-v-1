import React, { useState, useEffect } from 'react';
import { KEPLER_LESSON_DATA } from '../data/mockData';

interface RecordedLibraryScreenProps {
  selectedSubject?: string;
  onShowToast: (msg: string, icon?: string) => void;
}

export const RecordedLibraryScreen: React.FC<RecordedLibraryScreenProps> = ({
  selectedSubject = 'physics',
  onShowToast,
}) => {
  const [activeSubject, setActiveSubject] = useState(selectedSubject);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(KEPLER_LESSON_DATA.initialSeconds);
  const [currentSpeed, setCurrentSpeed] = useState('1.25x');
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('1080p HD');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'pdf' | 'qa'>('overview');
  const [noteText, setNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [questions, setQuestions] = useState(KEPLER_LESSON_DATA.qaList);

  const totalDurationSec = KEPLER_LESSON_DATA.totalSeconds;

  // Auto increment simulated video time when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return totalDurationSec;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDurationSec]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.round((currentTimeSec / totalDurationSec) * 100));

  const togglePlay = () => {
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    onShowToast(nextPlay ? 'جارٍ تشغيل الدرس...' : 'تم إيقاف الدرس مؤقتاً', nextPlay ? 'play_circle' : 'pause_circle');
  };

  const cycleSpeed = () => {
    const speeds = ['1x', '1.25x', '1.5x', '2x'];
    const idx = (speeds.indexOf(currentSpeed) + 1) % speeds.length;
    setCurrentSpeed(speeds[idx]);
    onShowToast(`تم تغيير سرعة العرض إلى ${speeds[idx]}`, 'speed');
  };

  const cycleQuality = () => {
    const qualities = ['1080p HD', '720p', '480p'];
    const idx = (qualities.indexOf(quality) + 1) % qualities.length;
    setQuality(qualities[idx]);
    onShowToast(`جودة البث: ${qualities[idx]}`, 'hd');
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // In RTL, right edge is start (0%)
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratioFromRight = 1 - clickX / width;
    const boundedRatio = Math.max(0, Math.min(1, ratioFromRight));
    const targetSec = Math.round(boundedRatio * totalDurationSec);
    setCurrentTimeSec(targetSec);
    onShowToast(`الانتقال إلى: ${formatTime(targetSec)}`, 'fast_forward');
  };

  const handleJumpToTimestamp = (sec: number, display: string) => {
    setCurrentTimeSec(sec);
    onShowToast(`الانتقال إلى الفصل: ${display}`, 'fast_forward');
  };

  const handleFavoriteToggle = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    onShowToast(next ? 'تمت إضافة الدرس إلى المفضلة ⭐' : 'تمت الإزالة من المفضلة');
  };

  const handleBookmarkToggle = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    onShowToast(next ? 'تم حفظ العلامة المرجعية 🔖' : 'تم حذف العلامة المرجعية');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('تم نسخ رابط الدرس المباشر إلى الحافظة! 🔗', 'link');
  };

  const handleDownload = () => {
    onShowToast('بدأ تحميل الدرس بجودة 1080p للمشاهدة بدون إنترنت ⬇️', 'download_for_offline');
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    const newQ = {
      id: `q-${Date.now()}`,
      studentName: 'أحمد القحطاني',
      studentInitials: 'أ',
      timestamp: `عند ${formatTime(currentTimeSec)}`,
      ago: 'الآن',
      question: newQuestionText.trim(),
    };
    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    setShowQuestionInput(false);
    onShowToast('تم إرسال استفسارك للمعلم بنجاح! 💬', 'send');
  };

  const filterTabs = [
    { id: 'all', label: 'الكل' },
    { id: 'math', label: 'رياضيات' },
    { id: 'physics', label: 'فيزياء' },
    { id: 'chemistry', label: 'كيمياء' },
    { id: 'biology', label: 'أحياء' },
    { id: 'arabic', label: 'لغة عربية' },
  ];

  return (
    <div className="flex flex-col w-full gap-space-md">
      {/* Search & Category Filters */}
      <section className="flex flex-col gap-space-sm">
        <div className="relative w-full">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pr-11 pl-10 rounded-xl bg-surface-container-lowest shadow-sm text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-outline-variant/20"
            placeholder="ابحث عن درس، وحدة، أو معلم..."
            type="text"
          />
          <button
            onClick={() => onShowToast('تصفية الدروس المسجلة', 'tune')}
            aria-label="تصفية البحث"
            className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Subject Filter Chips Horizontal Scroller */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-1.5 -mx-margin-mobile px-margin-mobile no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeSubject === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubject(tab.id);
                  onShowToast(`تصفية حسب: ${tab.label}`, 'filter_list');
                }}
                className={`shrink-0 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all shadow-sm ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Video Player Container */}
      <section className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden transition-all duration-300 border border-outline-variant/20">
        {/* Video Canvas / Frame */}
        <div className="relative w-full aspect-video bg-inverse-surface rounded-t-2xl overflow-hidden group select-none">
          <img
            alt="Simulation Kepler Orbits"
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'opacity-95 scale-102' : 'opacity-85 group-hover:scale-105'
            }`}
            src={KEPLER_LESSON_DATA.coverImage}
          />

          {/* Gradient Scrim for Controls Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent"></div>

          {/* Top Badges & Indicators */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm">
              <span className={`w-2 h-2 rounded-full bg-primary-fixed-dim ${isPlaying ? 'animate-ping' : ''}`}></span>
              تسجيل فائق الدقة
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={cycleQuality}
                className="px-2 py-0.5 rounded-lg bg-inverse-surface/75 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm active:scale-95 transition-transform"
              >
                {quality}
              </button>
              <button
                onClick={handleBookmarkToggle}
                aria-label="حفظ كعلامة مرجعية"
                className={`w-7 h-7 rounded-full bg-inverse-surface/75 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 ${
                  isBookmarked ? 'text-amber-400' : 'text-inverse-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>
            </div>
          </div>

          {/* Center Big Play Button */}
          <button
            onClick={togglePlay}
            aria-label="تشغيل أو إيقاف الدرس"
            className={`absolute inset-0 m-auto w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg shadow-primary-container/30 hover:scale-110 active:scale-95 transition-all ${
              isPlaying ? 'scale-90 opacity-70 hover:opacity-100' : ''
            }`}
          >
            <span
              className="material-symbols-outlined text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Video Control Bar Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col gap-2 bg-gradient-to-t from-inverse-surface via-inverse-surface/80 to-transparent">
            {/* Scrubbing Progress Bar (RTL click aware) */}
            <div
              onClick={handleSeek}
              className="relative w-full flex items-center group/bar cursor-pointer py-1"
            >
              <div className="w-full h-1.5 bg-surface-variant/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full relative transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              {/* Seek Handle Indicator */}
              <div
                className="absolute -mr-1.5 w-3 h-3 rounded-full bg-surface-container-lowest shadow-md ring-2 ring-primary-container transition-transform scale-100 group-hover/bar:scale-125"
                style={{ right: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-inverse-on-surface font-label-md text-label-md pt-0.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-7 h-7 flex items-center justify-center text-inverse-on-surface hover:text-primary-fixed-dim transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex items-center gap-1 font-mono tracking-tight font-label-sm text-label-sm text-inverse-on-surface/90">
                  <span>{formatTime(currentTimeSec)}</span>
                  <span className="text-inverse-on-surface/50">/</span>
                  <span>{KEPLER_LESSON_DATA.durationTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Speed Selector Pill Toggle */}
                <button
                  onClick={cycleSpeed}
                  className="px-2 py-0.5 rounded-full bg-surface-variant/30 text-inverse-on-surface font-label-sm text-label-sm hover:bg-surface-variant/50 transition-colors"
                >
                  <span>{currentSpeed}</span>
                </button>

                {/* Audio Indicator */}
                <button
                  onClick={() => {
                    const nextMute = !isMuted;
                    setIsMuted(nextMute);
                    onShowToast(nextMute ? 'تم كتم الصوت' : 'تم تفعيل الصوت', nextMute ? 'volume_off' : 'volume_up');
                  }}
                  className="w-7 h-7 flex items-center justify-center text-inverse-on-surface hover:text-primary-fixed-dim transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isMuted ? 'volume_off' : 'volume_up'}
                  </span>
                </button>

                {/* Fullscreen Action */}
                <button
                  onClick={() => onShowToast('وضع ملء الشاشة', 'fullscreen')}
                  aria-label="ملء الشاشة"
                  className="w-7 h-7 flex items-center justify-center text-inverse-on-surface hover:text-primary-fixed-dim transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata & Instructor Details */}
        <div className="p-space-md flex flex-col gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                {KEPLER_LESSON_DATA.category}
              </span>
              <span className="text-outline font-label-sm text-label-sm">•</span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                {KEPLER_LESSON_DATA.grade}
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface leading-snug font-bold">
              {KEPLER_LESSON_DATA.title}
            </h1>
          </div>

          {/* Instructor Card Strip */}
          <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl">
            <div className="flex items-center gap-space-sm">
              <div className="relative">
                <img
                  alt={KEPLER_LESSON_DATA.teacher.name}
                  className="w-11 h-11 rounded-full object-cover"
                  src={KEPLER_LESSON_DATA.teacher.avatarUrl}
                />
                <span className="absolute -bottom-0.5 -left-0.5 w-4 h-4 bg-primary text-on-primary rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[11px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">
                    {KEPLER_LESSON_DATA.teacher.name}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">
                    معلم معتمد
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {KEPLER_LESSON_DATA.teacher.title} • {KEPLER_LESSON_DATA.teacher.experience}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const nextFollow = !isFollowing;
                setIsFollowing(nextFollow);
                onShowToast(
                  nextFollow ? `تمت متابعة ${KEPLER_LESSON_DATA.teacher.name} ✓` : 'تم إلغاء المتابعة',
                  'person_check'
                );
              }}
              className={`px-3 py-1.5 rounded-lg shadow-sm font-label-md text-label-md active:scale-95 transition-all flex items-center gap-1 ${
                isFollowing
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isFollowing ? 'check' : 'add'}
              </span>
              {isFollowing ? 'متابع ✓' : 'متابعة'}
            </button>
          </div>

          {/* Quick Action Buttons Strip */}
          <div className="grid grid-cols-3 gap-space-xs">
            <button
              onClick={handleDownload}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px] text-primary mb-1">
                download_for_offline
              </span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                تحميل الدرس
              </span>
              <span className="font-label-sm text-[9px] text-outline">مشاهدة دون نت</span>
            </button>

            <button
              onClick={handleFavoriteToggle}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant active:scale-95 transition-all"
            >
              <span
                className={`material-symbols-outlined text-[20px] mb-1 transition-transform ${
                  isFavorite ? 'text-amber-500 scale-110' : 'text-outline'
                }`}
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                star
              </span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                {isFavorite ? 'في المفضلة' : 'حفظ بالمفضلة'}
              </span>
              <span className="font-label-sm text-[9px] text-outline">إضافة للقوائم</span>
            </button>

            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary mb-1">share</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                مشاركة الدرس
              </span>
              <span className="font-label-sm text-[9px] text-outline">نسخ الرابط</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Tabs (Segmented Container) */}
      <section className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/20">
        <div className="flex items-center bg-surface-container-low p-1 rounded-t-2xl gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 px-2 text-center rounded-xl font-label-md text-label-md transition-all ${
              activeTab === 'overview'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            نظرة عامة والملاحظات
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex-1 py-2.5 px-2 text-center rounded-xl font-label-md text-label-md transition-all ${
              activeTab === 'pdf'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            ملف PDF الملخص
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-2.5 px-2 text-center rounded-xl font-label-md text-label-md transition-all flex items-center justify-center gap-1 ${
              activeTab === 'qa'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>الأسئلة</span>
            <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
              {questions.length + 46}
            </span>
          </button>
        </div>

        {/* Tab Panels Container */}
        <div className="p-space-md">
          {/* Panel 1: Overview & Notes */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <h2 className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
                  ماذا ستتعلم في هذا المقطع:
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {KEPLER_LESSON_DATA.description}
                </p>
              </div>

              {/* Smart Timestamps Bar */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  فصول الفيديو والتوقيتات:
                </span>
                <div className="flex flex-col gap-1.5">
                  {KEPLER_LESSON_DATA.chapters.map((chap) => {
                    const isNearby = Math.abs(currentTimeSec - chap.seconds) < 60;
                    return (
                      <button
                        key={chap.id}
                        onClick={() => handleJumpToTimestamp(chap.seconds, chap.timeDisplay)}
                        className={`flex items-center justify-between p-2 rounded-lg text-right transition-colors ${
                          isNearby
                            ? 'bg-primary/15 text-primary font-bold'
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <span className="font-body-sm text-body-sm font-medium">{chap.title}</span>
                        <span className="font-mono font-label-sm text-label-sm text-primary font-bold">
                          {chap.timeDisplay}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Student Personal Note Box */}
              <div className="flex flex-col gap-2 p-space-sm bg-surface-container-low rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px] text-primary">edit_note</span>
                    ملاحظتك الشخصية عند ({formatTime(currentTimeSec)})
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">تلقائي الحفظ</span>
                </div>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onBlur={() => {
                    if (noteText.trim()) {
                      onShowToast('تم حفظ ملاحظتك الشخصية بنجاح 📝', 'save');
                    }
                  }}
                  className="w-full p-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-body-sm font-body-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary shadow-xs border border-outline-variant/20"
                  placeholder="اكتب فكرة أو سؤالاً لتتذكره أثناء مراجعة الاختبار..."
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Panel 2: PDF Summary Document */}
          {activeTab === 'pdf' && (
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-space-sm">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[28px]">picture_as_pdf</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      ملخص قوانين كبلر - د. عمر.pdf
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      14 صفحة ملونة ومخططة • 4.8 ميغابايت
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onShowToast('بدأ تحميل ملف ملخص قوانين كبلر PDF 📄', 'download')}
                  aria-label="تحميل الملف"
                  className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
              </div>

              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface-container flex flex-col items-center justify-center text-center p-4">
                <img
                  alt="Academic sheet preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  src={KEPLER_LESSON_DATA.pdfCoverImage}
                />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[36px] text-primary">visibility</span>
                  <p className="font-label-md text-label-md text-on-surface font-bold">
                    استعراض المذكرة كاملة داخل التطبيق
                  </p>
                  <button
                    onClick={() => {
                      setShowPdfViewer(true);
                      onShowToast('فتح قارئ المذكرات التفاعلي', 'menu_book');
                    }}
                    className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-transform font-bold"
                  >
                    فتح في قارئ المستندات
                  </button>
                </div>
              </div>

              {showPdfViewer && (
                <div className="p-3 bg-surface-container-low rounded-xl border border-primary/20 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-bold text-primary">
                      معاينة: الصفحة 1 من 14
                    </span>
                    <button
                      onClick={() => setShowPdfViewer(false)}
                      className="text-outline hover:text-on-surface text-sm"
                    >
                      إغلاق المعاينة
                    </button>
                  </div>
                  <img
                    alt="PDF Full"
                    className="w-full h-56 object-cover rounded-lg shadow-sm"
                    src={KEPLER_LESSON_DATA.pdfCoverImage}
                  />
                </div>
              )}
            </div>
          )}

          {/* Panel 3: Q&A and Comments */}
          {activeTab === 'qa' && (
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  استفسارات الطلاب ({questions.length + 46} سؤالاً)
                </span>
                <button
                  onClick={() => setShowQuestionInput(!showQuestionInput)}
                  className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  طرح استفسار جديد
                </button>
              </div>

              {showQuestionInput && (
                <form
                  onSubmit={handleAddQuestion}
                  className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-primary/20"
                >
                  <span className="font-label-md text-label-md font-semibold text-primary">
                    سؤالك إلى د. عمر المهندس:
                  </span>
                  <textarea
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    rows={2}
                    placeholder="اكتب سؤالك بوضوح وسيجيب المعلم خلال دقائق..."
                    className="p-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowQuestionInput(false)}
                      className="px-3 py-1 rounded-lg text-on-surface-variant font-label-md text-label-md"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm"
                    >
                      إرسال السؤال
                    </button>
                  </div>
                </form>
              )}

              {/* Sample Comments List */}
              <div className="flex flex-col gap-2.5">
                {questions.map((q) => (
                  <div key={q.id} className="p-space-sm bg-surface-container-low rounded-xl flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary font-label-md text-label-md flex items-center justify-center font-bold">
                          {q.studentInitials}
                        </div>
                        <span className="font-label-md text-label-md text-on-surface font-bold">
                          {q.studentName}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-surface-container text-outline font-mono text-[10px]">
                          {q.timestamp}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline">{q.ago}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{q.question}</p>

                    {q.teacherReply && (
                      <div className="mr-4 p-2.5 rounded-lg bg-surface-container-lowest flex flex-col gap-1 shadow-xs border-r-2 border-primary">
                        <div className="flex items-center gap-1.5 text-primary">
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                          <span className="font-label-sm text-label-sm font-bold">
                            رد {q.teacherReply.teacherName}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface">
                          {q.teacherReply.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Playlist & Next Lessons in Chapter */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              دروس هذا الفصل (3 مقاطع)
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-outline">الفصل 3 من 8</span>
        </div>

        {/* Lesson Cards Stack */}
        <div className="flex flex-col gap-space-xs">
          {/* Lesson 1 (Completed) */}
          <div className="flex items-center justify-between p-3.5 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="relative w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">check_circle</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                  1. المقدمة والجاذبية الكونية
                </span>
                <div className="flex items-center gap-2 mt-0.5 text-outline font-label-sm text-label-sm">
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    32 دقيقة
                  </span>
                  <span>•</span>
                  <span className="text-primary font-semibold">مكتمل بالكامل ✅</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setCurrentTimeSec(0);
                setIsPlaying(true);
                onShowToast('إعادة تشغيل الدرس الأول من البداية 🔁', 'replay');
              }}
              aria-label="إعادة المشاهدة"
              className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">replay</span>
            </button>
          </div>

          {/* Lesson 2 (Active / Currently Playing) */}
          <div className="relative flex items-center justify-between p-3.5 bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden border border-outline-variant/20">
            {/* Leading Accent Bar */}
            <div className="absolute inset-y-0 right-0 w-1.5 bg-primary-container"></div>
            <div className="flex items-center gap-space-sm min-w-0 pr-1.5">
              <div
                onClick={togglePlay}
                className="relative w-11 h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm cursor-pointer active:scale-95"
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                    2. قوانين كبلر الثلاثة وتطبيقاتها
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-primary-container/20 text-on-primary-container font-label-sm text-[10px] font-bold">
                    الحالي ◀️
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    45 دقيقة
                  </span>
                  <span>•</span>
                  <span className="text-primary font-medium">متبقي 26 دقيقة ({progressPercent}%)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            </div>
          </div>

          {/* Lesson 3 (Locked) */}
          <div className="flex items-center justify-between p-3.5 bg-surface-container-lowest/70 opacity-80 rounded-2xl shadow-xs border border-outline-variant/20">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="relative w-11 h-11 rounded-xl bg-surface-container text-outline flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">lock</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface-variant font-bold truncate">
                  3. حل مسائل وتدريبات وزارية نموذجية
                </span>
                <div className="flex items-center gap-2 mt-0.5 text-outline font-label-sm text-label-sm">
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    28 دقيقة
                  </span>
                  <span>•</span>
                  <span>مقفل حتى إنهاء الدرس الحالي 🔒</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onShowToast('هذا الدرس مقفل حتى إنهاء الدرس الثاني واختباره', 'lock')}
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-outline/60 cursor-not-allowed shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">lock_clock</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
