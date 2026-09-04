import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { sampleQuizQuestion } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

export default function Assessments() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const accentClasses = getAccentClasses('subscriber');
  const isCorrect = selected === sampleQuizQuestion.correctOptionId;

  function handleRetry() {
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <div className="max-w-xl space-y-4">
      <p className="text-sm text-ink-faint">{sampleQuizQuestion.quizTitle}</p>

      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <p className="font-display text-lg font-semibold text-ink">{sampleQuizQuestion.question}</p>

        <div className="mt-5 space-y-2">
          {sampleQuizQuestion.options.map((option) => {
            const isSelected = selected === option.id;
            const isRight = option.id === sampleQuizQuestion.correctOptionId;
            let stateClasses = 'border-line hover:bg-paper-alt/60';
            if (submitted && isRight) stateClasses = 'border-emerald-300 bg-emerald-50';
            else if (submitted && isSelected && !isRight) stateClasses = 'border-rose-300 bg-rose-50';
            else if (!submitted && isSelected) stateClasses = `${accentClasses.border} ${accentClasses.softBg}`;

            return (
              <button
                key={option.id}
                type="button"
                disabled={submitted}
                onClick={() => setSelected(option.id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm text-ink transition ${stateClasses}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                    isSelected ? `${accentClasses.border} ${accentClasses.text}` : 'border-line text-ink-faint'
                  }`}
                >
                  {option.id.toUpperCase()}
                </span>
                {option.text}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <button
            type="button"
            disabled={!selected}
            onClick={() => selected && setSubmitted(true)}
            className={`mt-5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
              selected ? `hover:opacity-90 ${accentClasses.bg}` : 'cursor-not-allowed bg-subscriber/40'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <div className="mt-5 space-y-3">
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
                isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {isCorrect ? 'Correct! You scored 1/1.' : 'Not quite — you scored 0/1.'}
            </div>
            <p className="text-sm text-ink-soft">{sampleQuizQuestion.explanation}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
