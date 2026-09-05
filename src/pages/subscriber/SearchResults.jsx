import { useMemo, useState } from 'react';
import CardGrid from '../../components/shared/CardGrid';
import CourseCard from './CourseCard';
import { courses, enrollments } from '../../data/mockData';

const enrolledCourseIds = new Set(enrollments.map((enrollment) => enrollment.courseId));
const publishedCourses = courses.filter((course) => course.status === 'Published');

const CATEGORIES = ['All', ...new Set(publishedCourses.map((course) => course.topic))];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const LANGUAGES = ['All', ...new Set(publishedCourses.map((course) => course.language))];
const PRICE_OPTIONS = [
  { label: 'Any price', value: Infinity },
  { label: 'Under $50', value: 50 },
  { label: 'Under $75', value: 75 },
  { label: 'Under $100', value: 100 },
];
const RATING_OPTIONS = [
  { label: 'Any rating', value: 0 },
  { label: '4.0 and up', value: 4.0 },
  { label: '4.5 and up', value: 4.5 },
  { label: '4.8 and up', value: 4.8 },
];

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function SearchResults() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [language, setLanguage] = useState('All');
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minRating, setMinRating] = useState(0);

  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    return publishedCourses.filter((course) => {
      const matchesSearch =
        !term || course.title.toLowerCase().includes(term) || course.creator.toLowerCase().includes(term);
      const matchesCategory = category === 'All' || course.topic === category;
      const matchesLevel = level === 'All' || course.level === level;
      const matchesLanguage = language === 'All' || course.language === language;
      const matchesPrice = course.price <= maxPrice;
      const matchesRating = course.rating >= minRating;
      return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesPrice && matchesRating;
    });
  }, [search, category, level, language, maxPrice, minRating]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="w-full shrink-0 space-y-5 rounded-2xl border border-line bg-white/70 p-5 lg:w-64">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-soft">Search</label>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Course or creator"
            className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <FilterSelect label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
        <FilterSelect label="Level" value={level} onChange={setLevel} options={LEVELS} />
        <FilterSelect label="Language" value={language} onChange={setLanguage} options={LANGUAGES} />
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-soft">Price</label>
          <select
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {PRICE_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-soft">Rating</label>
          <select
            value={minRating}
            onChange={(event) => setMinRating(Number(event.target.value))}
            className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {RATING_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <div className="flex-1">
        <p className="mb-3 text-sm text-ink-faint">
          {results.length} of {publishedCourses.length} courses
        </p>
        <CardGrid
          items={results}
          columns={3}
          renderItem={(course) => <CourseCard course={course} enrolled={enrolledCourseIds.has(course.id)} />}
          emptyMessage="No courses match your filters."
        />
      </div>
    </div>
  );
}
