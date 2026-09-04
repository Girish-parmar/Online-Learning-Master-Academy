import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import { studioCourse, quizzes } from '../../data/mockData';

const STATUS_TONE = { Ready: 'positive', Draft: 'neutral' };

const COLUMNS = [
  {
    key: 'title',
    label: 'Quiz',
    render: (row) => (
      <div>
        <div className="font-medium text-ink">{row.title}</div>
        <div className="text-xs text-ink-faint">{row.linkedSection}</div>
      </div>
    ),
  },
  { key: 'questionCount', label: 'Questions' },
  { key: 'passingScore', label: 'Passing score', render: (row) => `${row.passingScore}%` },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <StatusPill label={row.status} tone={STATUS_TONE[row.status] ?? 'neutral'} />,
  },
];

export default function Assessments() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-faint">
        Editing <span className="font-medium text-ink">{studioCourse.title}</span> — {quizzes.length} quizzes in the
        bank so far.
      </p>
      <DataTable columns={COLUMNS} rows={quizzes} emptyMessage="No quizzes created yet." />
    </div>
  );
}
