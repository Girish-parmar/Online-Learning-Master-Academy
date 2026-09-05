import { getAccentClasses } from '../../config/accent';

export default function EmptyState({ icon: Icon, title, description, action, accent = 'brand' }) {
  const classes = getAccentClasses(accent);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-white/70 px-8 py-16 text-center">
      {Icon && (
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${classes.softBg}`}>
          <Icon className={`h-6 w-6 ${classes.text}`} strokeWidth={1.75} />
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-ink-soft">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
