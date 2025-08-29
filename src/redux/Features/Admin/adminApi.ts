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

    getSingleBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["blog"],
    }),

    addBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/add",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["blog"],
    }),

    editBlog: builder.mutation({
      query: ({id, data}) => ({
        url: `/blog/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetSingleBlogByIdQuery, useAddBlogMutation, useDeleteBlogMutation, useEditBlogMutation } = adminApi;
