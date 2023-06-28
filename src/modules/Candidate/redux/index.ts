import { candQueryReducer } from './cand.query';

const combinedReducer = {
  ...candQueryReducer,
};

export * from './cand.query';

export default combinedReducer;
