import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinLive: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, onJoinLive }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl p-space-md flex flex-col gap-space-md border border-outline-variant/30">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">notifications_active</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">إشعارات الحصص والتنبيهات</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto no-scrollbar">
          {/* Notification 1 */}
          <div className="p-3 rounded-xl bg-tertiary-fixed/30 border-r-4 border-tertiary flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-bold text-tertiary flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                بث مباشر قيد التشغيل الآن
              </span>
              <span className="font-label-sm text-label-sm text-outline">الآن</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface">
              بدأت الآن حصة الرياضيات: التفاضل والتكامل مع الأستاذ فهد السعيد. انضم للقاعة التفاعلية.
            </p>
            <button
              onClick={() => {
                onClose();
                onJoinLive();
              }}
              className="mt-1 self-start px-3 py-1 rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">sensors</span>
              دخول البث
            </button>
          </div>

          {/* Notification 2 */}
          <div className="p-3 rounded-xl bg-surface-container-low border-r-4 border-primary flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                ملزمة تفاعلية جديدة
              </span>
              <span className="font-label-sm text-label-sm text-outline">منذ 25 دقيقة</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              قام الدكتور عمر المهندس برفع ملخص قوانين كبلر بصيغة PDF في مكتبة الدروس المسجلة.
            </p>
          </div>

          {/* Notification 3 */}
          <div className="p-3 rounded-xl bg-surface-container-low border-r-4 border-secondary flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-bold text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">quiz</span>
                تذكير بالاختبار القصير
              </span>
              <span className="font-label-sm text-label-sm text-outline">منذ ساعتين</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              اختبار الوحدة الرابعة لمادة الرياضيات متاح اليوم من الساعة ٨:٠٠ وحتى ١٠:٠٠ مساءً.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-outline-variant/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
