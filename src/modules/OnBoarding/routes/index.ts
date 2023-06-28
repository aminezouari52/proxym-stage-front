import { lazy } from 'react';
import { IRoute } from 'models/route';
import Loadable from 'components/Loadable';

const OnBoardingComponent = Loadable(lazy(() => import('modules/OnBoarding')));

const ONBOARDING_ROUTES: IRoute[] = [
  {
    path: 'on-boarding',
    element: OnBoardingComponent,
    name: 'OnBoardingComponent',
    roles: [],
    private: false,
  },
];

export default ONBOARDING_ROUTES;
