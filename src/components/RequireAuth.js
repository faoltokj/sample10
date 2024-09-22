import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : <Navigate to="/unauthorized" />
  );
};

export default RequireAuth;
