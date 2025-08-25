import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  // Check if there's an error and handle it
  if (result.error) {
    return {
      error: {
        status: result.error.status,
        data: result.error.data || 'Something went wrong!',
      } as FetchBaseQueryError,
    };
  }

  // Return result as expected by BaseQueryFn
  return {
    data: result.data,
  };
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['user', 'course', 'earning', 'payout'],
  endpoints: () => ({}),
});
