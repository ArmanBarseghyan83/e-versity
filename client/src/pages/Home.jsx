import { Flex, Spin } from 'antd';
import { useQuery } from '@apollo/client';
import CourseItem from '../components/CourseItem';

// import CourseItem from '../components/courseItem';
import { APPROVED_COURSES } from '../utils/queries';

const Home = () => {
  const { data, error, loading, refetch } = useQuery(APPROVED_COURSES);
  refetch();
  // Before rendering the main content, show spinner while loading.
  if (loading) {
    return (
      <>
        {loading && (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        )}
      </>
    );
  }
  return (
    <>
      <h2>Home</h2>
      <Flex wrap="wrap" gap="large" style={{ justifyContent: 'space-evenly' }}>
        {data?.approvedCourses?.map((course) => (
          <CourseItem
            key={course?._id}
            title={course?.title}
            url={course?.images[0]?.url}
            _id={course?._id}
            price={course.price}
            reviews={course.reviews}
          />
        ))}
      </Flex>
    </>
  );
};
export default Home;