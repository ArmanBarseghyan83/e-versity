
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { Table, Button, Spin, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteFilled, LoadingOutlined } from '@ant-design/icons';
import { removeFromCart, clearCart } from '../slices/cartSlice';
import { PLACE_ORDER } from '../utils/mutations';
import { toast } from 'react-toastify';

const { Column } = Table;

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // Mutation to use apollo client
  const [placeOrder, { error, loading }] = useMutation(PLACE_ORDER);

  const dispatch = useDispatch();

  // Map over the cartItems to create the data for the table
  const data = cartItems?.map((item) => ({
    key: item._id,
    title: <Link to={`/course/${item._id}`}>{item.title}</Link>,
    price: <>$ {item.price}</>,
    image: item?.url,
  }));

  // Calculate the total price of the cart items
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  const ids = cartItems.map((item) => item._id);

  const placeOrderHandler = async () => {
    try {
      await placeOrder({
        variables: { ids },
      });
      dispatch(clearCart());
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Button
        style={{ marginBottom: '.5rem' }}
        onClick={placeOrderHandler}
        type="primary"
      >
        Place Order
        <b>
          {' '}
          (Total: ${totalPrice})
          {loading && (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 16,
                    color: 'white',
                    marginLeft: '.5rem',
                  }}
                  spin
                />
              }
            />
          )}
        </b>
      </Button>
      <Table
        dataSource={cartItems?.length ? data : []}
        pagination={{
          pageSize: 6,
        }}
      >
        <Column
          title="Image"
          key="image"
          render={(record) => (
            <img style={{ width: '3rem' }} src={record?.image} alt="image" />
          )}
        />
        <Column title="Title" dataIndex="title" key="title" />

        <Column title="Price" dataIndex="price" key="price" />

        <Column
          key="delete"
          render={(record) => (
            <Popconfirm
              title="Delete the course"
              description="Are you sure to delete this course?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => dispatch(removeFromCart(record?.key))}
            >
              <Link role="button">
                <DeleteFilled />
              </Link>
            </Popconfirm>
          )}
        />
      </Table>
    </>
  );
};

export default Cart;
