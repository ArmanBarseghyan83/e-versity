import { Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const UserEdit = () => {
  // Queries and mutations to use apollo client
  const { data, error, loading, refetch } = useQuery(QUERY_ME);
  const [editUser, { loading: loadingEdit }] = useMutation(EDIT_USER);

  const navigate = useNavigate();

  // Update the user info
  const handleFormSubmit = async (values) => {
    if (values.password == values.confirmPassword) {
      try {
        const { data } = await editUser({
          variables: { ...values },
        });
        toast.success('Successfully updated');
        refetch();
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error('Something went wrong');
    }
  };

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
      <h2>Edit User</h2>
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
        initialValues={{
          username: data?.me.username,
          email: data?.me.email,
        }}
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

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Edit
            {loadingEdit && (
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
      </Form>
    </>
  );
};

export default UserEdit;
