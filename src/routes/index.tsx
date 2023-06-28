/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import GLOBAL_ROUTES from './routes';
import { IRoute } from 'models/route';
import PublicLayout from 'layout/PublicLayout';
import PrivateLayout from 'layout/PrivateLayout';
import ProtectedRoute from './ProtectedRoute';
import AccessDenied from 'components/AccessDenied';
import NotFound from 'components/NotFound';

const renderRoutes = (routes: IRoute[]) => {
  const _routes: any[] = [];
  routes.map((route: IRoute, index: number) => {
    const renderRoute = route?.private ? (
      <ProtectedRoute key={index} route={route} roles={route?.roles} />
    ) : (
      React.createElement(route.element, { name: route?.name })
    );

    return _routes.push({
      path: route?.path,
      element: renderRoute,
    });
  });
  return _routes;
};

const AppRoutes = (): any => {
  return useRoutes([
    {
      path: '/private',
      element: <PrivateLayout />,
      children: [
        // {
        //   index: true,
        //   element: <Navigate to={'/home-page'} replace />,
        // },
        ...renderRoutes(GLOBAL_ROUTES.PRIVATE),
      ],
    },
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={'/on-boarding'} replace />,
        },
        ...renderRoutes(GLOBAL_ROUTES.PUBLIC),
      ],
    },
    { path: '/access-denied', element: <AccessDenied /> },
    { path: '*', element: <NotFound /> },
  ]);
};

export default AppRoutes;
