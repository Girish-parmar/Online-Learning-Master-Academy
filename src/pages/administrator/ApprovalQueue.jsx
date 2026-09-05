import { useState } from 'react';
import { Check, X as XIcon } from 'lucide-react';
import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import Modal from '../../components/shared/Modal';
import { kycApplications, courses } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const pendingSubmissions = courses.filter((course) => course.status === 'In Review');

const DECISION_TONE = { Approved: 'positive', Rejected: 'negative' };

export default function ApprovalQueue() {
  const accentClasses = getAccentClasses('administrator');
  const [kycDecisions, setKycDecisions] = useState({});
  const [submissionDecisions, setSubmissionDecisions] = useState({});
  const [rejectTarget, setRejectTarget] = useState(null);
  const [reason, setReason] = useState('');

  function approve(list, id) {
    const setter = list === 'kyc' ? setKycDecisions : setSubmissionDecisions;
    setter((prev) => ({ ...prev, [id]: { status: 'Approved' } }));
  }

  function openReject(list, id, label) {
    setRejectTarget({ list, id, label });
    setReason('');
  }

  function confirmReject(event) {
    event.preventDefault();
    if (!rejectTarget || !reason.trim()) return;
    const setter = rejectTarget.list === 'kyc' ? setKycDecisions : setSubmissionDecisions;
    setter((prev) => ({ ...prev, [rejectTarget.id]: { status: 'Rejected', reason: reason.trim() } }));
    setRejectTarget(null);
  }

  function renderActions(list, id, label, decisions) {
    const decision = decisions[id];
    if (decision) {
      return (
        <div className="flex flex-col items-end gap-0.5">
          <StatusPill label={decision.status} tone={DECISION_TONE[decision.status]} />
          {decision.reason && (
            <span className="max-w-[220px] truncate text-xs text-ink-faint" title={decision.reason}>
              {decision.reason}
            </span>
          )}
        </div>
      );
    }
    return (
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => approve(list, id)}
          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-white transition hover:opacity-90 ${accentClasses.bg}`}
        >
          <Check className="h-3.5 w-3.5" />
          Approve
        </button>
        <button
          type="button"
          onClick={() => openReject(list, id, label)}
          className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:bg-paper-alt/60"
        >
          <XIcon className="h-3.5 w-3.5" />
          Reject
        </button>
      </div>
    );
  }

  const kycColumns = [
    {
      key: 'applicantName',
      label: 'Applicant',
      render: (row) => (
        <div>
          <div className="font-medium text-ink">{row.applicantName}</div>
          <div className="text-xs text-ink-faint">{row.email}</div>
        </div>
      ),
    },
    { key: 'country', label: 'Country' },
    { key: 'submittedAt', label: 'Submitted' },
    { key: 'documentsSubmitted', label: 'Docs' },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) => renderActions('kyc', row.id, row.applicantName, kycDecisions),
    },
  ];

  const submissionColumns = [
    { key: 'title', label: 'Course' },
    { key: 'creator', label: 'Creator' },
    { key: 'topic', label: 'Topic' },
    { key: 'updatedAt', label: 'Submitted' },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) => renderActions('submission', row.id, row.title, submissionDecisions),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-base font-semibold text-ink">Creator KYC applications</h3>
        <DataTable columns={kycColumns} rows={kycApplications} emptyMessage="No pending KYC applications." />
      </div>

      <div>
        <h3 className="mb-3 font-display text-base font-semibold text-ink">Course submissions</h3>
        <DataTable columns={submissionColumns} rows={pendingSubmissions} emptyMessage="No pending course submissions." />
      </div>

      <Modal
        open={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        title={rejectTarget ? `Reject ${rejectTarget.label}` : ''}
      >
        <form onSubmit={confirmReject} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Reason</label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Explain why this is being rejected…"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setRejectTarget(null)}
              className="rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-rose-600 px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Confirm Reject
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
