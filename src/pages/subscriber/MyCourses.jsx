import CardGrid from '../../components/shared/CardGrid';
import EnrolledCourseCard from './EnrolledCourseCard';
import { myEnrolledCourses } from '../../data/mockData';

export default function MyCourses() {
  return (
    <CardGrid
      items={myEnrolledCourses}
      columns={3}
      renderItem={(item) => <EnrolledCourseCard item={item} />}
      emptyMessage="You haven't enrolled in any courses yet."
    />
  );
}
