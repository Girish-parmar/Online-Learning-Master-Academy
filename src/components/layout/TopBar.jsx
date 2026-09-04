import RoleSwitcher from './RoleSwitcher';

export default function TopBar({ activeRoleId, onRoleChange }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-paper/95 px-6 backdrop-blur">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
          <span className="h-3 w-3 rotate-45 rounded-[2px] bg-paper" />
        </span>
        <span className="font-display text-xl font-bold tracking-tight text-ink">OLMA</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden items-center rounded-full border border-line bg-white/70 px-3 py-1 text-xs text-ink-faint sm:flex">
          Phase 1 · Sample data
        </span>
        <RoleSwitcher activeRoleId={activeRoleId} onChange={onRoleChange} />
      </div>
    </header>
  );
}
