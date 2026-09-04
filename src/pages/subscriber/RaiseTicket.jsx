import { useState } from 'react';
import { Send } from 'lucide-react';
import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import { tickets, myEnrolledCourses, currentSubscriber } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const STATUS_TONE = { Open: 'info', 'In Progress': 'warning', Resolved: 'positive', Closed: 'neutral' };
const PRIORITY_TONE = { Low: 'neutral', Medium: 'info', High: 'warning', Urgent: 'negative' };

const COURSE_OPTIONS = ['—', ...myEnrolledCourses.map((item) => item.title)];

const EMPTY_FORM = { subject: '', course: COURSE_OPTIONS[0], priority: 'Medium', description: '' };

const COLUMNS = [
  { key: 'subject', label: 'Subject' },
  { key: 'course', label: 'Course' },
  {
    key: 'priority',
    label: 'Priority',
    render: (row) => <StatusPill label={row.priority} tone={PRIORITY_TONE[row.priority]} />,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <StatusPill label={row.status} tone={STATUS_TONE[row.status]} />,
  },
  { key: 'updatedAt', label: 'Updated' },
];

export default function RaiseTicket() {
  const [ticketList, setTicketList] = useState(() =>
    tickets.filter((ticket) => ticket.submittedBy === currentSubscriber.name),
  );
  const [form, setForm] = useState(EMPTY_FORM);
  const accentClasses = getAccentClasses('subscriber');

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.subject.trim()) return;

    setTicketList((prev) => [
      {
        id: `tkt-new-${prev.length + 1}`,
        subject: form.subject.trim(),
        submittedBy: currentSubscriber.name,
        course: form.course,
        priority: form.priority,
        status: 'Open',
        updatedAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-base font-semibold text-ink">Your tickets</h3>
        <DataTable columns={COLUMNS} rows={ticketList} emptyMessage="You haven't raised any tickets yet." />
      </div>

      <div className="max-w-xl rounded-2xl border border-line bg-white/70 p-6">
        <h3 className="mb-4 font-display text-base font-semibold text-ink">Raise a new ticket</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Subject</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(event) => setForm((f) => ({ ...f, subject: event.target.value }))}
              placeholder="e.g. Video won't play past 3 minutes"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Related course</label>
              <select
                value={form.course}
                onChange={(event) => setForm((f) => ({ ...f, course: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                {COURSE_OPTIONS.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Priority</label>
              <select
                value={form.priority}
                onChange={(event) => setForm((f) => ({ ...f, priority: event.target.value }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                {Object.keys(PRIORITY_TONE).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) => setForm((f) => ({ ...f, description: event.target.value }))}
              placeholder="What's going on?"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <button
            type="submit"
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90 ${accentClasses.bg}`}
          >
            <Send className="h-4 w-4" />
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
