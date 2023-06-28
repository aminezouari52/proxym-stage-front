import { combineReducers } from '@reduxjs/toolkit';
import { unauthenticatedMiddleware } from 'app/api/middleware';
import { customizationSliceReducer } from 'config/customization';
import { User, Auth, Cand } from 'modules';

export const combinedReducer = combineReducers({
  ...User.default,
  ...Auth.default,
  ...Cand.default,
  ...customizationSliceReducer,
});

export type IRootState = ReturnType<typeof combinedReducer>;
export const combinedMiddlewares = [
  unauthenticatedMiddleware,
  User.userAPI.middleware,
  Auth.authAPI.middleware,
  Cand.candAPI.middleware,
];
