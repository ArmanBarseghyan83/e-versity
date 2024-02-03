import { Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const UserEdit = () => {
  const { data, error, loading, refetch } = useQuery(QUERY_ME);
  const [editUser] = useMutation(EDIT_USER);

  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    if (values.password == values.confirmPassword) {
      try {
        const { data } = await editUser({
          variables: { ...values },
        });
        refetch();
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('must mutch');
    }
  };

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
      >
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
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
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserEdit;
