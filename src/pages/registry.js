import GlobalSummary from './superadmin/GlobalSummary';
import AuditLog from './superadmin/AuditLog';
import AdministratorAccounts from './superadmin/AdministratorAccounts';
import ApprovalQueue from './administrator/ApprovalQueue';
import SubscriptionPlans from './administrator/SubscriptionPlans';
import TemplateLibrary from './administrator/TemplateLibrary';
import OnboardingVerification from './creator/OnboardingVerification';
import CourseList from './creator/CourseList';
import CourseBasics from './creator/CourseBasics';
import CurriculumBuilder from './creator/CurriculumBuilder';
import MediaManager from './creator/MediaManager';
import Assessments from './creator/Assessments';
import SubmitForReview from './creator/SubmitForReview';
import EarningsDashboard from './creator/EarningsDashboard';
import RaiseTicket from './creator/RaiseTicket';

// Maps roleId -> navId -> page component. A nav item with no entry here still
// falls back to the shared EmptyState placeholder, so new roles/pages can be
// wired in incrementally without touching App.jsx.
const PAGE_REGISTRY = {
  superadmin: {
    'global-summary': GlobalSummary,
    'audit-log': AuditLog,
    administrators: AdministratorAccounts,
  },
  administrator: {
    approvals: ApprovalQueue,
    plans: SubscriptionPlans,
    templates: TemplateLibrary,
  },
  creator: {
    onboarding: OnboardingVerification,
    'my-courses': CourseList,
    'course-basics': CourseBasics,
    curriculum: CurriculumBuilder,
    media: MediaManager,
    assessments: Assessments,
    'submit-review': SubmitForReview,
    earnings: EarningsDashboard,
    support: RaiseTicket,
  },
};

export function getPageComponent(roleId, navId) {
  return PAGE_REGISTRY[roleId]?.[navId] ?? null;
}
