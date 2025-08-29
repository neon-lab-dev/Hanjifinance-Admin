/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import JoditEditor  from 'jodit-react';
import { MdSearch, MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import { useGetAllBlogsQuery } from '../../../redux/Features/Admin/adminApi';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const {data, isLoading} = useGetAllBlogsQuery({});
  console.log(data);

  const filteredBlogs = data?.data?.filter((blog:any) =>
    blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBlog = () => {
    
    resetForm();
    setIsModalOpen(false);
  };

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

  const handleDeleteBlog = (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      console.log(id);
    }
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
              onEdit={handleEditBlog} 
              onDelete={handleDeleteBlog} 
            />
          ))}
        </div>
      )}

      {/* Add/Edit Blog Modal */}
      {isModalOpen && (
        <AddEditBlogModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          content={content}
          setContent={setContent}
          image={image}
          setImage={setImage}
          isEditing={currentBlog !== null}
          onSubmit={currentBlog ? handleUpdateBlog : handleAddBlog}
        />
      )}
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog, onEdit, onDelete }: { blog: any; onEdit: (blog: any) => void; onDelete: (id: number) => void }) => {
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
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>Published: {blog.date}</span>
        </div>
        <div className="flex justify-between gap-2">
          <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-1 text-sm">
            <MdVisibility />
            View
          </button>
          <button 
            onClick={() => onEdit(blog)}
            className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center gap-1 text-sm"
          >
            <MdEdit />
            Edit
          </button>
          <button 
            onClick={() => onDelete(blog.id)}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center gap-1 text-sm"
          >
            <MdDelete />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Add/Edit Blog Modal Component
const AddEditBlogModal = ({
  isOpen,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  content,
  setContent,
  image,
  setImage,
  isEditing,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  content: string;
  setContent: (content: string) => void;
  image: string;
  setImage: (image: string) => void;
  isEditing: boolean;
  onSubmit: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isEditing ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Blog Title
              </label>
              <input
                type="text"
                id="blogTitle"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
              />
            </div>
            
            <div>
              <label htmlFor="blogImage" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="blogImage"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="blogDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              id="blogDescription"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="blogContent" className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content
            </label>
            <JoditEditor
              value={content}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Update Blog' : 'Add Blog'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;