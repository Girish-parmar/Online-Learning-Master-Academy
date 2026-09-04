import { useState } from 'react';
import { Pencil, Check } from 'lucide-react';
import StatusPill from '../../components/shared/StatusPill';
import Modal from '../../components/shared/Modal';
import { subscriptionPlan as seedPlan } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const STATUS_TONE = { Active: 'positive', Draft: 'neutral', Archived: 'negative' };

function toEntitlementsText(list) {
  return list.join('\n');
}

function fromEntitlementsText(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function formToState(plan) {
  return {
    name: plan.name,
    price: String(plan.price),
    billingPeriod: plan.billingPeriod,
    status: plan.status,
    entitlementsText: toEntitlementsText(plan.entitlements),
  };
}

export default function SubscriptionPlans() {
  const [plan, setPlan] = useState(seedPlan);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(() => formToState(seedPlan));
  const accentClasses = getAccentClasses('administrator');

  function openEdit() {
    setForm(formToState(plan));
    setModalOpen(true);
  }

  function handleSave(event) {
    event.preventDefault();
    setPlan((prev) => ({
      ...prev,
      name: form.name.trim() || prev.name,
      price: Number(form.price) || prev.price,
      billingPeriod: form.billingPeriod,
      status: form.status,
      entitlements: fromEntitlementsText(form.entitlementsText),
      updatedAt: new Date().toISOString().slice(0, 10),
    }));
    setModalOpen(false);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-faint">OLMA runs one subscription tier in Phase 1 — no tier comparison yet.</p>

      <div className="max-w-xl rounded-2xl border border-line bg-white/70 p-6">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">{plan.name}</h3>
          <StatusPill label={plan.status} tone={STATUS_TONE[plan.status] ?? 'neutral'} />
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-display text-3xl font-semibold text-ink">${plan.price}</span>
          <span className="text-sm text-ink-faint">/ {plan.billingPeriod}</span>
        </div>
        <ul className="mt-5 space-y-2.5">
          {plan.entitlements.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentClasses.text}`} strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-faint">
          <span>{plan.subscriberCount.toLocaleString()} active subscribers</span>
          <span>Updated {plan.updatedAt}</span>
        </div>
        <button
          type="button"
          onClick={openEdit}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
        >
          <Pencil className="h-4 w-4" />
          Edit Plan
        </button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit Plan">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Plan name</label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Price (USD)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(event) => setForm((f) => ({ ...f, price: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Billing period</label>
              <select
                value={form.billingPeriod}
                onChange={(event) => setForm((f) => ({ ...f, billingPeriod: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                <option value="month">month</option>
                <option value="year">year</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Status</label>
            <select
              value={form.status}
              onChange={(event) => setForm((f) => ({ ...f, status: event.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Entitlements (one per line)</label>
            <textarea
              rows={5}
              value={form.entitlementsText}
              onChange={(event) => setForm((f) => ({ ...f, entitlementsText: event.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
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
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
