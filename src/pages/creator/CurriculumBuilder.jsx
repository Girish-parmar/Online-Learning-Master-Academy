import { Video, FileText, HelpCircle } from 'lucide-react';
import { studioCourse, courseCurriculum } from '../../data/mockData';

const LESSON_TYPE_META = {
  video: { icon: Video, label: 'Video' },
  article: { icon: FileText, label: 'Article' },
  quiz: { icon: HelpCircle, label: 'Quiz' },
};

export default function CurriculumBuilder() {
  const totalLessons = courseCurriculum.sections.reduce((sum, section) => sum + section.lessons.length, 0);

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-faint">
        Editing <span className="font-medium text-ink">{studioCourse.title}</span> — {courseCurriculum.sections.length}{' '}
        sections, {totalLessons} lessons total. Video, article, and quiz items only in Phase 1.
      </p>

      <div className="space-y-4">
        {courseCurriculum.sections.map((section, sectionIndex) => (
          <div key={section.id} className="rounded-2xl border border-line bg-white/70 p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-creator-soft text-xs font-semibold text-creator">
                {sectionIndex + 1}
              </span>
              <h4 className="font-display text-base font-semibold text-ink">{section.title}</h4>
            </div>
            <ul className="mt-2 divide-y divide-line/70">
              {section.lessons.map((lesson) => {
                const meta = LESSON_TYPE_META[lesson.type];
                const Icon = meta.icon;
                return (
                  <li key={lesson.id} className="flex items-center gap-3 py-2.5 pl-8">
                    <Icon className="h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.75} />
                    <span className="flex-1 text-sm text-ink">{lesson.title}</span>
                    <span className="text-xs text-ink-faint">{meta.label}</span>
                    <span className="w-14 text-right text-xs text-ink-faint">{lesson.durationMinutes} min</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
