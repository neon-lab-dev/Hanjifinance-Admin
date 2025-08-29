import { baseApi } from "../../Api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["blog"],
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

export const { useGetAllBlogsQuery } = adminApi;
