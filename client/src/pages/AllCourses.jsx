import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Table, Spin, Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ALL_COURSES } from '../utils/queries';
import { APPROVE_COURSE } from '../utils/mutations';
const { Column } = Table;

const AllCourses = () => {
  const { data, error, loading, refetch } = useQuery(ALL_COURSES);
  const [approveCourse] = useMutation(APPROVE_COURSE);

  const [selectedValue, setSelectedValue] = useState({});

  const tableData = data?.allCourses.map((item) => ({
    key: item?._id,
    image: item?.images[0]?.url || '/sample.jpg',
    title: <Link to={`/course/${item?._id}`}>{item?.title}</Link>,
    username: item?.user.username,
    isApproved: item?.isApproved,
  }));

  const handleChange = async (_id, isApproved) => {
    setSelectedValue({ ...selectedValue, _id: isApproved });
    await approveCourse({
      variables: { id: _id, isApproved }
    });
    refetch();
    setSelectedValue({});
  };

  refetch();

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
      <h2>All Courses</h2>
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

        <Column title="Instructor" dataIndex="username" key="username" />

        <Column title="Status" dataIndex="isApproved" key="isApproved" render={(isApproved, record) => (
          <Space wrap>
            <Select
              style={{ width: 150 }}
              placeholder="Select an option"
              value={selectedValue[record.key]}
              onChange={(value) => handleChange(record.key, value)}
              defaultValue={isApproved}
              options={[
                {
                  value: false,
                  label: 'Reject Course',
                },
                {
                  value: true,
                  label: 'Approve Course',
                }
              ]}
            />
          </Space>
        )} />
      </Table>
    </>
  );
};

export default AllCourses;


