import React, { useState } from 'react';
import { STUDENT_PROFILE } from '../data/mockData';

interface MyAccountScreenProps {
  onShowToast: (msg: string, icon?: string) => void;
}

export const MyAccountScreen: React.FC<MyAccountScreenProps> = ({ onShowToast }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  return (
    <div className="flex flex-col w-full gap-space-md pb-6">
      {/* Profile Header Card */}
      <section className="p-space-md rounded-2xl bg-surface-container-lowest shadow-md flex items-center justify-between border border-outline-variant/20">
        <div className="flex items-center gap-space-sm">
          <div className="relative">
            <img
              alt={STUDENT_PROFILE.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-container/20"
              src={STUDENT_PROFILE.avatarUrl}
            />
            <span className="absolute bottom-0 left-0 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-surface flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {STUDENT_PROFILE.name}
              </h2>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {STUDENT_PROFILE.grade} • {STUDENT_PROFILE.track}
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
              ثانوية الأندلس للموهوبين
            </span>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-center font-label-sm text-label-sm font-bold shadow-xs">
          {STUDENT_PROFILE.badge}
        </div>
      </section>

      {/* Academic Stats Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-[24px] text-primary mb-1">
            school
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {STUDENT_PROFILE.completedClasses}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">حصة مكتملة</span>
        </div>

        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-[24px] text-tertiary mb-1">
            timer
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {STUDENT_PROFILE.watchHours}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">ساعة مشاهدة</span>
        </div>

        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-[24px] text-secondary mb-1">
            assignment_turned_in
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {STUDENT_PROFILE.passedQuizzes}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">اختبار مجتاز</span>
        </div>

        <div className="p-3 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-[24px] text-emerald-600 mb-1">
            verified
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {STUDENT_PROFILE.attendanceRate}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">نسبة الالتزام</span>
        </div>
      </section>

      {/* Quick Library Management */}
      <section className="flex flex-col gap-space-xs">
        <h3 className="font-label-lg text-label-lg text-on-surface font-bold px-1">
          محتواي التعليمي
        </h3>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onShowToast('استعراض الدروس المحفوظة بالمفضلة', 'star')}
            className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:bg-surface-container-low flex items-center justify-between transition-colors border border-outline-variant/20 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">star</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  قائمة الدروس المفضلة (١٢ درساً)
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  الفيزياء الفلكية، التكامل، والأحياء
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_left</span>
          </button>

          <button
            onClick={() => onShowToast('المذكرات والملخصات المحملة أوفلاين', 'download_for_offline')}
            className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:bg-surface-container-low flex items-center justify-between transition-colors border border-outline-variant/20 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">download_done</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  المذكرات المحملة بدون نت (٤ ملفات)
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  متاحة دائماً للقراءة دون استهلاك بيانات
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_left</span>
          </button>

          <button
            onClick={() => onShowToast('شهادات التفوق المعتمدة لعام ١٤٤٦ هـ', 'workspace_premium')}
            className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:bg-surface-container-low flex items-center justify-between transition-colors border border-outline-variant/20 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  سجل الأوسمة وشهادات التفوق
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  ٣ أوسمة تفاعل وشهادة إتمام المسار
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_left</span>
          </button>
        </div>
      </section>

      {/* App Preferences */}
      <section className="flex flex-col gap-space-xs mt-1">
        <h3 className="font-label-lg text-label-lg text-on-surface font-bold px-1">
          إعدادات التطبيق
        </h3>

        <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold text-on-surface">
                تنبيهات الحصص المباشرة
              </span>
              <span className="font-body-sm text-body-sm text-outline">
                إرسال إشعار قبل بدء البث بـ 15 دقيقة
              </span>
            </div>
            <button
              onClick={() => {
                const next = !pushEnabled;
                setPushEnabled(next);
                onShowToast(next ? 'تم تفعيل التنبيهات الذكية 🔔' : 'تم تعطيل التنبيهات');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                pushEnabled ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  pushEnabled ? 'right-6.5' : 'right-0.5'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-outline-variant/20"></div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold text-on-surface">
                وضع توفير بيانات الاتصال
              </span>
              <span className="font-body-sm text-body-sm text-outline">
                تقليل جودة البث إلى 480p عند استخدام باقة الهاتف
              </span>
            </div>
            <button
              onClick={() => {
                const next = !dataSaver;
                setDataSaver(next);
                onShowToast(next ? 'تم تفعيل وضع توفير البيانات 📶' : 'تم إيقاف وضع توفير البيانات');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                dataSaver ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  dataSaver ? 'right-6.5' : 'right-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Logout button */}
      <button
        onClick={() => onShowToast('حساب مدرستي متصل بشكل آمن بالنظام المركزي', 'lock')}
        className="w-full py-3 rounded-xl bg-surface-container text-outline hover:text-error hover:bg-error-container/20 font-label-md text-label-md transition-all flex items-center justify-center gap-2 mt-2"
      >
        <span className="material-symbols-outlined text-[18px]">verified_user</span>
        <span>تسجيل خروج أو تبديل الحساب الأكاديمي</span>
      </button>
    </div>
  );
};
