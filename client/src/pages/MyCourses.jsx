import { useMutation, useQuery } from '@apollo/client';
import { Table, Spin, Tag, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { DELETE_COURSE } from '../utils/mutations';
import { MY_COURSES } from '../utils/queries';

const { Column } = Table;

const MyCourses = () => {
  // Queries and mutations to use apollo client
  const { data, error, loading, refetch } = useQuery(MY_COURSES);
  const [deleteCourse, { error: deleteError, loading: deleteLoading }] =
    useMutation(DELETE_COURSE);

  // Map over the courses to create the data for the table
  const tableData = data?.myCourses.map((item) => ({
    key: item?._id,
    title: <Link to={`/course/${item?._id}`}>{item?.title}</Link>,
    status: (
      <>
        {item?.isApproved ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="red">Not Approved</Tag>
        )}
      </>
    ),
    price: <>${item?.price}</>,
    image: item?.images[0]?.url || '/sample.jpg',
  }));

  // Delete the course
  const deleteCourseHandler = async (id) => {
    await deleteCourse({
      variables: { id },
    });

    refetch();
  };

  refetch();

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
      <h2>My Courses</h2>
      <Table dataSource={tableData}>
        <Column
          title="Image"
          key="image"
          render={(record) => (
            <img style={{ width: '3rem' }} src={record?.image} alt="image" />
          )}
          className="small-screen"
        />
        <Column title="Title" dataIndex="title" key="title" />

        <Column title="Status" dataIndex="status" key="status" />

        <Column title="Price" dataIndex="price" key="price" />

        <Column
          key="delete"
          render={(record) => (
            <>
              <Popconfirm
                title="Delete the course"
                description="Are you sure to delete this course?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteCourseHandler(record?.key)}
              >
                <Link role="button">
                  <DeleteFilled />
                </Link>
              </Popconfirm>
              <br />
              <Link to={`/course/edit/${record?.key}`}>
                <EditFilled />
              </Link>
            </>
          )}
        />
      </Table>
    </>
  );
};

export default MyCourses;
