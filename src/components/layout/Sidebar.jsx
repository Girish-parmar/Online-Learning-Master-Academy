import { ROLES } from '../../config/roles';
import { getAccentClasses } from '../../config/accent';

export default function Sidebar({ activeRoleId, activeNavId, onNavChange }) {
  const role = ROLES[activeRoleId];
  const classes = getAccentClasses(role.accent);

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-paper-alt/40 px-3 py-5">
      <p className="px-3 pb-2 text-xs text-ink-faint">{role.tagline}</p>
      <nav className="flex flex-col gap-1">
        {role.nav.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeNavId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavChange(item.id)}
              className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2.5 text-left text-sm transition ${
                isActive
                  ? `${classes.border} ${classes.softBg} font-medium text-ink`
                  : 'border-transparent text-ink-soft hover:bg-white/60'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? classes.text : 'text-ink-faint'}`} strokeWidth={1.75} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
