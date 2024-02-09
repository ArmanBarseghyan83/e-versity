import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Rate, Form, Input, Button, Spin, Card, Row, Col, Divider } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_REVIEW } from '../utils/mutations';
import { COURSE, QUERY_ME } from './../utils/queries';
import CommentList from '../components/CommentList';
import ImageCarousel from '../components/ImageCarousel';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import SaveCartButtons from '../components/SaveCartButtons';

const Course = () => {
  // Get course id from the url
  const courseId = useParams().id;

  // Get items from global state
  const { isTokenExpired } = useSelector((state) => state.auth);

  // Queries and mutations to use apollo client
  const [createReview, { loading: loadingCreate }] = useMutation(CREATE_REVIEW);
  const { data: dataMe } = useQuery(QUERY_ME);
  const { data, refetch, loading } = useQuery(COURSE, {
    variables: { courseId },
  });

  const [form] = Form.useForm();

  const handleFormSubmit = async (value) => {
    try {
      const { data } = await createReview({
        variables: {
          rating: value?.rating,
          comment: value?.comment,
          courseId,
        },
      });
      refetch();
    } catch (err) {
      toast.error(err?.message);
    }
    form.resetFields();
  };

  // Calculate the average rating
  const avgRating =
    data?.course?.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    data?.course?.reviews.length;

  // Validation for rate input
  const validateRating = (_, value) => {
    if (value < 1) {
      return Promise.reject('Rating cannot be less than 1');
    }
    return Promise.resolve();
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
    <Card>
      <Row>
        <Col span={24} md={14}>
          <h2 style={{ marginBottom: '1rem' }}>{data?.course.title}</h2>
          <div>
            <Rate disabled allowHalf value={avgRating} />{' '}
            {data?.course?.reviews.length}
            reviews
          </div>
          <div>
            Instructor: <b>{data?.course?.user?.username}</b>
          </div>
          <div style={{ margin: '.5rem 0' }}>
            Price: <b>$ {data?.course?.price}</b>
          </div>
          <div>Description: {data?.course?.description}</div>
          <div style={{ marginTop: '1rem' }}>
            {!isTokenExpired && (
              <SaveCartButtons
                savedCourses={dataMe?.me?.savedCourses}
                _id={data?.course?._id}
                title={data?.course?.title}
                url={data?.course?.images[0].url}
                price={data?.course?.price}
                className={'course-icon-buttons'}
              />
            )}
          </div>
        </Col>
        <Col span={24} md={10}>
          <ImageCarousel images={data?.course?.images} />
        </Col>
      </Row>
      <Divider />
      <Row>
        {/* Allow users to review only if they are logged in and if the purchase the course */}
        {!isTokenExpired &&
          dataMe?.me?.myLearning.some(
            (obj) => obj._id === data?.course._id
          ) && (
            <Col span={24} md={12}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                Write a Review
              </h3>
              <Form
                form={form}
                name="basic"
                style={{
                  maxWidth: 500,
                }}
                onFinish={handleFormSubmit}
                layout="vertical"
                initialValues={{
                  rating: 1,
                }}
              >
                <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your tating!',
                    },
                    {
                      validator: validateRating,
                    },
                  ]}
                >
                  <Rate allowHalf />
                </Form.Item>
                <Form.Item
                  label="Comment"
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your comment!',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit{' '}
                    {loadingCreate && (
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
            </Col>
          )}
        <Col span={24} md={12}>
          <CommentList reviews={data?.course?.reviews} loaidng={loading} />
        </Col>
      </Row>
    </Card>
  );
};

export default Course;
