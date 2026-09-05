import { useState } from 'react';
import { Eye } from 'lucide-react';
import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import Modal from '../../components/shared/Modal';
import { emailTemplates } from '../../data/mockData';

const STATUS_TONE = { Active: 'positive', Draft: 'neutral' };

export default function TemplateLibrary() {
  const [previewId, setPreviewId] = useState(null);
  const previewTemplate = emailTemplates.find((template) => template.id === previewId) ?? null;

  const columns = [
    {
      key: 'name',
      label: 'Template',
      render: (row) => (
        <div>
          <div className="font-medium text-ink">{row.name}</div>
          <div className="text-xs text-ink-faint">{row.trigger}</div>
        </div>
      ),
    },
    { key: 'subject', label: 'Subject line' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusPill label={row.status} tone={STATUS_TONE[row.status] ?? 'neutral'} />,
    },
    { key: 'updatedAt', label: 'Last updated' },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) => (
        <button
          type="button"
          onClick={() => setPreviewId(row.id)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:bg-paper-alt/60"
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-faint">
        Transactional templates only — campaign and marketing sends arrive in a later phase.
      </p>

      <DataTable columns={columns} rows={emailTemplates} />

      <Modal open={!!previewTemplate} onClose={() => setPreviewId(null)} title={previewTemplate?.name ?? ''}>
        {previewTemplate && (
          <div className="space-y-3">
            <div className="rounded-xl border border-line bg-paper-alt/40 px-4 py-3">
              <p className="text-xs text-ink-faint">Subject</p>
              <p className="mt-0.5 text-sm font-medium text-ink">{previewTemplate.subject}</p>
            </div>
            <div className="rounded-xl border border-line bg-paper-alt/40 px-4 py-3">
              <p className="text-xs text-ink-faint">Body preview</p>
              <p className="mt-1 text-sm leading-relaxed text-ink">{previewTemplate.previewBody}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-ink-faint">
              <span>Trigger: {previewTemplate.trigger}</span>
              <StatusPill label={previewTemplate.status} tone={STATUS_TONE[previewTemplate.status] ?? 'neutral'} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
