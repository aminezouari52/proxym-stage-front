import { authQueryReducer } from './auth.query';
import { authSliceReducer } from './auth.Slice';

const combinedReducer = {
  ...authQueryReducer,
  ...authSliceReducer,
};

export * from './auth.Slice';
export * from './auth.query';
export default combinedReducer;
