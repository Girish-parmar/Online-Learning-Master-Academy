import { Star } from 'lucide-react';
import { getAccentClasses } from '../../config/accent';

export default function CourseCard({ course, enrolled = false }) {
  const accentClasses = getAccentClasses('subscriber');

  return (
    <div className="rounded-2xl border border-line bg-white/70 p-5">
      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${accentClasses.softBg} ${accentClasses.text}`}>
        {course.topic}
      </span>
      <h4 className="mt-3 font-display text-base font-semibold text-ink">{course.title}</h4>
      <div className="mt-1 flex items-center gap-2 text-xs text-ink-faint">
        <span>By {course.creator}</span>
        <span>{course.level}</span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="flex items-center gap-1 text-xs text-ink-faint">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {course.rating} ({course.ratingCount.toLocaleString()})
        </span>
        {enrolled ? (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Enrolled</span>
        ) : (
          <span className="font-display text-base font-semibold text-ink">${course.price}</span>
        )}
      </div>
    </div>
  );
}
