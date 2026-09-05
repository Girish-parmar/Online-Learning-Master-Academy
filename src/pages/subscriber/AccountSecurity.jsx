import { useState } from 'react';
import { LogOut, ShieldCheck } from 'lucide-react';
import { activeSessions as seedSessions } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const EMPTY_PASSWORDS = { current: '', next: '', confirm: '' };

export default function AccountSecurity() {
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [twoFactorOn, setTwoFactorOn] = useState(false);
  const [sessions, setSessions] = useState(seedSessions);
  const accentClasses = getAccentClasses('subscriber');

  function handlePasswordSubmit(event) {
    event.preventDefault();
    if (!passwords.next || passwords.next !== passwords.confirm) return;
    setPasswordSaved(true);
    setPasswords(EMPTY_PASSWORDS);
  }

  function signOutSession(id) {
    setSessions((prev) => prev.filter((session) => session.id !== id));
  }

  return (
    <div className="max-w-xl space-y-6">
      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-ink">Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Current password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(event) => setPasswords((prev) => ({ ...prev, current: event.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">New password</label>
              <input
                type="password"
                value={passwords.next}
                onChange={(event) => setPasswords((prev) => ({ ...prev, next: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Confirm new password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(event) => setPasswords((prev) => ({ ...prev, confirm: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>
          {passwordSaved && <p className="text-xs text-emerald-700">Password updated.</p>}
          <button
            type="submit"
            className={`rounded-xl px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90 ${accentClasses.bg}`}
          >
            Update Password
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accentClasses.softBg}`}>
              <ShieldCheck className={`h-5 w-5 ${accentClasses.text}`} strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-ink">Two-factor authentication</p>
              <p className="text-xs text-ink-faint">{twoFactorOn ? 'Enabled' : 'Add an extra layer of security'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTwoFactorOn((prev) => !prev)}
            aria-pressed={twoFactorOn}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${twoFactorOn ? accentClasses.bg : 'bg-paper-deep'}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${twoFactorOn ? 'left-[22px]' : 'left-0.5'}`}
            />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-ink">Active sessions</h3>
        <ul className="divide-y divide-line/70">
          {sessions.map((session) => (
            <li key={session.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm text-ink">
                  {session.device}
                  {session.current && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      This device
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  {session.location} — last active {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <button
                  type="button"
                  onClick={() => signOutSession(session.id)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:bg-paper-alt/60"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
