import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { setupBackButton, hapticFeedback } from '../utils/telegram';

export default function BodyFeelings() {
  const { currentEntry, updateCurrentEntry } = useApp();
  const navigate = useNavigate();
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const cleanup = setupBackButton(() => {
      navigate('/thoughts');
    });
    return cleanup;
  }, [navigate]);

  const handleBack = () => {
    hapticFeedback('light');
    navigate('/thoughts');
  };

  const handleNext = () => {
    hapticFeedback('light');
    navigate('/consequences');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <button
          onClick={handleBack}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors"
        >
          <span className="material-symbols-outlined text-[24px] text-slate-900 dark:text-white">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight text-center text-slate-900 dark:text-white">
          Шаг 3
        </h2>
        <div className="size-10" />
      </header>

      {/* Progress Indicator */}
      <div className="flex w-full flex-row items-center justify-center gap-2 py-4 px-4">
        <div className="h-1.5 flex-1 rounded-full bg-primary/40 dark:bg-border-dark" />
        <div className="h-1.5 flex-1 rounded-full bg-primary/40 dark:bg-border-dark" />
        <div className="h-1.5 flex-1 rounded-full bg-primary shadow-[0_0_8px_rgba(19,127,236,0.5)]" />
        <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-surface-dark" />
        <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-surface-dark" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 pb-32">
        {/* Headline */}
        <div className="pt-2 pb-2">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            Что Вы ощущаете в теле?
          </h1>
        </div>

        {/* Description */}
        <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 pb-6">
          Оцените тонус мышц тела и лица, затем прислушайтесь к ощущениям внутри. Эмоции всегда отражаются в мышечном тонусе.
        </p>

        {/* Text Input Area */}
        <div className="relative flex-1 min-h-[160px] flex flex-col">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Описание
          </label>
          <div className="relative group w-full h-full flex-1">
            <textarea
              value={currentEntry.bodyFeelings}
              onChange={(e) => updateCurrentEntry('bodyFeelings', e.target.value)}
              className="w-full h-full min-h-[180px] p-4 rounded-xl bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary/50 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none transition-all shadow-sm"
              placeholder="Например: ком в горле, давящее чувство в груди, жар на лице, дрожь в руках..."
            />
            {/* Helper Button */}
            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={() => { setShowTip(!showTip); hapticFeedback('light'); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">help</span>
                <span>Подсказка</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tip Modal */}
        {showTip && (
          <div className="mt-4 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-lg border border-slate-200 dark:border-border-dark animate-fade-in">
            <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Как описать ощущения?</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm">
              Обратите внимание на напряжение в плечах, челюсти, лбу. Сжаты ли кулаки? Как дышится? Эмоции живут в теле.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li>Тонус (напряжение, расслабление)</li>
              <li>Текстура (колючее, мягкое)</li>
              <li>Движение (пульсация, вибрация)</li>
              <li>Вес (тяжесть, легкость)</li>
            </ul>
            <button
              onClick={() => setShowTip(false)}
              className="w-full py-2.5 rounded-lg bg-slate-200 dark:bg-surface-dark-alt font-medium text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-border-dark transition-colors"
            >
              Понятно
            </button>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-linear-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent pt-12">
        <div className="flex gap-4 max-w-lg mx-auto w-full">
          <button
            onClick={handleNext}
            className="h-12 w-full rounded-xl bg-primary text-white font-semibold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Далее
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

