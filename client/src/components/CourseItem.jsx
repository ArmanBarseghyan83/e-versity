import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Card, Rate } from 'antd';
const { Meta } = Card;
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { SAVE_COURSE, UNSAVE_COURSE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
// import { removeFromCart, addToCart } from '../slices/cartSlice';
// import { IoCartOutline, IoCart } from 'react-icons/io5';
import { toast } from 'react-toastify';

const CourseItem = ({ title, url, _id, price, reviews }) => {
  // Get items from global state
  const { isTokenExpired } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // Queries and mutations to use apollo client
  const [saveCourse, { error: saveError, loading: saveLoading }] =
    useMutation(SAVE_COURSE);
  const [unsaveCourse, { error, loading }] = useMutation(UNSAVE_COURSE);
  const { data, refetch } = useQuery(QUERY_ME);
  // Calculate average rating
  const avgRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
  const saveHandler = async () => {
    try {
      await saveCourse({
        variables: { id: _id },
      });
      refetch();
    } catch (err) {
      toast.error('Something went wrong');
    }
  };
  const unsaveHandler = async () => {
    try {
      await unsaveCourse({
        variables: { id: _id },
      });
      refetch();
    } catch (error) {
      toast.err('Something went wrong');
    }
  };
  // Use functions from authSlice to dispatch the actions
  const addCartHandler = () => {
    dispatch(addToCart({ title, url, _id, price }));
  };
  const removeCartHandler = () => {
    dispatch(removeFromCart(_id));
  };
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
        {reviews.length} reviews
      </div>
      <p>$ {price}</p>
      {/* Allow save, unsave, add to cart only if the user is logged in */}
      {!isTokenExpired && (
        <div className="heart">
          {data?.me?.savedCourses.some((obj) => obj._id === _id) ? (
            <HeartFilled onClick={unsaveHandler} />
          ) : (
            <HeartOutlined onClick={saveHandler} />
          )}
          {cartItems.some((obj) => obj._id === _id) ? (
            <IoCart style={{ cursor: 'pointer' }} onClick={removeCartHandler} />
          ) : (
            <IoCartOutline
              style={{ cursor: 'pointer' }}
              onClick={addCartHandler}
            />
          )}
        </div>
      )}
    </Card>
  );
};
export default CourseItem;