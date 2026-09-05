import { getStatusClasses } from '../../config/status';

export default function StatusPill({ label, tone = 'neutral' }) {
  const classes = getStatusClasses(tone);

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes.softBg} ${classes.text}`}>
      {label}
    </span>
  );
}
