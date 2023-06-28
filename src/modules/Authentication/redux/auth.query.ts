import { createApi } from '@reduxjs/toolkit/query/react';
import http from 'app/api';
import { IUser } from 'models/user';

interface ICreateUserResponse {
  user: IUser;
}

const reducerPath = 'authAPI';
export const authAPI = createApi({
  reducerPath,
  baseQuery: http(),
  endpoints: (builder) => ({
    loginRequest: builder.mutation<
      ICreateUserResponse,
      Pick<IUser, 'email' | 'password'>
    >({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    adminLoginRequest: builder.mutation<any, any>({
      query: (body) => ({
        url: '/active-directory/findUser',
        method: 'POST',
        body,
      }),
    }),

    registerRequest: builder.mutation<
      ICreateUserResponse,
      Pick<IUser, 'email' | 'firstName' | 'lastName' | 'password'>
    >({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
    verifyUser: builder.query({
      query: () => ({
        url: '/user/verify',
        method: 'GET',
      }),
      transformResponse: (response: {
        user: { role: string; _newToken: string };
      }) => response,
    }),
    decodeToken: builder.query({
      query: () => ({
        url: '/user/decode',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginRequestMutation,
  useAdminLoginRequestMutation,
  useRegisterRequestMutation,
  useVerifyUserQuery,
  useDecodeTokenQuery,
} = authAPI;
export const authQueryReducer = { [reducerPath]: authAPI.reducer };
