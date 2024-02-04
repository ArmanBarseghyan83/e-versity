import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthUserRoute = () => {
  const { isTokenExpired } = useSelector((state) => state.auth);

  return !isTokenExpired ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthUserRoute;