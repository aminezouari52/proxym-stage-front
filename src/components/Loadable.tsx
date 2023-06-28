/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';

// project imports

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
