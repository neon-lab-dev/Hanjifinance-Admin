/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import TextInput from "../../../component/Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../../component/Reusable/Button/Button";

interface Category {
  id: number;
  name: string;
  productCount: number;
}

type TFormData = {
  category: string;
};

const Categories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockCategories: Category[] = [
      { id: 1, name: "Electronics", productCount: 42 },
      { id: 2, name: "Clothing", productCount: 28 },
      { id: 3, name: "Home & Kitchen", productCount: 35 },
      { id: 4, name: "Books", productCount: 17 },
      { id: 5, name: "Beauty", productCount: 23 },
      { id: 6, name: "Sports", productCount: 19 },
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;

    const newCategory: Category = {
      id: categories.length + 1,
      name: newCategoryName,
      productCount: 0,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div className="min-h-screen font-Montserrat">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Category Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search categories..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-10 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            type="button"
            label=" Add New Category"
            variant="primary"
            classNames="py-2"
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-priring-primary-10"></div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">
            {searchTerm
              ? "No categories found matching your search."
              : "No categories available."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors w-full"
                >
                  Delete Category
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit(handleAddCategory)} className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Category
              </h2>

              <TextInput
                label="Category Name"
                type="text"
                placeholder="Enter category name"
                error={errors.category}
                {...register("category", {
                  required: "Category is required",
                })}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  label="Add Category"
                  variant="primary"
                  classNames="py-2"
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
