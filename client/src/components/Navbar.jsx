import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { Menu, Badge } from 'antd';

const Navbar = () => {
  const { isTokenExpired, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (isTokenExpired) {
      localStorage.removeItem('id_token');
    }
  }, [isTokenExpired]);

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
    {
      label: 'Saved',
      key: 'SubMenu1',
      icon: (
        <Badge count={4} offset={[6, -4]} size="small">
          <HeartOutlined />
        </Badge>
      ),
      children: [
        {
          label: (
            <Link to="" rel="noopener noreferrer">
              <img
                style={{ width: '2.5rem', marginRight: '1rem' }}
                src={'/sample.jpg'}
              />
              Title 1
            </Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to="" rel="noopener noreferrer">
              <img
                style={{ width: '2.5rem', marginRight: '1rem' }}
                src={'/sample.jpg'}
              />
              Title 2
            </Link>
          ),
          key: '2',
        },
        {
          label: (
            <Link to="" rel="noopener noreferrer">
              <img
                style={{ width: '2.5rem', marginRight: '1rem' }}
                src={'/sample.jpg'}
              />
              Title 3
            </Link>
          ),
          key: '3',
        },
      ],
    },

    {
      label: 'My Learnig',
      key: 'SubMenu2',
      icon: (
        <Badge count={5} offset={[6, -4]} size="small">
          <ReadOutlined />
        </Badge>
      ),
      children: [
        {
          label: (
            <Link to="" rel="noopener noreferrer">
              <img
                style={{ width: '2.5rem', marginRight: '1rem' }}
                src={'/sample.jpg'}
              />
              Title 1
            </Link>
          ),
          key: '11',
        },
        {
          label: (
            <Link to="" rel="noopener noreferrer">
              <img
                style={{ width: '2.5rem', marginRight: '1rem' }}
                src={'/sample.jpg'}
              />
              Title 2
            </Link>
          ),
          key: '22',
        },
        {
          label: (
            <Link to="" rel="noopener noreferrer">
              <img
                style={{ width: '2.5rem', marginRight: '1rem' }}
                src={'/sample.jpg'}
              />
              Title 3
            </Link>
          ),
          key: '33',
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
              User Eidt
            </Link>
          ),
          key: 'user-edit',
        },
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
        <Badge count={7} offset={[6, -4]} size="small">
          <ShoppingCartOutlined />
        </Badge>
      ),
    },
    {
      label: isTokenExpired ? (
        <Link to="/login" rel="noopener noreferrer">
          login
        </Link>
      ) : (
        <Link
          onClick={() => {
            dispatch(removeUserInfo());
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

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ padding: '1rem', fontSize: '1rem'}}
    />
  );
};
export default Navbar;
