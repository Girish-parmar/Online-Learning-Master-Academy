import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import ChecklistCard from '../../components/shared/ChecklistCard';
import { studioCourse, preflightChecklist } from '../../data/mockData';

export default function SubmitForReview() {
  const [items, setItems] = useState(preflightChecklist);
  const [submitted, setSubmitted] = useState(false);
  const allDone = items.every((item) => item.done);

  function toggleItem(index) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item)));
  }

  return (
    <div className="max-w-xl space-y-4">
      <p className="text-sm text-ink-faint">
        Confirm each item before submitting <span className="font-medium text-ink">{studioCourse.title}</span> for
        review.
      </p>

      <ChecklistCard title="Pre-flight checklist" items={items} accent="creator" onToggle={toggleItem} />

      {submitted ? (
        <div className="flex items-center gap-2.5 rounded-xl border border-line bg-creator-soft px-4 py-3 text-sm text-creator">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Submitted for review. The Administrator team will follow up soon.
        </div>
      ) : (
        <button
          type="button"
          disabled={!allDone}
          onClick={() => allDone && setSubmitted(true)}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition ${
            allDone ? 'bg-creator hover:opacity-90' : 'cursor-not-allowed bg-creator/40'
          }`}
        >
          <Send className="h-4 w-4" />
          Submit for Review
        </button>
      )}
    </div>
  );
}
