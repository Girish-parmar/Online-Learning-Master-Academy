import { Check } from 'lucide-react';
import { subscriptionPlan, featuredCourse } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

export default function ViewPlans() {
  const accentClasses = getAccentClasses('subscriber');

  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm text-ink-faint">
        Compare subscribing for unlimited access against buying one course outright.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className={`rounded-2xl border-2 ${accentClasses.border} bg-white/70 p-6`}>
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${accentClasses.softBg} ${accentClasses.text}`}>
            Best value
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-ink">{subscriptionPlan.name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-3xl font-semibold text-ink">${subscriptionPlan.price}</span>
            <span className="text-sm text-ink-faint">/ {subscriptionPlan.billingPeriod}</span>
          </div>
          <ul className="mt-5 space-y-2.5">
            {subscriptionPlan.entitlements.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentClasses.text}`} strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 ${accentClasses.bg}`}
          >
            Subscribe
          </button>
        </div>

        <div className="rounded-2xl border border-line bg-white/70 p-6">
          <span className="inline-flex rounded-full bg-paper-deep/60 px-2 py-0.5 text-xs font-medium text-ink-soft">
            One-off purchase
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-ink">{featuredCourse.title}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-3xl font-semibold text-ink">${featuredCourse.price}</span>
            <span className="text-sm text-ink-faint">one-time</span>
          </div>
          <ul className="mt-5 space-y-2.5">
            <li className="flex items-start gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} />
              Lifetime access to this one course
            </li>
            <li className="flex items-start gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} />
              Learn at your own pace, no subscription needed
            </li>
            <li className="text-sm text-ink-faint">No access to the rest of the catalog</li>
          </ul>
          <button
            type="button"
            className="mt-6 w-full rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-paper-alt/60"
          >
            Buy this course
          </button>
        </div>
      </div>
    </div>
  );
}
