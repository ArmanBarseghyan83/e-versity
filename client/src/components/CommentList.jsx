import React from 'react';
import { useQuery } from '@apollo/client';
import { List, Avatar, Space } from 'antd';
import { COURSE } from '../utils/queries'; 

const CommentList = () => {
  const { loading, error, data } = useQuery(COURSE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const comments = data?.me?.savedCourses || [];

  return (
    <Space direction="vertical" style={{ marginBottom: '20px' }} size="middle">
      {/* Add the pagination controls here if needed */}
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={comment.images[0]?.url} />}
              title={<a href="https://ant.design">{comment.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </Space>
  );
};

export default CommentList;