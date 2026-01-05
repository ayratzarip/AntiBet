import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { setupBackButton, hapticFeedback, showConfirm } from '../utils/telegram';
import { WITNESSES_OPTIONS } from '../types';

export default function Situation() {
  const { currentEntry, updateCurrentEntry, resetCurrentEntry } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  useEffect(() => {
    const cleanup = setupBackButton(async () => {
      if (step > 1) {
        setStep(step - 1);
      } else if (currentEntry.location.trim() || currentEntry.witnesses || currentEntry.circumstances.trim() || currentEntry.trigger.trim()) {
        const confirmed = await showConfirm('Отменить создание записи?');
        if (confirmed) {
          resetCurrentEntry();
          navigate('/');
        }
      } else {
        navigate('/');
      }
    });
    return cleanup;
  }, [navigate, step, currentEntry, resetCurrentEntry]);

  const handleBack = async () => {
    hapticFeedback('light');
    if (step > 1) {
      setStep(step - 1);
    } else if (currentEntry.location.trim() || currentEntry.witnesses || currentEntry.circumstances.trim() || currentEntry.trigger.trim()) {
      const confirmed = await showConfirm('Отменить создание записи?');
      if (confirmed) {
        resetCurrentEntry();
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      hapticFeedback('light');
      setStep(step + 1);
    } else {
      hapticFeedback('light');
      navigate('/thoughts');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return currentEntry.location.trim().length > 0;
      case 2:
        return currentEntry.witnesses.length > 0;
      case 3:
        return true; // Обстоятельства опциональны
      case 4:
        return true; // Триггер опционален
      default:
        return false;
    }
  };

  const renderProgressIndicator = () => {
    const totalStepsAll = 7;
    return (
      <div className="flex w-full flex-row items-center justify-center gap-2 py-4 px-4">
        {[...Array(totalStepsAll)].map((_, index) => {
          const currentStepGlobal = step; // Текущий шаг из 4 внутренних = шаг 1-4 из 7 общих
          return (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                index < currentStepGlobal
                  ? 'bg-primary shadow-[0_0_8px_rgba(19,127,236,0.5)]'
                  : 'bg-slate-200 dark:bg-surface-dark'
              }`}
            />
          );
        })}
      </div>
    );
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
          Шаг {step} из 7
        </h2>
        <div className="size-10" />
      </header>

      {/* Progress Indicator */}
      {renderProgressIndicator()}

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 pb-32">
        {/* Step 1: Место */}
        {step === 1 && (
          <>
            <div className="pt-2 pb-2">
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Где это произошло?
              </h1>
            </div>
            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 pb-6">
              Опишите место, где у вас появились мысли об игре.
            </p>
            <div className="relative flex-1 min-h-[160px] flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Место
              </label>
              <textarea
                value={currentEntry.location}
                onChange={(e) => updateCurrentEntry('location', e.target.value)}
                className="w-full h-full min-h-[180px] p-4 rounded-xl bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary/50 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none transition-all shadow-sm"
                placeholder="Например: дома на диване, в офисе, в машине, в торговом центре..."
              />
            </div>
          </>
        )}

        {/* Step 2: Свидетели */}
        {step === 2 && (
          <>
            <div className="pt-2 pb-2">
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Кто был рядом?
              </h1>
            </div>
            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 pb-6">
              Были ли вы одни или с кем-то в тот момент?
            </p>
            <div className="space-y-3">
              {WITNESSES_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateCurrentEntry('witnesses', option);
                    hapticFeedback('light');
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    currentEntry.witnesses === option
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white border-2 border-transparent hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {currentEntry.witnesses === option && (
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 3: Обстоятельства */}
        {step === 3 && (
          <>
            <div className="pt-2 pb-2">
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Что происходило?
              </h1>
            </div>
            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 pb-6">
              Опишите фон, на котором всё происходило: ваше состояние, события перед этим.
            </p>
            <div className="relative flex-1 min-h-[160px] flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Обстоятельства
              </label>
              <textarea
                value={currentEntry.circumstances}
                onChange={(e) => updateCurrentEntry('circumstances', e.target.value)}
                className="w-full h-full min-h-[180px] p-4 rounded-xl bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary/50 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none transition-all shadow-sm"
                placeholder="Например: устал после работы, голоден, поругался с женой, получил зарплату, скучно..."
              />
            </div>
          </>
        )}

        {/* Step 4: Триггер */}
        {step === 4 && (
          <>
            <div className="pt-2 pb-2">
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Что спровоцировало?
              </h1>
            </div>
            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 pb-6">
              Что именно привело к появлению мыслей об игре? Это может быть событие, разговор, реклама, воспоминание.
            </p>
            <div className="relative flex-1 min-h-[160px] flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Триггер
              </label>
              <textarea
                value={currentEntry.trigger}
                onChange={(e) => updateCurrentEntry('trigger', e.target.value)}
                className="w-full h-full min-h-[180px] p-4 rounded-xl bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary/50 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none transition-all shadow-sm"
                placeholder="Например: увидел рекламу казино, друг рассказал о выигрыше, вспомнил прошлый выигрыш, увидел онлайн-казино..."
              />
            </div>
          </>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-linear-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent pt-12">
        <div className="flex gap-4 max-w-lg mx-auto w-full">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="h-12 w-full rounded-xl bg-primary text-white font-semibold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step < totalSteps ? 'Далее' : 'К мыслям'}
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}
