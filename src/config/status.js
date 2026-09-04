// Status/severity tones are reserved for state (good/warning/critical) and
// stay independent of the brand/portal accent palette in accent.js, so a
// "critical" row never gets confused for "this belongs to the Creator portal".

const STATUS_TONES = {
  neutral: { text: 'text-ink-soft', softBg: 'bg-paper-deep/60' },
  positive: { text: 'text-emerald-700', softBg: 'bg-emerald-50' },
  info: { text: 'text-sky-700', softBg: 'bg-sky-50' },
  warning: { text: 'text-amber-800', softBg: 'bg-amber-50' },
  negative: { text: 'text-rose-700', softBg: 'bg-rose-50' },
};

export function getStatusClasses(tone) {
  return STATUS_TONES[tone] ?? STATUS_TONES.neutral;
}
