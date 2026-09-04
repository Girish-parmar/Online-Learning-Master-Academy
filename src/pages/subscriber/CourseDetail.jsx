import { Star, Check, ShoppingCart } from 'lucide-react';
import { featuredCourse, courseDetailCurriculum } from '../../data/mockData';
import { getAccentClasses } from '../../config/accent';

export default function CourseDetail() {
  const accentClasses = getAccentClasses('subscriber');

  return (
    <div className="max-w-3xl space-y-8">
      <div className="rounded-2xl border border-line bg-white/70 p-8">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${accentClasses.softBg} ${accentClasses.text}`}>
          {featuredCourse.topic}
        </span>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink">{featuredCourse.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-faint">
          <span>By {featuredCourse.creator}</span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {featuredCourse.rating} ({featuredCourse.ratingCount.toLocaleString()} ratings)
          </span>
          <span>{featuredCourse.students.toLocaleString()} students</span>
          <span>{featuredCourse.level}</span>
          <span>{featuredCourse.language}</span>
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-line pt-6">
          <span className="font-display text-4xl font-semibold text-ink">${featuredCourse.price}</span>
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${accentClasses.bg}`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-ink">What you'll learn</h3>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {featuredCourse.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2.5 text-sm text-ink">
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentClasses.text}`} strokeWidth={2} />
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-line bg-white/70 p-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Curriculum preview</h3>
          <span className="text-xs text-ink-faint">
            {featuredCourse.lessons} lessons, {featuredCourse.durationHours}h total
          </span>
        </div>
        <ul className="divide-y divide-line/70">
          {courseDetailCurriculum.sections.map((section, index) => (
            <li key={section.id} className="flex items-center gap-3 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-subscriber-soft text-xs font-semibold text-subscriber">
                {index + 1}
              </span>
              <span className="flex-1 text-sm text-ink">{section.title}</span>
              <span className="text-xs text-ink-faint">{section.lessonCount} lessons</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
