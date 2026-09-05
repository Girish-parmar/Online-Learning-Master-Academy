import CardGrid from '../../components/shared/CardGrid';
import CourseCard from './CourseCard';
import EnrolledCourseCard from './EnrolledCourseCard';
import { currentSubscriber, myEnrolledCourses, recommendedCourses } from '../../data/mockData';

const firstName = (fullName) => fullName.split(' ')[0];

export default function HomePage() {
  const continueLearning = myEnrolledCourses
    .filter((item) => item.enrollment.status === 'In Progress')
    .sort((a, b) => (a.enrollment.lastAccessedAt < b.enrollment.lastAccessedAt ? 1 : -1));

  return (
    <div className="space-y-8">
      <p className="text-base text-ink-soft">
        Welcome back, {firstName(currentSubscriber.name)} — pick up where you left off.
      </p>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-ink">Continue learning</h3>
        <CardGrid
          items={continueLearning}
          columns={3}
          renderItem={(item) => <EnrolledCourseCard item={item} progressLabel="Progress" />}
          emptyMessage="Nothing in progress right now — browse the catalog to get started."
        />
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-ink">Recommended for you</h3>
        <CardGrid
          items={recommendedCourses}
          columns={3}
          renderItem={(course) => <CourseCard course={course} />}
          emptyMessage="No new recommendations right now."
        />
      </div>
    </div>
  );
}
