import { Button, Form, Input, Spin, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { setUserInfo } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const Login = () => {
  // Mutation to use apollo client
  const [login, { error, loading }] = useMutation(LOGIN_USER);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutAdminHandler = async () => {
    try {
      const { data } = await login({
        variables: { email: 'armanbarseghyan83@gmail.com', password: '123456' },
      });

      toast.success('Successfully logged in');
      dispatch(setUserInfo(data?.login?.token));
      navigate('/');
    } catch (err) {
      toast.error('No records found');
    }
  };

  // Login the user
  const handleFormSubmit = async (values) => {
    try {
      const { data } = await login({
        variables: { ...values },
      });

      toast.success('Successfully logged in');
      dispatch(setUserInfo(data?.login?.token));
      navigate('/');
    } catch (err) {
      toast.error('No records found');
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
        <h2 style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>Login</h2>
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

        <div style={{ marginBottom: '1rem' }}>
          Or check out my
          <Button
            onClick={checkoutAdminHandler}
            style={{ marginLeft: '.6rem' }}
            type="default"
          >
            admin account
          </Button>
        </div>

        <div>
          Sign Up Instead <Link to={'/signup'}>here</Link>
        </div>
      </Form>
    </Card>
  );
};
export default Login;
