import React from 'react';
import { Avatar, List, Rate } from 'antd';

// Unordered list items to show users comments and ratings.
const CommentList = ({ reviews }) => {
  const data = reviews
    ?.map((review) => ({
      user: (
        <>
          <span style={{ fontSize: '1rem', marginRight: '1rem' }}>
            {review?.user?.username}
          </span>
          <Rate
            style={{ fontSize: '1rem' }}
            allowHalf
            disabled
            value={review?.rating}
          />
        </>
      ),
      description: review?.comment,
      rating: review?.rating,
    }))
    .reverse();

  return (
    <>
      <h3 style={{fontSize: '1.2rem'}}>Reviews</h3>
      <List
        className='commentlist'
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item?.user}
              description={item?.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CommentList;
