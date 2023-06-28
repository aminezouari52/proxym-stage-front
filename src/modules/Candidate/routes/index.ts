import { lazy } from 'react';
import { IRoute } from 'models/route';
import Loadable from 'components/Loadable';

const CandidateHomePageComponent = Loadable(
  lazy(
    () =>
      import('modules/Candidate/components/HomePage', {
        /* true */
      })
  )
);
const ApplicationFormComponent = Loadable(
  lazy(() => import('modules/Candidate/components/ApplicationForm'))
);

const CANDIDATE_ROUTES: IRoute[] = [
  {
    path: '/private/home-page',
    element: CandidateHomePageComponent,
    name: 'CandidateHomePageComponent',
    roles: [],
    private: true,
  },
  {
    path: '/private/application-form',
    element: ApplicationFormComponent,
    name: 'ApplicationFormComponent',
    roles: [],
    private: true,
  },
];

export default CANDIDATE_ROUTES;
