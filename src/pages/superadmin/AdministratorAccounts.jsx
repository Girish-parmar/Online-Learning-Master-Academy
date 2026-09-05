import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import Modal from '../../components/shared/Modal';
import { administrators as seedAdministrators } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const STATUS_TONE = {
  Active: 'positive',
  Invited: 'info',
};

const DEPARTMENTS = ['Trust & Support', 'Payments Operations', 'Content Moderation', 'Platform Engineering', 'Compliance'];
const REGIONS = ['North America', 'EMEA', 'Latin America', 'Asia-Pacific'];

const EMPTY_FORM = { name: '', email: '', department: DEPARTMENTS[0], region: REGIONS[0] };

function initialsFor(name) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
  return initials || '??';
}

export default function AdministratorAccounts() {
  const [administrators, setAdministrators] = useState(() => [...seedAdministrators]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const accentClasses = getAccentClasses('superadmin');

  function handleInvite(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setAdministrators((prev) => [
      ...prev,
      {
        id: `usr-admin-invite-${prev.length + 1}`,
        name: form.name.trim(),
        email: form.email.trim(),
        avatarInitials: initialsFor(form.name),
        role: 'administrator',
        status: 'Invited',
        joinedAt: new Date().toISOString().slice(0, 10),
        department: form.department,
        region: form.region,
      },
    ]);
    setForm(EMPTY_FORM);
    setModalOpen(false);
  }

  const columns = [
    {
      key: 'name',
      label: 'Administrator',
      render: (row) => (
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${accentClasses.softBg} ${accentClasses.text}`}
          >
            {row.avatarInitials}
          </span>
          <div>
            <div className="font-medium text-ink">{row.name}</div>
            <div className="text-xs text-ink-faint">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'department', label: 'Department' },
    { key: 'region', label: 'Region' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusPill label={row.status} tone={STATUS_TONE[row.status] ?? 'neutral'} />,
    },
    { key: 'joinedAt', label: 'Joined' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-faint">
          {administrators.length} ops staff across {REGIONS.length} regions.
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90 ${accentClasses.bg}`}
        >
          <UserPlus className="h-4 w-4" />
          Invite Administrator
        </button>
      </div>

      <DataTable columns={columns} rows={administrators} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Invite Administrator">
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Full name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
              placeholder="e.g. Priyanka Shah"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
              placeholder="name@olma.io"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Department</label>
              <select
                value={form.department}
                onChange={(event) => setForm((f) => ({ ...f, department: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                {DEPARTMENTS.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Region</label>
              <select
                value={form.region}
                onChange={(event) => setForm((f) => ({ ...f, region: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`rounded-xl px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90 ${accentClasses.bg}`}
            >
              Send Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
