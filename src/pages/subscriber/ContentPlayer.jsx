import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Captions, Check, Video, FileText, HelpCircle } from 'lucide-react';
import ProgressBar from '../../components/shared/ProgressBar';
import { learningCurriculum, currentLessonId } from '../../data/mockData';

const SPEEDS = ['0.75x', '1x', '1.25x', '1.5x', '2x'];

const LESSON_TYPE_META = {
  video: { icon: Video, label: 'Video' },
  article: { icon: FileText, label: 'Article' },
  quiz: { icon: HelpCircle, label: 'Quiz' },
};

function findCurrentLesson() {
  for (const section of learningCurriculum.sections) {
    const lesson = section.lessons.find((item) => item.id === currentLessonId);
    if (lesson) return lesson;
  }
  return null;
}

export default function ContentPlayer() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');
  const [captionsOn, setCaptionsOn] = useState(true);
  const currentLesson = findCurrentLesson();

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 space-y-4">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-ink">
          <button
            type="button"
            onClick={() => setPlaying((prev) => !prev)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 pl-1" />}
          </button>
          {captionsOn && (
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-black/60 px-3 py-1 text-sm text-white">
              Sample caption text would appear here.
            </span>
          )}
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink">{currentLesson.title}</p>
          <ProgressBar value={35} accent="subscriber" showValue={false} />
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-line bg-white/70 p-4">
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg p-2 text-ink-soft transition hover:bg-paper-alt/60">
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((prev) => !prev)}
              className="rounded-lg p-2 text-ink-soft transition hover:bg-paper-alt/60"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button type="button" className="rounded-lg p-2 text-ink-soft transition hover:bg-paper-alt/60">
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={speed}
              onChange={(event) => setSpeed(event.target.value)}
              className="rounded-lg border border-line bg-white px-2 py-1.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {SPEEDS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setCaptionsOn((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                captionsOn
                  ? 'border-subscriber bg-subscriber-soft text-subscriber'
                  : 'border-line text-ink-soft hover:bg-paper-alt/60'
              }`}
            >
              <Captions className="h-3.5 w-3.5" />
              CC
            </button>
          </div>
        </div>
      </div>

      <aside className="w-full shrink-0 space-y-4 rounded-2xl border border-line bg-white/70 p-4 lg:w-72">
        {learningCurriculum.sections.map((section) => (
          <div key={section.id}>
            <p className="mb-1.5 px-1 text-xs font-medium text-ink-soft">{section.title}</p>
            <ul className="space-y-1">
              {section.lessons.map((lesson) => {
                const meta = LESSON_TYPE_META[lesson.type];
                const Icon = meta.icon;
                const isCurrent = lesson.id === currentLessonId;
                return (
                  <li key={lesson.id}>
                    <div
                      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm ${
                        isCurrent ? 'bg-subscriber-soft text-subscriber' : 'text-ink-soft'
                      }`}
                    >
                      {lesson.completed ? (
                        <Check className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                      ) : (
                        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      )}
                      <span className="flex-1 truncate">{lesson.title}</span>
                      <span className="text-xs text-ink-faint">{lesson.durationMinutes}m</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>
    </div>
  );
}
