import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Rate } from 'antd';
import { QUERY_ME } from '../utils/queries';
import SaveCartButtons from './SaveCartButtons';

const CourseItem = ({ title, url, _id, price, reviews }) => {
  // Get items from global state
  const { isTokenExpired } = useSelector((state) => state.auth);

  // Querie to use apollo client
  const { data, refetch } = useQuery(QUERY_ME);

  // Calculate average rating
  const avgRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  return (
    <Card
      style={{ cursor: 'default' }}
      hoverable
      cover={
        <Link to={`/course/${_id}`}>
          <img
            style={{
              width: 300,
            }}
            alt="example"
            src={url}
          />
        </Link>
      }
    >
      <p style={{ fontSize: '1.4rem' }}>{title}</p>
      <div style={{ margin: '1rem 0' }}>
        <Rate
          style={{ marginRight: '1rem', fontSize: '1rem' }}
          disabled
          allowHalf
          value={avgRating}
        />
        {reviews?.length} reviews
      </div>
      <p>$ {price}</p>
      {!isTokenExpired && (
        <SaveCartButtons
          savedCourses={data?.me?.savedCourses}
          _id={_id}
          title={title}
          url={url}
          price={price}
          className={'courseItem-icon-buttons'}
        />
      )}
    </Card>
  );
};

export default CourseItem;
