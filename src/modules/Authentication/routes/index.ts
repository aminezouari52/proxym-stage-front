import { lazy } from 'react';
import { IRoute } from 'models/route';
import Loadable from 'components/Loadable';

const LoginComponent = Loadable(
  lazy(() => import('modules/Authentication/components/Login/Login'))
);
// lazy(() => import('modules/Authentication/components/AuthLogin')), true); // i changed this
const SignupComponent = Loadable(
  lazy(() => import('modules/Authentication/components/Register/Signup'))
);
const AdminLoginComponent = Loadable(
  lazy(() => import('modules/Authentication/components/Login/AdminLogin'))
);

const AUTH_ROUTES: IRoute[] = [
  {
    path: 'auth/login',
    element: LoginComponent,
    name: 'LoginComponent',
    roles: [],
    private: false,
  },

  // SIGN UP
  {
    path: 'auth/signup',
    element: SignupComponent,
    name: 'SignupComponent',
    roles: [],
    private: false,
  },
  {
    path: 'auth/adminLogin',
    element: AdminLoginComponent,
    name: 'AdminLoginComponent',
    roles: [],
    private: false,
  },
];

export default AUTH_ROUTES;
