import { useState } from 'react';
import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import Modal from '../../components/shared/Modal';
import { transactions, currentSubscriber } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const STATUS_TONE = { Paid: 'positive', Refunded: 'neutral', Pending: 'info', 'Refund Requested': 'warning' };

export default function PurchaseHistory() {
  const [myTransactions] = useState(() => transactions.filter((txn) => txn.buyer === currentSubscriber.name));
  const [statusOverrides, setStatusOverrides] = useState({});
  const [refundTarget, setRefundTarget] = useState(null);
  const [reason, setReason] = useState('');
  const accentClasses = getAccentClasses('subscriber');

  function openRefund(txn) {
    setRefundTarget(txn);
    setReason('');
  }

  function confirmRefund(event) {
    event.preventDefault();
    if (!refundTarget || !reason.trim()) return;
    setStatusOverrides((prev) => ({ ...prev, [refundTarget.id]: 'Refund Requested' }));
    setRefundTarget(null);
  }

  const rows = myTransactions.map((txn) => ({ ...txn, status: statusOverrides[txn.id] ?? txn.status }));

  const columns = [
    { key: 'courseTitle', label: 'Course' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount', align: 'right', render: (row) => `$${row.amount.toFixed(2)}` },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusPill label={row.status} tone={STATUS_TONE[row.status] ?? 'neutral'} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) =>
        row.status === 'Paid' ? (
          <button
            type="button"
            onClick={() => openRefund(row)}
            className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:bg-paper-alt/60"
          >
            Request Refund
          </button>
        ) : null,
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable columns={columns} rows={rows} emptyMessage="No purchases yet." />

      <Modal
        open={!!refundTarget}
        onClose={() => setRefundTarget(null)}
        title={refundTarget ? `Request refund — ${refundTarget.courseTitle}` : ''}
      >
        <form onSubmit={confirmRefund} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Reason for refund</label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Tell us what went wrong…"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setRefundTarget(null)}
              className="rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`rounded-xl px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90 ${accentClasses.bg}`}
            >
              Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
