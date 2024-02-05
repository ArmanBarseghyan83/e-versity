import { Button, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { ADD_USER } from '../utils/mutations';
import { setUserInfo } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const Signup = () => {
  const [addUser, { error, loading }] = useMutation(ADD_USER);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      const { data } = await addUser({
        variables: { ...values },
      });

      toast.success('Successfully created')
      dispatch(setUserInfo(data.addUser.token));
      navigate('/');
    } catch (err) {
      toast.error('User already exists')
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        style={{
          maxWidth: 800,
          margin: 'auto',
          padding: '1rem',
        }}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
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
          Or Login <Link to={'/login'}>here</Link>
        </div>
      </Form>
    </>
  );
};
export default Signup;
