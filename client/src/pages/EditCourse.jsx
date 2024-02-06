import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Row, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_COURSE } from '../utils/mutations';
import { COURSE } from '../utils/queries';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const EditCourse = () => {
  const location = useLocation();
  const _id = location.pathname.split('/').pop();

  // Query to use apollo client
  const { data, loading, refetch } = useQuery(COURSE, {
    variables: { courseId: _id },
  });
  const [editCourse, { error, loading: loadingEdit }] =
    useMutation(EDIT_COURSE);

  const navigate = useNavigate();

  // Saved checked images to the stateful veriable
  const [images, setImages] = useState({});
  const [deleteImages, setDeleteImages] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDeleteImages((prev) => [...prev, value]);
    }
  };

  const handleFormSubmit = async (values) => {
    // Get the data from file upload and save to the new FormData object
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
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
      if (!imageData.images) {
        throw new Error('Image size exceeds the limit');
      }

      const { data } = await editCourse({
        variables: {
          ...values,
          id: _id,
          images: imageData?.images,
          deleteImages,
        },
      });

      toast.success('Successfully updated');
      refetch();
      navigate('/my-courses');
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
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
      <h2>Edit Course</h2>
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
          title: data?.course.title,
          description: data?.course.description,
          price: data?.course.price,
        }}
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
        <div style={{ marginBottom: '1rem' }}>Select images to delete</div>
        <Row>
          {data?.course?.images.map((image, i) => (
            <div key={image.filename}>
              <input
                id={i}
                type="checkbox"
                value={image.filename}
                onChange={handleCheckboxChange}
                style={{ position: 'absolute' }}
              />
              <label
                style={{ cursor: 'pointer', marginRight: '.5rem' }}
                htmlFor={i}
              >
                <img src={image?.url || ''} style={{ width: '6rem' }} />
              </label>
            </div>
          ))}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
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

export default EditCourse;
