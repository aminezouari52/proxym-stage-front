import { lazy } from 'react';
import { IRoute } from 'models/route';
import Loadable from 'components/Loadable';

// export lazy route
const AdminDashboardComponent = Loadable(
  lazy(() => import('modules/Admin/components/AdminDashboard/AdminDashboard'))
);
const CandidatesComponent = Loadable(
  lazy(() => import('modules/Admin/components/Candidates/Candidates'))
);
const CandidateDetailsComponent = Loadable(
  lazy(
    () =>
      import(
        'modules/Admin/components/Candidates/currentCandidates/candidateDetails'
      )
  )
);
const CalenderComponent = Loadable(
  lazy(() => import('modules/Admin/components/Calender'))
);
const SessionsComponent = Loadable(
  lazy(() => import('modules/Admin/components/Sessions'))
);
const ProjectsComponent = Loadable(
  lazy(() => import('modules/Admin/components/Projects'))
);

const ADMIN_ROUTES: IRoute[] = [
  {
    path: 'admin-dashboard',
    element: AdminDashboardComponent,
    name: 'AdminDashboardComponent',
    roles: [],
    private: true,
  },
  {
    path: 'candidates',
    element: CandidatesComponent,
    name: 'CandidatesComponent',
    roles: [],
    private: true,
  },
  {
    path: 'candidates/:id',
    element: CandidateDetailsComponent,
    name: 'CandidateDetailsComponent',
    roles: [],
    private: true,
  },
  {
    path: 'calender',
    element: CalenderComponent,
    name: 'CalenderComponent',
    roles: [],
    private: true,
  },
  {
    path: 'sessions',
    element: SessionsComponent,
    name: 'SessionsComponent',
    roles: [],
    private: true,
  },
  {
    path: 'projects',
    element: ProjectsComponent,
    name: 'ProjectsComponent',
    roles: [],
    private: true,
  },
];

export default ADMIN_ROUTES;
