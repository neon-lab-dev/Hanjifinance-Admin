import { baseApi } from "../../Api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewsletter: builder.query({
      query: () => ({
        url: "/newsletter",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["newsletter"],
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

export const { useGetAllNewsletterQuery } = adminApi;
