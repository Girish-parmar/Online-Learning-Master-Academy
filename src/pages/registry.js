import GlobalSummary from './superadmin/GlobalSummary';
import AuditLog from './superadmin/AuditLog';
import AdministratorAccounts from './superadmin/AdministratorAccounts';

// Maps roleId -> navId -> page component. A nav item with no entry here still
// falls back to the shared EmptyState placeholder, so new roles/pages can be
// wired in incrementally without touching App.jsx.
const PAGE_REGISTRY = {
  superadmin: {
    'global-summary': GlobalSummary,
    'audit-log': AuditLog,
    administrators: AdministratorAccounts,
  },
};

export function getPageComponent(roleId, navId) {
  return PAGE_REGISTRY[roleId]?.[navId] ?? null;
}
