import { getAccentClasses } from '../../config/accent';

export default function ProgressBar({ label, value = 0, max = 100, accent = 'brand', showValue = true }) {
  const classes = getAccentClasses(accent);
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="text-ink-soft">{label}</span>}
          {showValue && <span className="font-medium text-ink">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-paper-deep">
        <div className={`h-full rounded-full ${classes.bg}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
