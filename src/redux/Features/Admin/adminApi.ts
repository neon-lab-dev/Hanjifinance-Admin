import { baseApi } from "../../Api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/all/user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),

    
    // deleteVideo: builder.mutation({
    //   query: ({ courseId, lectureId }) => ({
    //     url: `/lectures?courseId=${courseId}&lectureId=${lectureId}`,
    //     method: "DELETE",
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["course"],
    // }),
  }),
});

export const {
  useGetAllUserQuery,
} = adminApi;
