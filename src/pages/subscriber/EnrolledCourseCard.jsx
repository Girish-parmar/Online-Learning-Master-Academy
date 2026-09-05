import ProgressBar from '../../components/shared/ProgressBar';

export default function EnrolledCourseCard({ item, progressLabel }) {
  return (
    <div className="rounded-2xl border border-line bg-white/70 p-5">
      <span className="inline-flex rounded-full bg-subscriber-soft px-2 py-0.5 text-xs font-medium text-subscriber">
        {item.topic}
      </span>
      <h4 className="mt-3 font-display text-base font-semibold text-ink">{item.title}</h4>
      <p className="mt-1 text-xs text-ink-faint">By {item.creator}</p>
      <div className="mt-4">
        <ProgressBar value={item.enrollment.progress} accent="subscriber" label={progressLabel ?? item.enrollment.status} />
      </div>
    </div>
  );
}
