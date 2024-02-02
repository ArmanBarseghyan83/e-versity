import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import UserEdit from './pages/UserEdit';
import CreateCourse from './pages/CreateCourse.jsx';
import Cart from './pages/Cart.jsx';
import Course from './pages/Course.jsx';
import MyCourses from './pages/MyCourses.jsx';
import AllCourses from './pages/AllCourses.jsx';
import AllUsers from './pages/AllUsers.jsx';
import EditCourse from './pages/EditCourse.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/Signup',
        element: <Signup />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/user-edit/:id',
        element: <UserEdit />,
      },
      {
        path: '/create-course',
        element: <CreateCourse />,
      },
      {
        path: '/my-courses',
        element: <MyCourses />,
      },
      {
        path: '/all-courses',
        element: <AllCourses />,
      },
      {
        path: '/all-users',
        element: <AllUsers />,
      },
      {
        path: '/course/:id',
        element: <Course />,
      }, {
        path: '/course/edit/:id',
        element: <EditCourse/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
