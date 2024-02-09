import React, { useState } from 'react';
import {
  CalendarOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Calender', '1', <CalendarOutlined />),
  getItem('Inbox', '2', <MailOutlined />),
  getItem('Lessons', 'sub1', <DesktopOutlined />, [
    getItem('Lesson 1', '5'),
    getItem('Lesson 2', '6'),
    getItem('Lesson 3', '7'),
    getItem('Lesson 4', '8'),
  ]),
  getItem('Grades', '3', <PieChartOutlined />),
  getItem('Similar Courses', '9', <AppstoreOutlined />)
];
const App = () => {

  return (
    <div
      style={{
        width: 200,
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
};
export default App;