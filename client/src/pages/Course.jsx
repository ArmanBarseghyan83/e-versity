import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Rate, Form, Input, Button, Spin, Card, Row, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { COURSE_PAGE } from './../utils/queries';
import ImageCarousel from '../components/ImageCarousel';


const { TextArea } = Input;
 

const Course = () => {
 const [value, setValue] = useState(3);
  const courseId = useParams().id;
  const { data, refetch, loading } = useQuery(COURSE_PAGE, {
    variables: { courseId },
  });

console.log(data?.course);
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
        <Col style={{ padding: '0 1rem 1rem 1rem' }} span={24} md={12}>
          <h2 style={{ margin: '1rem 0' }}>{data?.course.title}</h2>
          <div>
            <Rate disabled allowHalf value='3.5' />{' '}
            {data?.course?.reviews.length}
            reviews
          </div>
          <p style={{ margin: '1rem 0' }}>Price: ${data?.course.price}</p>
          <p>Description: {data?.course.description}</p>
          <div style={{ marginTop: '1rem' }}>
            <Button style={{ marginRight: '1rem' }}>Add To Cart</Button>
            <Button>Save</Button>
          </div>
        </Col>
        <Col span={24} md={12}>
          <ImageCarousel images={data?.course.images} />
        </Col>
      </Row>
      <Row>
        
         <Col style={{ padding: '1rem 1rem  0 1rem' }} span={24} md={12}>
          <h2 style={{ marginBottom: '1rem' }}>Write a Review</h2>
          <h2>** Form Goes Here **</h2>
          <Form>
          <Rate onChange={setValue} value={value} />
            <Form.Item label="Review">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
          <Form.Item wrapperCol={{ offset: 21, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>        
          </Col> 
        <Col style={{ padding: '1rem 1rem  0 1rem' }} span={24} md={12}>
          <h2>Reviews</h2>
          <h2>** Comment List Goes Here**</h2>
        </Col>
      </Row>
    </Card>
  );
};
export default Course;