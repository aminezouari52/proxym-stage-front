import { IRoute } from 'models/route';
import AUTH_ROUTES from 'modules/Authentication/routes';
import ADMIN_ROUTES from 'modules/Admin/routes';
import ONBOARDING_ROUTES from 'modules/OnBoarding/routes';
import CANDIDATE_ROUTES from 'modules/Candidate/routes';

const GLOBAL_ROUTES: {
  PUBLIC: IRoute[];
  PRIVATE: IRoute[];
} = {
  PUBLIC: [...AUTH_ROUTES, ...ONBOARDING_ROUTES],
  PRIVATE: [...ADMIN_ROUTES, ...CANDIDATE_ROUTES],
};

export default GLOBAL_ROUTES;
