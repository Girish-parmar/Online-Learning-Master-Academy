import { useState } from 'react';
import { CreditCard, CheckCircle2, Tag as TagIcon } from 'lucide-react';
import { featuredCourse } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const VALID_PROMO_CODE = 'WELCOME10';
const DISCOUNT_RATE = 0.1;

export default function CartCheckout() {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [paid, setPaid] = useState(false);
  const accentClasses = getAccentClasses('subscriber');

  const subtotal = featuredCourse.price;
  const discount = appliedPromo ? subtotal * DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  function applyPromo(event) {
    event.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === VALID_PROMO_CODE) {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('That code is not valid.');
      setAppliedPromo(null);
    }
  }

  if (paid) {
    return (
      <div className="max-w-md rounded-2xl border border-line bg-white/70 p-8 text-center">
        <CheckCircle2 className={`mx-auto h-10 w-10 ${accentClasses.text}`} />
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">You're enrolled</h3>
        <p className="mt-2 text-sm text-ink-faint">{featuredCourse.title} has been added to My Courses.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-4">
      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-ink">Order summary</h3>
        <div className="flex items-center justify-between border-b border-line pb-4 text-sm">
          <div>
            <div className="font-medium text-ink">{featuredCourse.title}</div>
            <div className="text-xs text-ink-faint">By {featuredCourse.creator}</div>
          </div>
          <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
        </div>

        <form onSubmit={applyPromo} className="mt-4 flex items-end gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-ink-soft">Discount code</label>
            <input
              type="text"
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
              placeholder="e.g. WELCOME10"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl border border-line px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-alt/60"
          >
            Apply
          </button>
        </form>
        {promoError && <p className="mt-1.5 text-xs text-rose-700">{promoError}</p>}
        {appliedPromo && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-700">
            <TagIcon className="h-3.5 w-3.5" />
            {appliedPromo} applied — 10% off
          </p>
        )}

        <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-ink-faint">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {appliedPromo && (
            <div className="flex justify-between text-emerald-700">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-display text-lg font-semibold text-ink">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaid(true)}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${accentClasses.bg}`}
      >
        <CreditCard className="h-4 w-4" />
        Pay ${total.toFixed(2)}
      </button>
    </div>
  );
}
