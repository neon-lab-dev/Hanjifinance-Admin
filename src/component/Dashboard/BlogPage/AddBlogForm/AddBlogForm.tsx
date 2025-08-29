/* eslint-disable @typescript-eslint/no-explicit-any */
import JoditEditor from "jodit-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import {
  useAddBlogMutation,
  useEditBlogMutation,
} from "../../../../redux/Features/Admin/adminApi";

type BlogFormValues = {
  title: string;
  image: FileList;
  metaDescription: string;
};

const AddBlogForm = ({
  onClose,
  mode,
  setMode,
  defaultValues,
  selectedBlogId,
  isLoading,
}: {
  mode: "add" | "edit";
  setMode: (mode: "add" | "edit") => void;
  onClose: () => void;
  defaultValues?: any;
  selectedBlogId?: string;
  isLoading?: boolean;
}) => {
  const [addBlog] = useAddBlogMutation();
  const [editBlog] = useEditBlogMutation();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showFileInput, setShowFileInput] = useState(mode === "add");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValues?.thumbnail?.url || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogFormValues>();

  useEffect(() => {
    if (defaultValues && mode === "edit") {
      setValue("title", defaultValues.title);
      setValue("metaDescription", defaultValues.metaDescription);
      setContent(defaultValues.content);
      setTags(defaultValues.tags || []);
      setPreviewUrl(defaultValues.thumbnail?.url || null);
      setShowFileInput(!defaultValues.thumbnail?.url); // show input if no preview
    }
  }, [defaultValues, setValue, mode]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data: BlogFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("metaDescription", data.metaDescription);
    formData.append("content", content);
   if (tags.length > 0) {
  formData.append("tags", JSON.stringify(tags));
}


    if (data.image && data.image[0]) formData.append("file", data.image[0]);

    try {
      if (mode === "add") {
        const response = await addBlog(formData).unwrap();
        if (response?.success) onClose();
      } else {
        const response = await editBlog({
          id: selectedBlogId,
          data: formData,
        }).unwrap();
        if (response?.success) onClose();
      }
    } catch (error) {
      console.error("❌ Failed to submit blog:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {mode === "add" ? "Add New Blog" : "Edit Blog"}
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

              {/* Blog Image Preview / Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Image
                </label>

                {previewUrl && !showFileInput ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded cursor-pointer"
                      onClick={() => setShowFileInput(true)}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <TextInput
                    type="file"
                    placeholder=""
                    error={errors.image}
                    {...register("image", { required: mode === "add" })}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files[0]) {
                        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                )}
              </div>

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
                  {tags?.map((tag, index) => (
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
                  onClick={() => {
                    onClose();
                    setMode("add");
                  }}
                  className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {mode === "add" ? "Add Blog" : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlogForm;
