import { baseApi } from "../../Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    changePassword: builder.mutation({
      query: (data ) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
