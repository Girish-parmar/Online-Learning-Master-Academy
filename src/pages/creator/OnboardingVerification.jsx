import ChecklistCard from '../../components/shared/ChecklistCard';
import { onboardingChecklist, currentCreator } from '../../data/mockData';

export default function OnboardingVerification() {
  const remaining = onboardingChecklist.filter((item) => !item.done).length;

  return (
    <div className="max-w-xl space-y-4">
      <p className="text-sm text-ink-faint">
        {remaining === 0
          ? `${currentCreator.name}, your profile is fully verified.`
          : `${currentCreator.name}, ${remaining} item${remaining === 1 ? '' : 's'} still ${remaining === 1 ? 'needs' : 'need'} attention before payouts are unblocked.`}
      </p>
      <ChecklistCard title="Profile completion" items={onboardingChecklist} accent="creator" />
    </div>
  );
}
