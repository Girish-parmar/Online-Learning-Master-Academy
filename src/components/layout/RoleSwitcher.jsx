import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ROLES, ROLE_ORDER } from '../../config/roles';
import { getAccentClasses } from '../../config/accent';

export default function RoleSwitcher({ activeRoleId, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const activeRole = ROLES[activeRoleId];
  const classes = getAccentClasses(activeRole.accent);
  const BadgeIcon = activeRole.badgeIcon;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="relative flex items-center gap-3 rounded-2xl border border-line bg-white/80 py-2 pl-3 pr-3.5 shadow-sm transition hover:border-ink-faint/50"
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-line bg-paper" />
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${classes.softBg}`}>
          <BadgeIcon className={`h-5 w-5 ${classes.text}`} strokeWidth={1.75} />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="font-display text-sm font-semibold text-ink">{activeRole.name}</span>
          <span className="text-xs text-ink-faint">{activeRole.subdomain}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-ink-faint transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-line bg-white p-2 shadow-lg">
          <p className="px-3 pb-2 pt-1 text-xs text-ink-faint">
            Switch active role — one identity, demo only
          </p>
          <ul className="space-y-1">
            {ROLE_ORDER.map((roleId) => {
              const role = ROLES[roleId];
              const roleClasses = getAccentClasses(role.accent);
              const Icon = role.badgeIcon;
              const isActive = roleId === activeRoleId;

              return (
                <li key={roleId}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(roleId);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-paper-alt/60 ${
                      isActive ? 'bg-paper-alt/70' : ''
                    }`}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${roleClasses.softBg}`}>
                      <Icon className={`h-4 w-4 ${roleClasses.text}`} strokeWidth={1.75} />
                    </span>
                    <span className="flex flex-1 flex-col leading-tight">
                      <span className="text-sm font-medium text-ink">{role.name}</span>
                      <span className="text-xs text-ink-faint">{role.subdomain}</span>
                    </span>
                    {isActive && <Check className={`h-4 w-4 ${roleClasses.text}`} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
