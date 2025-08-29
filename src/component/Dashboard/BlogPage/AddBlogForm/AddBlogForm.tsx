import JoditEditor from "jodit-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { useAddBlogMutation } from "../../../../redux/Features/Admin/adminApi";

type BlogFormValues = {
  title: string;
  image: FileList;
  metaDescription: string;
};

const AddBlogForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [addBlog] = useAddBlogMutation();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormValues>();

  // Handle pressing Enter in tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data: BlogFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("metaDescription", data.metaDescription);
    formData.append("content", content);

    if (data.image && data.image[0]) {
      formData.append("file", data.image[0]);
    }

    if (tags.length > 0) {
      tags.forEach((tag) => formData.append("tags[]", tag)); // pass as array
    }

    try {
      const response = await addBlog(formData).unwrap();
      if (response?.success) {
        onClose();
      }
    } catch (error) {
      console.error("❌ Failed to create blog:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Blog
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Blog Title */}
            <TextInput
              label="Blog Title"
              type="text"
              placeholder="Enter blog title"
              error={errors.title}
              {...register("title", { required: "Blog title is required" })}
            />

            {/* Blog Image */}
            <TextInput
              label="Blog Image"
              type="file"
              placeholder=""
              error={errors.image}
              {...register("image", { required: "Blog image is required" })}
            />

            {/* Short Description */}
            <TextInput
              label="Short Description"
              type="text"
              placeholder="Enter a short description"
              error={errors.metaDescription}
              {...register("metaDescription", {
                required: "Description is required",
              })}
            />

            {/* Blog Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Content
              </label>
              <JoditEditor
                value={content}
                onBlur={(newContent) => setContent(newContent)}
                onChange={() => {}}
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type a tag and press Enter"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogForm;
