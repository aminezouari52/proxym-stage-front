import { IUser } from 'models/user';
import { createSlice } from '@reduxjs/toolkit';
import { IReduxAuth } from '../interface/auth';
import { authAPI } from './auth.query';

import Cookies from 'js-cookie';

const reducerName = 'auth';
export const initialState: IReduxAuth.IInitialState = {
  user: {} as IUser,
  isAuthenticated: false,
  isRegistered: false,
};

export const authSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
      Cookies.remove('token');
    },
    login: (state, { payload }) => {
      state.isAuthenticated = true;
      Cookies.set('token', payload?.token);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.loginRequest.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user;
        state.isAuthenticated = true;
        Cookies.set('token', payload?.user?.token);
      }
    );
    builder.addMatcher(
      authAPI.endpoints.adminLoginRequest.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user;
        state.isAuthenticated = true;
        Cookies.set('token', payload?.user?.token);
      }
    );
    builder.addMatcher(
      authAPI.endpoints.registerRequest.matchFulfilled,
      (state) => {
        state.isRegistered = true;
      }
    );
    builder.addMatcher(authAPI.endpoints.verifyUser.matchRejected, () => {
      Cookies.remove('token');
    });
  },
});

export const { logout, login } = authSlice.actions;
export const authSliceReducer = { [reducerName]: authSlice.reducer };
