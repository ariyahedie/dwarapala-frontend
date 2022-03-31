import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ isAuth, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  if(loading) return 'Loading...';
  if(!isAuth) {
    return <Navigate to='/login' replace />;
  }
  return children;

}

export default ProtectedRoutes;