import { useState } from 'react';
import { Button, Form, Input, InputNumber, Spin, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COURSE } from '../utils/mutations';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const CreateCourse = () => {
  // Mutation to use apollo client
  const [addCourse, { error, loading }] = useMutation(ADD_COURSE);

  const navigate = useNavigate();

  const [images, setImages] = useState({});

  const handleFormSubmit = async (values) => {
    // Get the data from file upload and save to the new FormData object
    const formData = new FormData();

    for (let i = 0; i < images?.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      // Send formData to the backend to save in the cloudinary
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

      // Throw an error if the image is not uploaded
      if (!imageData?.images) {
        throw new Error('Image size exceeds the limit');
      }

      const { data } = await addCourse({
        variables: { ...values, images: imageData?.images },
      });

      toast.success('Successfully created');
      navigate('/my-courses');
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

  return (
    <Card
      style={{
        maxWidth: 900,
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
        <h2 style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>
          Create Course
        </h2>
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
          <Button style={{marginLeft: 10}} onClick={() => { navigate('/'); }} >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateCourse;
