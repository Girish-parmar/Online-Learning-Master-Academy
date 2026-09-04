import { useMemo, useState } from 'react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import EmptyState from './components/shared/EmptyState';
import { ROLES, ROLE_ORDER } from './config/roles';
import { getAccentClasses } from './config/accent';

export default function App() {
  const [activeRoleId, setActiveRoleId] = useState(ROLE_ORDER[0]);
  const role = ROLES[activeRoleId];
  const [activeNavId, setActiveNavId] = useState(role.nav[0].id);
  const classes = getAccentClasses(role.accent);

  function handleRoleChange(nextRoleId) {
    setActiveRoleId(nextRoleId);
    setActiveNavId(ROLES[nextRoleId].nav[0].id);
  }

  const activeNavItem = useMemo(
    () => role.nav.find((item) => item.id === activeNavId) ?? role.nav[0],
    [role, activeNavId],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar activeRoleId={activeRoleId} onRoleChange={handleRoleChange} />
      <div className="flex flex-1">
        <Sidebar activeRoleId={activeRoleId} activeNavId={activeNavId} onNavChange={setActiveNavId} />
        <main className="flex-1 px-8 py-7">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-display text-2xl font-semibold text-ink">{activeNavItem.label}</h1>
            <div className="mt-1.5 flex items-center gap-2 text-sm">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${classes.softBg} ${classes.text}`}>
                {role.name}
              </span>
              <span className="text-ink-faint">{role.subdomain}</span>
            </div>
            <div className="mt-6">
              <EmptyState
                icon={activeNavItem.icon}
                title={`${activeNavItem.label} arrives in a later phase`}
                description="This is the shared shell — navigation, role switching, and presentational components are wired up. Real page content lands next."
                accent={role.accent}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
