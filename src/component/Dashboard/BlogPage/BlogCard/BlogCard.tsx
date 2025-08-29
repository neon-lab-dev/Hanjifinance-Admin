/* eslint-disable @typescript-eslint/no-explicit-any */

import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { useDeleteBlogMutation } from "../../../../redux/Features/Admin/adminApi";
import { toast } from "sonner";

const BlogCard = ({
  blog,
  setSelectedBlogId,
  setMode,
  setIsOpen
}: {
  blog: any;
  setSelectedBlogId: any;
  setMode: any;
  setIsOpen: any;
}) => {
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const toastId = toast.loading("Deleting blog...");

    try {
      await deleteBlog(id).unwrap(); // RTK Query call
      toast.success("Blog deleted successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete blog", { id: toastId });
      console.error("Delete blog error:", error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={blog?.thumbnail?.url}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {blog.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>Published: {blog.date}</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-1 text-sm cursor-pointer">
            <MdVisibility />
            View
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
              setSelectedBlogId(blog?._id);
              setMode("edit");
            }}
            className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center gap-1 text-sm cursor-pointer"
          >
            <MdEdit />
            Edit
          </button>
          <button
            onClick={() => handleDeleteBlog(blog?._id)}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center gap-1 text-sm cursor-pointer"
          >
            <MdDelete />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
