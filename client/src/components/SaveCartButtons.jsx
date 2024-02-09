import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { SAVE_COURSE, UNSAVE_COURSE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { removeFromCart, addToCart } from '../slices/cartSlice';
import { IoCartOutline, IoCart } from 'react-icons/io5';
import { toast } from 'react-toastify';

const SaveCartButtons = ({
  savedCourses,
  _id,
  title,
  url,
  price,
  className,
}) => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // Queries and mutations to use apollo client
  const [saveCourse] = useMutation(SAVE_COURSE);
  const [unsaveCourse] = useMutation(UNSAVE_COURSE);
  const { data, refetch } = useQuery(QUERY_ME);

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
    <div className={className}>
      {savedCourses?.some((obj) => obj._id === _id) ? (
        <HeartFilled onClick={unsaveHandler} />
      ) : (
        <HeartOutlined onClick={saveHandler} />
      )}
      {cartItems.some((obj) => obj._id === _id) ? (
        <IoCart style={{ cursor: 'pointer' }} onClick={removeCartHandler} />
      ) : (
        <IoCartOutline style={{ cursor: 'pointer' }} onClick={addCartHandler} />
      )}
    </div>
  );
};

export default SaveCartButtons;
