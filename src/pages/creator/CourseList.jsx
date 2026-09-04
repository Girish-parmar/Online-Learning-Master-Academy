import CardGrid from '../../components/shared/CardGrid';
import StatusPill from '../../components/shared/StatusPill';
import { myCourses } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

const STATUS_TONE = { Draft: 'neutral', 'In Review': 'warning', Published: 'positive' };

function CourseCard({ course }) {
  const accentClasses = getAccentClasses('creator');

  return (
    <div className="rounded-2xl border border-line bg-white/70 p-5">
      <div className="flex items-start justify-between gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${accentClasses.softBg} ${accentClasses.text}`}>
          {course.topic}
        </span>
        <StatusPill label={course.status} tone={STATUS_TONE[course.status]} />
      </div>
      <h4 className="mt-3 font-display text-base font-semibold text-ink">{course.title}</h4>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
        <span>{course.level}</span>
        <span>{course.lessons} lessons</span>
        <span>{course.durationHours}h</span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-ink-faint">
        <span>{course.students.toLocaleString()} students</span>
        <span>{course.rating > 0 ? `${course.rating} rating` : 'No ratings yet'}</span>
      </div>
    </div>
  );
}

export default function CourseList() {
  return (
    <CardGrid
      items={myCourses}
      columns={3}
      renderItem={(course) => <CourseCard course={course} />}
      emptyMessage="You haven't created a course yet."
    />
  );
}
