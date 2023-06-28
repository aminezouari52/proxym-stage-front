import { IRootState } from 'app/store/reducer';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface Props {
  route: Record<any, any>;
  path?: string;
  roles: Array<string>;
}

const ProtectedRoute: React.FC<Props> = ({ route }) => {
  const _isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  if (_isAuthenticated) {
    return React.createElement(route.element, { name: route?.name });
  }

  return <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
