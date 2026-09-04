import { useState } from 'react';
import Modal from '../../components/shared/Modal';
import StatusPill from '../../components/shared/StatusPill';
import { mySubscription } from '../../data/mockData';

export default function SubscriptionManagement() {
  const [subscription, setSubscription] = useState(mySubscription);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const isActive = subscription.status === 'Active';

  function confirmCancel() {
    setSubscription((prev) => ({ ...prev, status: 'Cancelled' }));
    setCancelModalOpen(false);
  }

  return (
    <div className="max-w-xl space-y-4">
      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">{subscription.planName}</h3>
          <StatusPill label={subscription.status} tone={isActive ? 'positive' : 'negative'} />
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-display text-3xl font-semibold text-ink">${subscription.price}</span>
          <span className="text-sm text-ink-faint">/ {subscription.billingPeriod}</span>
        </div>
        <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-ink-faint">
            <span>Member since</span>
            <span className="text-ink">{subscription.startedAt}</span>
          </div>
          <div className="flex justify-between text-ink-faint">
            <span>{isActive ? 'Renews on' : 'Access ends on'}</span>
            <span className="text-ink">{subscription.renewalDate}</span>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            disabled
            title="More plans are coming in a later phase"
            className="flex-1 cursor-not-allowed rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-faint"
          >
            Upgrade (coming soon)
          </button>
          {isActive && (
            <button
              type="button"
              onClick={() => setCancelModalOpen(true)}
              className="flex-1 rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)} title="Cancel subscription?">
        <p className="text-sm text-ink-soft">
          You'll keep access until {subscription.renewalDate}, then lose unlimited catalog access.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setCancelModalOpen(false)}
            className="rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
          >
            Keep Subscription
          </button>
          <button
            type="button"
            onClick={confirmCancel}
            className="rounded-xl bg-rose-600 px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Confirm Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
