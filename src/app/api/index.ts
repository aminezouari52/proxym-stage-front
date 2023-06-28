/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getToken } from 'utils/functions';

export const http = (): BaseQueryFn<any> => {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'omit',
    prepareHeaders: (headers, { endpoint }) => {
      const userToken = getToken();
      headers.set('Content-Type', 'application/json');
      if (userToken && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${userToken}`);
      }
      return headers;
    },
  });
};

export default http;
