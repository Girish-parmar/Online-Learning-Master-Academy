import { Check } from 'lucide-react';
import { getAccentClasses } from '../../config/accent';

export default function ChecklistCard({ title, items = [], accent = 'brand' }) {
  const classes = getAccentClasses(accent);
  const doneCount = items.filter((item) => item.done).length;

  return (
    <div className="rounded-2xl border border-line bg-white/70 p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-display text-base font-semibold text-ink">{title}</h4>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${classes.softBg} ${classes.text}`}>
          {doneCount}/{items.length}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-sm">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                item.done ? `${classes.bg} border-transparent` : 'border-line bg-transparent'
              }`}
            >
              {item.done && <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />}
            </span>
            <span className={item.done ? 'text-ink-faint line-through' : 'text-ink'}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
