import { useState } from 'react';
import { Button, Form, Input, InputNumber, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COURSE } from '../utils/mutations';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const CreateCourse = () => {
  const [addCourse, { error, loading }] = useMutation(ADD_COURSE);

  const navigate = useNavigate();

  const [images, setImages] = useState({});

  const handleFormSubmit = async (values) => {
    const formData = new FormData();

    for (let i = 0; i < images?.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const res = await fetch(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001/upload'
          : '/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const imageData = await res.json();

      const { data } = await addCourse({
        variables: { ...values, images: imageData?.images },
      });

      toast.success('Successfully created');
      navigate('/my-courses');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <h2>Create Course</h2>
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
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input description!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input price!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Images">
          <input
            onChange={(e) => setImages(e.target.files)}
            type="file"
            multiple
          />
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
      </Form>
    </>
  );
};

export default CreateCourse;
