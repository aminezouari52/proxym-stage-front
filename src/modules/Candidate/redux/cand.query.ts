import { createApi } from '@reduxjs/toolkit/query/react';
import http from 'app/api';

const reducerPath = 'candApi';
export const candAPI = createApi({
  reducerPath,
  baseQuery: http(),
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    getCandidateById: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
      }),
    }),
    submitApplication: builder.mutation({
      query: (body: any) => ({
        url: '/applications/submit',
        method: 'POST',
        body,
      }),
    }),
    userApplications: builder.query({
      query: (id: number) => `/applications/${id}`,
    }),
    getInterview: builder.query({
      query: (id: number) => `/admins/interview/${id}`,
    }),
    getAllProjects: builder.query<any, any>({
      query: () => ({
        url: '/project/projects',
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (body: any) => ({
        url: '/user/upload-photo',
        method: 'POST',
        body,
      }),
    }),
    getPhoto: builder.query<any, any>({
      query: (userId) => ({
        url: `/user/get-photo/${userId}`,
      }),
    }),
    uploadCV: builder.mutation({
      query: (body: any) => ({
        url: '/user/upload-CV',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useGetCandidateByIdQuery,
  useSubmitApplicationMutation,
  useUserApplicationsQuery,
  useGetAllProjectsQuery,
  useGetInterviewQuery,
  useUploadPhotoMutation,
  useGetPhotoQuery,
  useUploadCVMutation,
} = candAPI;
export const candQueryReducer = { [reducerPath]: candAPI.reducer };
