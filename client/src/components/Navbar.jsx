import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  HomeOutlined,
  HeartOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { removeUserInfo } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';
import { Menu, Badge } from 'antd';
import { QUERY_ME } from '../utils/queries';

const Navbar = () => {
  // Query to use apollo client
  const { data, loading, error, refetch } = useQuery(QUERY_ME);

  // Get the items from the global state
  const { isTokenExpired, userId } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  // Links for the Saved section on the navbar
  const savedChildren = data?.me?.savedCourses.map((course) => ({
    label: (
      <Link to={`/course/${course._id}`} rel="noopener noreferrer">
        <img
          style={{ width: '2.5rem', marginRight: '1rem' }}
          src={course?.images[0]?.url}
        />
        {course?.title}
      </Link>
    ),
    key: course?._id,
  }));

  // Links for the MyLearning section on the navbar
  const myLearningChildren = data?.me?.myLearning.map((course) => ({
    label: (
      <Link to={`/course/${course?._id}`} rel="noopener noreferrer">
        <img
          style={{ width: '2.5rem', marginRight: '1rem' }}
          src={course?.images[0].url}
        />
        {course?.title}
      </Link>
    ),
    key: course?._id + '1',
  }));

  // Render this links only if the user is admin
  const adminUserNav = data?.me?.isAdmin
    ? [
        {
          label: (
            <Link to="/all-users" rel="noopener noreferrer">
              All Users
            </Link>
          ),
          key: 'all-users',
        },
        {
          label: (
            <Link to="/all-courses" rel="noopener noreferrer">
              All Courses
            </Link>
          ),
          key: 'all-courses',
        },
      ]
    : [];

  // Render this links only if the user is instructor
  const instructorUserNav = data?.me?.isInstructor
    ? [
        {
          label: (
            <Link to="/my-courses" rel="noopener noreferrer">
              My Courses
            </Link>
          ),
          key: 'my-courses',
        },
        {
          label: (
            <Link to="/create-course" rel="noopener noreferrer">
              Create Course
            </Link>
          ),
          key: 'courses',
        },
      ]
    : [];

  // Render this links only if the user is logged in
  const authorizedUzerNav = !isTokenExpired
    ? [
        {
          label: 'Saved',
          key: 'SubMenu1',
          icon: (
            <Badge count={savedChildren?.length} offset={[6, -4]} size="small">
              <HeartOutlined />
            </Badge>
          ),
          children: savedChildren?.length
            ? savedChildren
            : [
                {
                  label: 'No Data',
                  key: 'saved',
                },
              ],
        },
        {
          label: 'My Learning',
          key: 'SubMenu2',
          icon: (
            <Badge
              count={myLearningChildren?.length}
              offset={[6, -4]}
              size="small"
            >
              <ReadOutlined />
            </Badge>
          ),
          children: myLearningChildren?.length
            ? myLearningChildren
            : [
                {
                  label: 'No Data',
                  key: 'myLearning',
                },
              ],
        },
        {
          label: 'Settings',
          key: 'SubMenu3',
          icon: <SettingOutlined />,
          children: [
            {
              label: (
                <Link to={`/user-edit/${userId}`} rel="noopener noreferrer">
                  User Edit
                </Link>
              ),
              key: 'user-edit',
            },
            ...instructorUserNav,
            ...adminUserNav,
          ],
        },
        {
          label: (
            <Link to="/cart" rel="noopener noreferrer">
              Cart
            </Link>
          ),
          key: 'cart',
          icon: (
            <Badge count={cartItems?.length} offset={[6, -4]} size="small">
              <ShoppingCartOutlined />
            </Badge>
          ),
        },
      ]
    : [];

  const items = [
    {
      label: (
        <Link to="/" rel="noopener noreferrer">
          Home
        </Link>
      ),
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...authorizedUzerNav,
    {
      label: isTokenExpired ? (
        <Link to="/login" rel="noopener noreferrer">
          login
        </Link>
      ) : (
        <Link
          onClick={() => {
            dispatch(removeUserInfo());
            dispatch(clearCart());
          }}
          role="button"
          rel="noopener noreferrer"
        >
          logout
        </Link>
      ),
      key: isTokenExpired ? 'login' : 'logout',
      icon: isTokenExpired ? <LoginOutlined /> : <LogoutOutlined />,
    },
  ];

  // If the token is expired remove the id_token from local storage, which will logout the user
  useEffect(() => {
    if (isTokenExpired) {
      localStorage.removeItem('id_token');
      refetch();
    }
  }, [isTokenExpired]);

  refetch();

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="sticky-menu"
    />
  );
};
export default Navbar;
