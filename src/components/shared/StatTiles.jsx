import { TrendingUp, TrendingDown } from 'lucide-react';
import { getAccentClasses } from '../../config/accent';

const COLUMN_CLASSES = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

// `trend` picks the arrow shown; `sentiment` picks the color. They diverge for
// metrics like churn where a downward trend is the good outcome — pass an
// explicit `sentiment` to override the trend-implies-color default.
function deltaColor(tile) {
  const sentiment = tile.sentiment ?? (tile.trend === 'up' ? 'positive' : tile.trend === 'down' ? 'negative' : undefined);
  if (sentiment === 'positive') return 'text-brand';
  if (sentiment === 'negative') return 'text-rose-700';
  return 'text-ink-faint';
}

export default function StatTiles({ tiles = [], columns = 4 }) {
  const colsClass = COLUMN_CLASSES[columns] ?? COLUMN_CLASSES[4];

  return (
    <div className={`grid grid-cols-1 gap-4 ${colsClass}`}>
      {tiles.map((tile) => {
        const classes = getAccentClasses(tile.accent ?? 'brand');
        const Icon = tile.icon;

        return (
          <div key={tile.label} className="rounded-2xl border border-line bg-white/70 p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm text-ink-soft">{tile.label}</span>
              {Icon && (
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${classes.softBg}`}>
                  <Icon className={`h-5 w-5 ${classes.text}`} strokeWidth={1.75} />
                </span>
              )}
            </div>
            <div className="mt-3 font-display text-2xl font-semibold text-ink">{tile.value}</div>
            {tile.delta && (
              <div className={`mt-1 flex items-center gap-1 text-xs ${deltaColor(tile)}`}>
                {tile.trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
                {tile.trend === 'down' && <TrendingDown className="h-3.5 w-3.5" />}
                <span>{tile.delta}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
