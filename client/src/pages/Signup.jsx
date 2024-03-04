import { Button, Form, Input, Spin, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { ADD_USER } from '../utils/mutations';
import { setUserInfo } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const Signup = () => {
  // Mutation to use apollo client
  const [addUser, { error, loading }] = useMutation(ADD_USER);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sign up the user
  const handleFormSubmit = async (values) => {
    try {
      const { data } = await addUser({
        variables: { ...values },
      });

      toast.success('Successfully created');
      dispatch(setUserInfo(data?.addUser?.token));
      navigate('/');
    } catch (err) {
      toast.error('User already exists');
    }
  };

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: 'auto',
        padding: '1rem',
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <h2 style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>Sign Up</h2>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
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
          </Button>
        </Form.Item>
        <div>
          Login Instead <Link to={'/login'}>here</Link>
        </div>
      </Form>
    </Card>
  );
};
export default Signup;
