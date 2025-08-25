import { baseApi } from "../../Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
