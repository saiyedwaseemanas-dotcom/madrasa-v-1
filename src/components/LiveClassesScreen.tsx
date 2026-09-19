import React, { useState } from 'react';
import { ScreenType } from '../types';
import { TODAY_SCHEDULE } from '../data/mockData';

interface LiveClassesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const LiveClassesScreen: React.FC<LiveClassesScreenProps> = ({ onNavigate, onShowToast }) => {
  const [selectedDay, setSelectedDay] = useState(17);
  const [scheduleTab, setScheduleTab] = useState<'today' | 'week' | 'past'>('today');
  const [isNotified, setIsNotified] = useState(false);
  const [isHandReady, setIsHandReady] = useState(true);

  const days = [
    { dayName: 'السبت', dayNum: 15, isToday: false },
    { dayName: 'الأحد', dayNum: 16, isToday: false },
    { dayName: 'اليوم', dayNum: 17, isToday: true },
    { dayName: 'الثلاثاء', dayNum: 18, isToday: false },
    { dayName: 'الأربعاء', dayNum: 19, isToday: false },
    { dayName: 'الخميس', dayNum: 20, isToday: false },
  ];

  const handleNotificationToggle = () => {
    const nextState = !isNotified;
    setIsNotified(nextState);
    if (nextState) {
      onShowToast('تم تفعيل إشعار حصة اللغة العربية بنجاح! 🔔', 'notifications_active');
    } else {
      onShowToast('تم إلغاء التنبيه للحصة', 'notifications_off');
    }
  };

  const handleHandToggle = () => {
    const nextState = !isHandReady;
    setIsHandReady(nextState);
    onShowToast(
      nextState ? 'تم تفعيل جاهزية الميكروفون التلقائي ✋' : 'تم تعطيل الربط التلقائي',
      'waving_hand'
    );
  };

  return (
    <div className="flex flex-col w-full gap-space-md">
      {/* Calendar Strip */}
      <section className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">جدول البث المباشر</h2>
          </div>
          <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full text-secondary font-label-md text-label-md">
            <span>شعبان ١٤٤٦ هـ</span>
          </div>
        </div>

        {/* Horizontal Date Selector */}
        <div className="flex items-center justify-between gap-space-xs overflow-x-auto py-1.5 no-scrollbar">
          {days.map((item) => {
            const isSelected = selectedDay === item.dayNum;
            return (
              <button
                key={item.dayNum}
                onClick={() => {
                  setSelectedDay(item.dayNum);
                  onShowToast(`عرض جدول يوم ${item.dayName} (${item.dayNum} شعبان)`, 'calendar_today');
                }}
                className={`flex flex-col items-center justify-center min-w-[52px] py-2 px-1 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-md shadow-primary/20 scale-105 font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
                type="button"
              >
                <span className="font-label-sm text-label-sm opacity-90">{item.dayName}</span>
                <span className="font-headline-sm text-headline-sm mt-1">{item.dayNum}</span>
                {item.isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-tertiary-container' : 'bg-primary'}`}></span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Segmented Tabs Selector */}
      <div className="flex items-center p-1 bg-surface-container rounded-xl">
        <button
          className={`flex-1 py-2 text-center rounded-lg font-label-lg text-label-lg transition-all ${
            scheduleTab === 'today'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => setScheduleTab('today')}
        >
          اليوم (٣ حصص)
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-lg font-label-lg text-label-lg transition-all ${
            scheduleTab === 'week'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => {
            setScheduleTab('week');
            onShowToast('عرض جدول الأسبوع كاملاً', 'view_week');
          }}
        >
          هذا الأسبوع
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-lg font-label-lg text-label-lg transition-all ${
            scheduleTab === 'past'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => {
            setScheduleTab('past');
            onShowToast('عرض الحصص المسجلة السابقة', 'history');
          }}
        >
          الحصص المنتهية
        </button>
      </div>

      {/* Live Now Featured Broadcast Hero Card */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-lg shadow-on-background/5 border border-outline-variant/20">
        {/* Live Ambience Accent Border Fill (Right Edge in RTL) */}
        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-tertiary via-tertiary-container to-primary"></div>
        <div className="p-space-md flex flex-col gap-space-sm pr-space-lg">
          {/* Top Badging Row */}
          <div className="flex items-center justify-between gap-space-xs flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary text-on-tertiary shadow-sm shadow-tertiary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-container-lowest opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-surface-container-lowest"></span>
              </span>
              <span className="font-label-md text-label-md font-bold">مباشر الآن 🔴</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">group</span>
              <span>أكثر من ٢٨٠ طالب متواجد</span>
            </div>
          </div>

          {/* Subject & Topic Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                المسار العلمي
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">الفصل الدراسي الثاني</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface leading-tight font-bold">
              الرياضيات: التفاضل والتكامل - الدرس الرابع
            </h3>
          </div>

          {/* Teacher Info Panel */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-space-xs min-w-0">
              <img
                alt="أ. فهد السعيد"
                className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtCJWhu-nU_mpfAciXDEP2qNL5O_ZwyoHF7e58854MfT6-7LZ5-S8jF07MbNRzxxT12NmovtvnnjvdK-PnV00cXgZR924SiY9A8XxevU4n0x0nV7_z4U7AtwKtDP6e7LT3wXTX6e9KSft3DF-CLsFdH1yAVcb1N2ZXVXewQbYYtAj6addbwqMUL8gBNsjFs0m6x0zumSot6sXqtqxGIFvB90ntAZZ21Ksutnn7S567Hk7kvsgHYUmbBQ"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface truncate font-bold">أ. فهد السعيد</span>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span
                    className="material-symbols-outlined text-[15px] text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-on-surface font-semibold">٤.٩</span>
                  <span>(١,٢٤٠ تقييم)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary bg-surface-container px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[16px]">equalizer</span>
              <span className="font-label-sm text-label-sm font-semibold">جودة فائقة HD</span>
            </div>
          </div>

          {/* Real-time Interactive Status Ticker */}
          <div className="grid grid-cols-2 gap-space-xs">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container">
              <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">front_hand</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">المشاركة الصوتية</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  طلب يد متاح ✋
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container">
              <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">quiz</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">اختبار فوري</span>
                <span className="font-label-md text-label-md text-primary font-semibold truncate">
                  نشط خلال ٥ دقائق
                </span>
              </div>
            </div>
          </div>

          {/* Action Button CTA */}
          <button
            onClick={() => {
              onShowToast('جارٍ الاتصال بقاعة البث المباشر (Agora Stream)...', 'sensors');
              onNavigate('live-classroom');
            }}
            className="w-full mt-1 py-3.5 px-4 rounded-xl bg-gradient-to-l from-primary to-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-md shadow-primary/25 active:scale-[0.98] transition-all hover:brightness-105"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">sensors</span>
            <span className="font-bold">دخول القاعة التفاعلية الآن (Agora Stream)</span>
          </button>
        </div>
      </section>

      {/* Teacher Announcements Banner */}
      <section className="p-3.5 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-start gap-space-xs shadow-sm border border-secondary/20">
        <div className="w-9 h-9 rounded-xl bg-surface-container-lowest/80 text-secondary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">campaign</span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg font-bold">تنويه المعلمين المباشر</span>
            <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant">منذ ١٠ دقائق</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-relaxed">
            يرجى من جميع الطلاب تحميل ملزمة التمارين التفاعلية (PDF) المرفقة بالدرس قبل بدء فقرة الأسئلة الحية.
          </p>
        </div>
      </section>

      {/* Today's Schedule Timeline */}
      <section className="flex flex-col gap-space-sm mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">schedule</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">جدول حصص اليوم</h3>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">٣ حصص مجدولة</span>
        </div>

        {/* Timeline List Container */}
        <div className="flex flex-col gap-3">
          {/* Card 1: Completed Session (4:00 PM) */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/20">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-outline-variant"></div>
            <div className="flex flex-col gap-space-xs pr-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                    ٤:٠٠ م
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">المدة: ٤٥ دقيقة</span>
                </div>
                <span className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-medium px-2.5 py-0.5 rounded-full bg-secondary-container/50">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>مكتملة</span>
                </span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {TODAY_SCHEDULE[0].title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    {TODAY_SCHEDULE[0].teacher.name}
                  </span>
                  <span className="text-outline text-[12px]">•</span>
                  <span className="font-label-sm text-label-sm text-outline">حضرها ٣١٢ طالب</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 mt-1 bg-surface-container-low p-2.5 rounded-xl">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">videocam</span>
                  <span>تم رفع الحصة في المكتبة السحابية</span>
                </div>
                <button
                  onClick={() => {
                    onShowToast('فتح تسجيل حصة الكيمياء من الأرشيف 📼', 'play_circle');
                    onNavigate('recorded-library');
                  }}
                  className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary font-label-md text-label-md transition-all shadow-sm"
                  type="button"
                >
                  <span>متاح التسجيل 📼</span>
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Current Live Session (6:00 PM) */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-md border border-outline-variant/20">
            <div className="absolute top-0 right-0 w-2 h-full bg-tertiary"></div>
            <div className="flex flex-col gap-space-xs pr-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                    ٦:٠٠ م - الآن
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                    ينتهي خلال ٢٠ دقيقة
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-tertiary font-semibold px-2.5 py-0.5 rounded-full bg-tertiary animate-pulse">
                  <span>جارية الآن (بث حي 🔴)</span>
                </span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {TODAY_SCHEDULE[1].title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    {TODAY_SCHEDULE[1].teacher.name}
                  </span>
                  <span className="text-outline text-[12px]">•</span>
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    قاعة افتراضية رقم ٤
                  </span>
                </div>
              </div>
              {/* Quick Join Bar */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-2 -space-x-reverse overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    ع
                  </div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest bg-secondary-container text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    س
                  </div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest bg-tertiary-container text-on-tertiary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    +١٤
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('live-classroom')}
                  className="py-2 px-4 rounded-xl bg-tertiary text-on-tertiary font-label-lg text-label-lg flex items-center gap-1.5 shadow-sm shadow-tertiary/30 active:scale-95 transition-transform font-bold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>انضم للبث المباشر</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Upcoming Session (8:30 PM) */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/20">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-primary-container"></div>
            <div className="flex flex-col gap-space-xs pr-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-semibold">
                    ٨:٣٠ م
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">بعد ساعتين</span>
                </div>
                <span className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-medium px-2.5 py-0.5 rounded-full bg-surface-container">
                  <span className="material-symbols-outlined text-[15px]">timer</span>
                  <span>قادمة قريباً</span>
                </span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {TODAY_SCHEDULE[2].title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    {TODAY_SCHEDULE[2].teacher.name}
                  </span>
                  <span className="text-outline text-[12px]">•</span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">ساعة ونصف</span>
                </div>
              </div>
              {/* Notification Reminder Toggle Button */}
              <div className="flex items-center justify-between pt-2 mt-1 bg-surface-container-low p-2.5 rounded-xl">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px] text-secondary">assignment</span>
                  <span>توجد ورقة عمل ملحقة بالحصة</span>
                </div>
                <button
                  onClick={handleNotificationToggle}
                  className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-label-md text-label-md transition-all shadow-sm ${
                    isNotified
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-lowest text-primary hover:bg-primary-container hover:text-on-primary'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isNotified ? 'check_circle' : 'notifications_active'}
                  </span>
                  <span>{isNotified ? 'تم التفعيل ✓' : 'تفعيل الإشعار 🔔'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Raise Hand Quick-Action Banner */}
      <div className="p-3.5 rounded-2xl bg-surface-container flex items-center justify-between gap-space-xs mt-1 border border-outline-variant/20">
        <div className="flex items-center gap-space-xs">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">waving_hand</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">جاهزية رفع اليد السريع</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              يتم ربط الميكروفون تلقائياً فور إذن المعلم
            </span>
          </div>
        </div>
        <button
          onClick={handleHandToggle}
          className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold transition-all shadow-sm ${
            isHandReady ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-outline'
          }`}
        >
          {isHandReady ? 'مفعّل ✓' : 'معطّل'}
        </button>
      </div>
    </div>
  );
};
