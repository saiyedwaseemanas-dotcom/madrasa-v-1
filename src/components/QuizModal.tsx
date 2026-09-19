import React, { useState } from 'react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const question = {
    title: 'اختبار قصير فوري: حساب النهايات والدوال الدائرية',
    subTitle: 'حصة أ. فهد السعيد • الرياضيات',
    prompt: 'ما هي قيمة النهاية التالية عندما تؤول x إلى الصفر؟',
    formula: 'lim(x→0) [ sin(3x) / x ] = ?',
    options: [
      { id: 0, text: '0 (صفر)' },
      { id: 1, text: '1 (واحد)' },
      { id: 2, text: '3 (ثلاثة)' },
      { id: 3, text: 'غير معرفة' },
    ],
    correctId: 2,
    explanation: 'تطبيقاً لنظرية lim(x→0) [ sin(ax) / x ] = a، فإن قيمة المعامل a هي 3، وبالتالي النهاية تساوي 3.',
  };

  const handleSelect = (idx: number) => {
    if (!isSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctId) {
      onShowToast('إجابة صحيحة وممتازة! 🎉 +10 نقاط', 'emoji_events');
    } else {
      onShowToast('إجابة غير دقيقة، راجع التوضيح العلمي 💡', 'info');
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl p-space-md flex flex-col gap-space-md border border-outline-variant/30">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">quiz</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[16px] text-on-surface font-bold">
                {question.title}
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {question.subTitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-body-md text-body-md text-on-surface font-medium">
            {question.prompt}
          </p>

          <div className="p-3 rounded-xl bg-surface-container text-center font-mono text-lg font-bold text-primary dir-ltr">
            {question.formula}
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let itemClass = 'border-surface-container bg-surface-container-low hover:bg-surface-container';

              if (isSubmitted) {
                if (opt.id === question.correctId) {
                  itemClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400 font-semibold';
                } else if (isSelected) {
                  itemClass = 'border-rose-400 bg-rose-50 text-rose-800 ring-2 ring-rose-300';
                }
              } else if (isSelected) {
                itemClass = 'border-primary bg-primary/10 text-primary ring-2 ring-primary font-semibold';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={isSubmitted}
                  className={`flex items-center justify-between p-3 rounded-xl border text-right transition-all ${itemClass}`}
                >
                  <span className="font-body-md text-body-md">{opt.text}</span>
                  {isSubmitted && opt.id === question.correctId && (
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                  )}
                  {isSubmitted && isSelected && opt.id !== question.correctId && (
                    <span className="material-symbols-outlined text-rose-600 text-[20px]">cancel</span>
                  )}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div className="p-3 rounded-xl bg-surface-container-high/60 text-on-surface flex flex-col gap-1 mt-1 border border-primary/20">
              <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                شرح المعلم المباشر:
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline">
            {isSubmitted ? 'تم إرسال الإجابة إلى المعلم' : 'مدة السؤال: ٦٠ ثانية'}
          </span>
          <div className="flex gap-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className={`px-5 py-2 rounded-xl font-label-md text-label-md transition-all ${
                  selectedOption !== null
                    ? 'bg-primary text-on-primary shadow-sm hover:bg-primary-container active:scale-95'
                    : 'bg-surface-container text-outline cursor-not-allowed'
                }`}
              >
                تأكيد الإجابة
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm active:scale-95"
              >
                تم، العودة للحصة
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
