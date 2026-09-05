import { Check } from 'lucide-react';
import { studioCourse } from '../../data/mockData';

function ReadField({ label, value }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</label>
      <input
        readOnly
        value={value}
        className="w-full cursor-default rounded-xl border border-line bg-paper-alt/40 px-3 py-2 text-sm text-ink focus:outline-none"
      />
    </div>
  );
}

export default function CourseBasics() {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm text-ink-faint">
        Editing <span className="font-medium text-ink">{studioCourse.title}</span> — read-only preview, editing
        arrives in a later phase.
      </p>

      <div className="space-y-5 rounded-2xl border border-line bg-white/70 p-6">
        <ReadField label="Title" value={studioCourse.title} />
        <div className="grid grid-cols-2 gap-4">
          <ReadField label="Category" value={studioCourse.topic} />
          <ReadField label="Level" value={studioCourse.level} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-soft">Learning outcomes</label>
          <ul className="space-y-2 rounded-xl border border-line bg-paper-alt/40 px-4 py-3">
            {studioCourse.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-creator" strokeWidth={2} />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
