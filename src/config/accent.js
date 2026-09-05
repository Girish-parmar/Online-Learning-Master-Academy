// Central lookup so accent colors stay data-driven while remaining statically
// analyzable by Tailwind's class scanner (dynamic template strings would not
// be picked up by the build).

export const ACCENT_HEX = {
  brand: '#2f6f5e',
  superadmin: '#6d4fd1',
  administrator: '#0e8a83',
  creator: '#bd8420',
  subscriber: '#2e58c9',
};

const ACCENT_CLASSES = {
  brand: {
    text: 'text-brand',
    bg: 'bg-brand',
    softBg: 'bg-brand-soft',
    border: 'border-brand',
    ring: 'ring-brand',
  },
  superadmin: {
    text: 'text-superadmin',
    bg: 'bg-superadmin',
    softBg: 'bg-superadmin-soft',
    border: 'border-superadmin',
    ring: 'ring-superadmin',
  },
  administrator: {
    text: 'text-administrator',
    bg: 'bg-administrator',
    softBg: 'bg-administrator-soft',
    border: 'border-administrator',
    ring: 'ring-administrator',
  },
  creator: {
    text: 'text-creator',
    bg: 'bg-creator',
    softBg: 'bg-creator-soft',
    border: 'border-creator',
    ring: 'ring-creator',
  },
  subscriber: {
    text: 'text-subscriber',
    bg: 'bg-subscriber',
    softBg: 'bg-subscriber-soft',
    border: 'border-subscriber',
    ring: 'ring-subscriber',
  },
};

export function getAccentClasses(accent) {
  return ACCENT_CLASSES[accent] ?? ACCENT_CLASSES.brand;
}
