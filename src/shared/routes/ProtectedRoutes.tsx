import React, { useContext } from 'react';
import { authContext } from '../../contexts/AuthContext/context';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useContext(authContext);

  return isAuthenticated ? <Outlet /> : <Navigate replace to={'/'} />;
};
