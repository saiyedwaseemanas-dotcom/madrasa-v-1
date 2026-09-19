import React, { useState, useEffect } from 'react';
import { ScreenType } from '../types';
import { SUBJECTS, UPCOMING_CLASSES_HOME, CONTINUE_WATCHING_LIST } from '../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSelectSubject?: (subjectId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onShowToast, onSelectSubject }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReminders, setActiveReminders] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(14 * 60 + 29);

  // Live countdown timer for the upcoming imminent class
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    if (secs <= 0) return 'الآن!';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleBookingToggle = () => {
    const nextState = !isBooked;
    setIsBooked(nextState);
    if (nextState) {
      onShowToast('تم حجز مقعدك في مراجعة ليلة الاختبار! 🎟️', 'confirmation_number');
    } else {
      onShowToast('تم إلغاء حجز المقعد', 'cancel');
    }
  };

  const handleReminderToggle = (id: string, title: string) => {
    const currentState = !!activeReminders[id];
    setActiveReminders((prev) => ({ ...prev, [id]: !currentState }));
    if (!currentState) {
      onShowToast(`تم تفعيل التذكير لحصة: ${title} 🔔`, 'notifications_active');
    } else {
      onShowToast(`تم إلغاء التذكير لحصة: ${title}`, 'notifications_off');
    }
  };

  const handleSubjectClick = (subjectId: string, name: string) => {
    if (onSelectSubject) {
      onSelectSubject(subjectId);
    }
    onShowToast(`تصفح دروس مادة: ${name}`, 'school');
    onNavigate('recorded-library');
  };

  return (
    <div className="flex flex-col w-full gap-space-lg pb-6">
      {/* 1. Header Greeting & Student Context */}
      <section className="flex flex-col gap-space-md pt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-md text-headline-md text-on-surface">مرحباً يا أحمد</span>
              <span className="text-[22px] animate-bounce">👋</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              الصف الثالث الثانوي • مسار علمي
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="font-label-sm text-label-sm font-semibold">مستواك متقدم ⭐</span>
          </div>
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pr-11 pl-10 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-all duration-200 border border-outline-variant/30"
            placeholder="ابحث عن حصة، مادة، أو معلم..."
            type="search"
          />
          <button
            onClick={() => onShowToast('تصفية البحث المتقدم', 'tune')}
            aria-label="تصفية البحث"
            className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant hover:text-primary transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </section>

      {/* 2. Featured Announcement Banner Slider */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-primary via-primary-container to-secondary text-on-primary p-5 shadow-md">
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-surface-container-lowest/10 blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-10 right-1/3 w-28 h-28 rounded-full bg-tertiary-container/15 blur-lg pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>بث خاص ومكثّف</span>
            </span>
            <span className="font-label-sm text-label-sm text-on-primary/80">اليوم ٨:٠٠ م</span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-headline-sm text-headline-sm text-on-primary leading-snug">
              مراجعة الرياضيات الشاملة ليلة الاختبار
            </h3>
            <p className="font-body-sm text-body-sm text-on-primary/90 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">school</span>
              مع الأستاذ فهد السعيد
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={handleBookingToggle}
              className={`h-10 px-5 rounded-xl font-label-lg text-label-lg shadow active:scale-95 transition-all duration-150 flex items-center justify-center gap-1.5 ${
                isBooked
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-surface-container-lowest text-primary hover:bg-surface-bright'
              }`}
              type="button"
            >
              <span>{isBooked ? 'تم الحجز بنجاح ✓' : 'احجز مقعدك'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>

            <div className="flex -space-x-2 -space-x-reverse overflow-hidden items-center">
              <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center font-label-sm text-on-secondary-fixed font-bold text-[10px] ring-2 ring-primary">
                +٤٢
              </div>
              <img
                alt="Student 1"
                className="inline-block h-7 w-7 rounded-full ring-2 ring-primary object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMAdqMMMM02JV5qoi24boMMTSSz9d6pRb76nTWATyM2sL8iQIETZgAjl5hbAHeA3PgAbIYTFU4w8aSqlNFiejh6iV6qMKqQlIP9smy8LR1B-avhSk8be1ljjr1-VYOlVYfA8nLkklXtFTcFeVOvT0oPVWIufRLUeMgyWh5C1g4xEWBCWLUnyX-PAzWaSn0jmJndIfZjw1nuB-wdy-1SVjUY8XJZDQ6WvnehSd8-d1-VTMxpB6uBEe3-A"
              />
              <img
                alt="Student 2"
                className="inline-block h-7 w-7 rounded-full ring-2 ring-primary object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMNxCq2ppsRJxSPt9A4UOOQs6E1RLEVy4a-IcVv2pqn_oCzPZyd0YMQ95E6Wa3NY9DV4n5BX_NUh1rpv-AFL_9sRpjIz80dtfSyYvC1ZBIoTaIi0Lxl4q4g1KGN09YB6oOv_rYxeXhJaRSQmY4XmAeKVHw6XkYoajlhr03UQYmvy1CASRkEQdHbcUwT2Qn_K19OFyhBD_mJg417cElN9sRIY6rIE0AG86RcqmLGtc825ZtcJk57pGPSg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Live Classes */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">الفصول المباشرة القادمة</h2>
          </div>
          <button
            onClick={() => onNavigate('live-classes')}
            className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-0.5"
          >
            عرض الكل
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
        </div>

        {/* Horizontal scrollable classes cards */}
        <div className="flex overflow-x-auto gap-space-md pb-2 -mx-margin-mobile px-margin-mobile snap-x snap-mandatory no-scrollbar">
          {/* Card 1: Physics Live imminent */}
          <div className="snap-start shrink-0 w-[290px] rounded-2xl bg-surface-container-lowest p-4 flex flex-col justify-between shadow-md relative overflow-hidden border border-outline-variant/20">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-tertiary-container"></div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  الفيزياء
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm shadow-sm animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  يبدأ بعد: <span className="tracking-wider font-mono">{formatCountdown(secondsRemaining)}</span>
                </span>
              </div>
              <h4 className="font-headline-sm text-[16px] text-on-surface line-clamp-2 leading-snug">
                الميكانيكا الكلاسيكية وتطبيقات قوانين نيوتن
              </h4>
              <div className="flex items-center gap-2 pt-1">
                <img
                  alt="د. عمر المهندس"
                  className="w-8 h-8 rounded-full object-cover shadow-sm"
                  src={UPCOMING_CLASSES_HOME[0].teacher.avatarUrl}
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate">د. عمر المهندس</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-tertiary">groups</span>
                    ١٨٤ طالب متواجد
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('live-classroom')}
                className="w-full h-11 rounded-xl bg-gradient-to-l from-tertiary-container to-tertiary text-on-tertiary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all duration-150"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] animate-pulse">sensors</span>
                <span>انضم الآن 🔴</span>
              </button>
            </div>
          </div>

          {/* Card 2: Organic Chemistry */}
          <div className="snap-start shrink-0 w-[290px] rounded-2xl bg-surface-container-lowest p-4 flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/20">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-primary-container"></div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  الكيمياء
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  اليوم ٦:٣٠ م
                </span>
              </div>
              <h4 className="font-headline-sm text-[16px] text-on-surface line-clamp-2 leading-snug">
                الكيمياء العضوية: تفاعلات الألكينات والألكانات
              </h4>
              <div className="flex items-center gap-2 pt-1">
                <img
                  alt="أ. منى الزهراني"
                  className="w-8 h-8 rounded-full object-cover shadow-sm"
                  src={UPCOMING_CLASSES_HOME[1].teacher.avatarUrl}
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate">أ. منى الزهراني</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">event_seat</span>
                    ٤٥ مقعد متبقي
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => handleReminderToggle(UPCOMING_CLASSES_HOME[1].id, UPCOMING_CLASSES_HOME[1].title)}
                className={`w-full h-11 rounded-xl font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all duration-150 ${
                  activeReminders[UPCOMING_CLASSES_HOME[1].id]
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {activeReminders[UPCOMING_CLASSES_HOME[1].id] ? 'notifications_active' : 'notifications'}
                </span>
                <span>{activeReminders[UPCOMING_CLASSES_HOME[1].id] ? 'تم التفعيل 🔔' : 'تذكير بالموعد 🔔'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: English Grammar */}
          <div className="snap-start shrink-0 w-[290px] rounded-2xl bg-surface-container-lowest p-4 flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/20">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-secondary"></div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  اللغة الإنجليزية
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  غداً ٤:٠٠ م
                </span>
              </div>
              <h4 className="font-headline-sm text-[16px] text-on-surface line-clamp-2 leading-snug">
                Grammar Mastery: Conditional Sentences & Tenses
              </h4>
              <div className="flex items-center gap-2 pt-1">
                <img
                  alt="Mr. David Al-Khatib"
                  className="w-8 h-8 rounded-full object-cover shadow-sm"
                  src={UPCOMING_CLASSES_HOME[2].teacher.avatarUrl}
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate">Mr. David Al-Khatib</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">menu_book</span>
                    شامل المذكرة التفاعلية
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => handleReminderToggle(UPCOMING_CLASSES_HOME[2].id, UPCOMING_CLASSES_HOME[2].title)}
                className={`w-full h-11 rounded-xl font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all duration-150 ${
                  activeReminders[UPCOMING_CLASSES_HOME[2].id]
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {activeReminders[UPCOMING_CLASSES_HOME[2].id] ? 'notifications_active' : 'notifications'}
                </span>
                <span>{activeReminders[UPCOMING_CLASSES_HOME[2].id] ? 'تم التفعيل 🔔' : 'تذكير بالموعد 🔔'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Subjects Grid (المواد الدراسية) */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">المواد الدراسية</h2>
          <span className="font-label-sm text-label-sm text-on-surface-variant">٦ مواد مقررة</span>
        </div>
        <div className="grid grid-cols-3 gap-space-sm">
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleSubjectClick(sub.id, sub.name)}
              className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 gap-2 border border-outline-variant/20"
              type="button"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${sub.bgClass} ${sub.colorClass} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <span className="material-symbols-outlined text-[26px]">{sub.icon}</span>
              </div>
              <span className="font-label-lg text-label-lg text-on-surface font-medium">{sub.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Continue Watching (أكمل المشاهدة) */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">play_circle</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">أكمل المشاهدة</h2>
          </div>
          <button
            onClick={() => onNavigate('recorded-library')}
            className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-0.5"
          >
            السجل
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-sm">
          {CONTINUE_WATCHING_LIST.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onShowToast(`استئناف متابعة درس: ${item.title}`, 'play_arrow');
                onNavigate('recorded-library');
              }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer border border-outline-variant/20"
            >
              <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden bg-surface-container">
                <img alt={item.title} className="w-full h-full object-cover" src={item.thumbnailUrl} />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest/90 text-primary flex items-center justify-center shadow-sm">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </div>
                </div>
                <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/60 text-[10px] text-white font-mono">
                  {item.duration}
                </span>
              </div>

              <div className="flex flex-col flex-1 min-w-0 justify-between gap-1.5">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    {item.subject} • {item.unit}
                  </span>
                  <h4 className="font-label-lg text-label-lg text-on-surface truncate">{item.title}</h4>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex flex-row-reverse">
                    <div
                      className="bg-primary-container h-full rounded-full transition-all duration-300"
                      style={{ width: `${item.progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span>{item.progressPercent}% مكتمل</span>
                    <span className="text-tertiary font-medium">متبقي {item.remainingMinutes} دقيقة</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
