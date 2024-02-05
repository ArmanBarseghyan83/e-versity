import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InstructorRoute = () => {
  const { isInstructor } = useSelector((state) => state.auth);

  return isInstructor ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default InstructorRoute;