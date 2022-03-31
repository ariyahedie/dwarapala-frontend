import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({ isAuth, children }) => {
  if(!isAuth) {
    return children;
  }
  return <Navigate to='/' replace />;
}

export default PublicRoutes;