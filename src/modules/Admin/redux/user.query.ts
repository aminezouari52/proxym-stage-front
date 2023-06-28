import { IUser } from 'models/user';
import { createApi } from '@reduxjs/toolkit/query/react';
import http from 'app/api';

import { IReduxUser } from '../interface/user';
import { ICreateSessionPayload } from '../interface/session';
import { ICreateInterviewPayload } from '../interface/interview';
import { IAdmin } from '../interface/admin';

interface IToken {
  token: string | undefined;
}

interface IVerifyTokenResponse {
  valid: boolean;
}

const reducerPath = 'userApi';
export const userAPI = createApi({
  reducerPath,
  baseQuery: http(),
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: '/admins',
        method: 'GET',
      }),
      transformResponse: (response: Array<IUser>) => response,
    }),
    verifyToken: builder.query<IVerifyTokenResponse, IToken>({
      query: ({ token }) => ({
        url: '/verify-token',
        method: 'GET',
        params: { token },
      }),
      transformResponse: (response: IVerifyTokenResponse) => response,
    }),
    getUserByID: builder.query({
      query: (id: { id: number }) => `users/${id}`,
    }),
    createUser: builder.mutation({
      query: (body: IReduxUser.ICreateUserPayload) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
    createSession: builder.mutation({
      query: (body: ICreateSessionPayload) => ({
        url: '/sessions/create',
        method: 'POST',
        body,
      }),
    }),
    getSessions: builder.query({
      query: () => ({
        url: '/sessions',
        method: 'GET',
      }),
    }),
    getActiveSession: builder.query({
      query: () => ({
        url: '/sessions/active',
        method: 'GET',
      }),
    }),
    createInterview: builder.mutation({
      query: (body: ICreateInterviewPayload) => ({
        url: '/admins/interview',
        method: 'POST',
        body,
      }),
    }),
    getInterviews: builder.query({
      query: () => ({
        url: '/admins/interviews',
        method: 'GET',
      }),
    }),
    updateUserStage: builder.mutation<any, { userId: string; stage: string }>({
      query: ({ userId, stage }) => ({
        url: `/admins/${userId}/stage`,
        method: 'PUT',
        body: { stage },
      }),
    }),

    updateApplication: builder.mutation({
      query: (body: any) => ({
        url: '/applications/application/status',
        method: 'PUT',
        body,
      }),
    }),

    getProjects: builder.query({
      query: () => ({
        url: '/project/projects',
        method: 'GET',
      }),
    }),
    createProject: builder.mutation({
      query: (body: any) => ({
        url: '/project/create',
        method: 'POST',
        body,
      }),
    }),
    getApplications: builder.query({
      query: () => ({
        url: '/applications',
        method: 'GET',
      }),
    }),
    sendEmail: builder.mutation({
      query: (body: any) => ({
        url: '/admins/sendEmail',
        method: 'POST',
        body,
      }),
    }),
    getMyCandidates: builder.query({
      query: (id) => `/admins/${id}/candidates`,
    }),

    getSupervisors: builder.query({
      query: () => '/admins/supervisors',

      transformResponse: (response: IAdmin[]) =>
        response.map((res) => {
          return res.username;
        }),
    }),
    createReview: builder.mutation({
      query: (body: any) => ({
        url: '/admins/createReview',
        method: 'POST',
        body,
      }),
    }),
    getCandidateReviews: builder.query({
      query: (id) => `/admins/reviews/${id}`,
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useVerifyTokenQuery,
  useGetUserByIDQuery,
  useCreateUserMutation,
  useCreateSessionMutation,
  useGetSessionsQuery,
  useGetActiveSessionQuery,
  useCreateInterviewMutation,
  useGetInterviewsQuery,
  useUpdateUserStageMutation,
  useUpdateApplicationMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetApplicationsQuery,
  useSendEmailMutation,
  useGetMyCandidatesQuery,
  useGetSupervisorsQuery,
  useCreateReviewMutation,
  useGetCandidateReviewsQuery,
} = userAPI;
export const userQueryReducer = { [reducerPath]: userAPI.reducer };
