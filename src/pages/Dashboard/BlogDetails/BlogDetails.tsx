import { useParams } from "react-router-dom";
import { useGetSingleBlogByIdQuery } from "../../../redux/Features/Admin/adminApi";

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: singleData, isLoading: singleLoading } = useGetSingleBlogByIdQuery(id);

  if (singleLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!singleData?.data) {
    return <p className="text-center text-gray-500 mt-10">Blog not found</p>;
  }

  const blog = singleData.data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
        {blog.title}
      </h1>

      {/* Blog Image */}
      {blog.thumbnail?.url && (
        <div className="w-full mb-6">
          <img
            src={blog.thumbnail.url}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Meta Description */}
      {blog.metaDescription && (
        <p className="text-gray-600 text-base md:text-lg mb-4">{blog.metaDescription}</p>
      )}

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Blog Content */}
      {blog.content && (
        <div
          className="prose prose-md md:prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      )}
    </div>
  );
};

export default BlogDetails;
