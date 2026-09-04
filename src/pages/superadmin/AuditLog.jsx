import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import { auditLogEntries } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const SEVERITY_TONE = {
  Routine: 'neutral',
  Sensitive: 'warning',
  Critical: 'negative',
};

const SEVERITY_OPTIONS = ['All', 'Routine', 'Sensitive', 'Critical'];

const COLUMNS = [
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'actor', label: 'Actor' },
  { key: 'action', label: 'Action' },
  { key: 'target', label: 'Target' },
  {
    key: 'severity',
    label: 'Severity',
    render: (row) => <StatusPill label={row.severity} tone={SEVERITY_TONE[row.severity]} />,
  },
];

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('All');
  const accentClasses = getAccentClasses('superadmin');

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return auditLogEntries.filter((entry) => {
      const matchesSeverity = severity === 'All' || entry.severity === severity;
      const matchesSearch =
        !term ||
        entry.actor.toLowerCase().includes(term) ||
        entry.action.toLowerCase().includes(term) ||
        entry.target.toLowerCase().includes(term);
      return matchesSeverity && matchesSearch;
    });
  }, [search, severity]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search actor, action, or target"
            className="w-full rounded-xl border border-line bg-white/70 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {SEVERITY_OPTIONS.map((option) => {
            const isActive = severity === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSeverity(option)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? `${accentClasses.border} ${accentClasses.softBg} ${accentClasses.text}`
                    : 'border-line text-ink-soft hover:bg-white/60'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <DataTable columns={COLUMNS} rows={filteredRows} emptyMessage="No actions match your search." />

      <p className="text-xs text-ink-faint">
        Showing {filteredRows.length} of {auditLogEntries.length} recorded actions.
      </p>
    </div>
  );
}
