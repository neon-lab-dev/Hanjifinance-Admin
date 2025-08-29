/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { MdSearch, MdAdd} from 'react-icons/md';
import { useGetAllBlogsQuery } from '../../../redux/Features/Admin/adminApi';
import AddBlogForm from '../../../component/Dashboard/BlogPage/AddBlogForm/AddBlogForm';
import BlogCard from '../../../component/Dashboard/BlogPage/BlogCard/BlogCard';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any | null>(null);

 

  const {data, isLoading} = useGetAllBlogsQuery({});
  console.log(data);

  const filteredBlogs = data?.data?.filter((blog:any) =>
    blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditBlog = (blog: any) => {
    setCurrentBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    setContent(blog.content);
    setImage(blog.image);
    setIsModalOpen(true);
  };

  const handleUpdateBlog = () => {
    resetForm();
    setIsModalOpen(false);
  };



  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setImage('');
    setCurrentBlog(null);
  };

  const handleModalClose = () => {
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blogs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <MdAdd className="text-lg" />
            Add New Blog
          </button>
        </div>
      </div>

      {/* Blogs Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No blogs found matching your search.' : 'No blogs available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogs.map((blog:any) => (
            <BlogCard
              key={blog.id} 
              blog={blog} 
            />
          ))}
        </div>
      )}

      {/* Add/Edit Blog Modal */}
      {isModalOpen && (
        <AddBlogForm
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Blogs;