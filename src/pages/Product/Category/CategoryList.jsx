import { useEffect, useState } from "react";

import {
    GetCategoryData,
    getSubCategoryById,
    DeleteCategory,
    UpdateCategory,
    UpdateSubCategory,
    DeleteSubCategory
} from "../../../services/Allapi";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    const [editingSubCategory, setEditingSubCategory] = useState(null);
    const [newSubCategoryName, setNewSubCategoryName] = useState("");
    const navigate = useNavigate()

    const getAllCategoriesDetails = async () => {
        try {
            const responseData = await GetCategoryData();
            setCategoryData(responseData.data.record);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const getSubCategoryDataById = async (categoryId) => {
        try {
            const responseData = await getSubCategoryById(categoryId);
            setSubCategories(responseData.data.data);
            setSelectedCategory(categoryId);
        } catch (error) {
            console.error("Failed to fetch subcategories:", error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        let IsOk = window.confirm("Are you sure you want to delete the Category?");
        if (IsOk) {
            try {
                await DeleteCategory(categoryId);
                setCategoryData(categoryData.filter((item) => item._id !== categoryId));
            } catch (error) {
                console.error("Failed to delete category:", error);
            }
        }
    };
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.name);
    };

    const handleUpdateCategory = async () => {
        if (editingCategory) {
            try {
                await UpdateCategory(editingCategory._id, { name: newCategoryName });
                setEditingCategory(null);
                setNewCategoryName("");
                getAllCategoriesDetails();
            } catch (error) {
                console.error("Failed to update category:", error);
            }
        }
    };

    const handleEditSubCategory = (subcategory) => {
        setEditingSubCategory(subcategory);
        setNewSubCategoryName(subcategory.name);
    };

    const handleUpdateSubCategory = async () => {
        if (editingSubCategory) {
            let data = {
                name: newSubCategoryName,
                category: selectedCategory
            }
            try {

                await UpdateSubCategory(editingSubCategory._id, data);
                getSubCategoryDataById(selectedCategory);
                setEditingSubCategory(null);
                setNewSubCategoryName("");
            } catch (error) {
                console.error("Failed to update subcategory:", error);
            }
        }
    };


    const handleDeleteSubCategory = async (subcategoryId) => {
        window.confirm("Are you sure you want to delete the SubCategory?");

        try {
            await DeleteSubCategory(subcategoryId);
            setSubCategories(subCategories.filter((item) => item._id !== subcategoryId));
        } catch (error) {
            console.error("Failed to delete subcategory:", error);
        }

    };

    useEffect(() => {
        getAllCategoriesDetails();
    }, []);

    return (
        <>
            <div className=' mt-20'>
                <div className=" mx-auto py-8 px-4">

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold">Category</h1>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                            onClick={() => navigate("/AddCategory")}
                        >
                            + Add New Category
                        </button>
                    </div>

                    {/* Category Table */}
                    <table className="min-w-full my-10 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="bg-gray-100 text-center">
                                <th className="px-4 py-2">Product Title</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData.map((category, index) => (
                                <tr
                                    key={index}
                                    onClick={() => getSubCategoryDataById(category._id)}
                                    className="cursor-pointer hover:bg-gray-50 text-center "
                                >
                                    <td className="px-4 py-2 border-t text-base font-semibold">{category.name}</td>
                                    <td className="px-4 py-2 border-t flex gap-2 justify-center items-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCategory(category._id);
                                            }}
                                            className=" bg-slate-300 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            ❌
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditCategory(category);
                                            }}
                                            className=" bg-slate-200 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            ✏
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    {editingCategory && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                                <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="border rounded-md p-2 w-full mb-4"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleUpdateCategory}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => setEditingCategory(null)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-bold">Sub Category</h1>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => navigate("/AddSubCategory")}
                            >
                                + Add New SubCategory
                            </button>
                        </div>


                        <table className="min-w-full mt-10 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="px-4 py-2">Product Title</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {subCategories.map((subcategory, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-t">{subcategory.name}</td>
                                        <td className="px-4 py-2 border-t flex gap-2">
                                            <button
                                                onClick={() => handleDeleteSubCategory(subcategory._id)}
                                                className=" bg-slate-300 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                ❌
                                            </button>
                                            <button
                                                onClick={() => handleEditSubCategory(subcategory)}
                                                className="bg-slate-200 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                ✏
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        {editingSubCategory && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                                    <h2 className="text-xl font-bold mb-4">Edit Subcategory</h2>
                                    <input
                                        type="text"
                                        value={newSubCategoryName}
                                        onChange={(e) => setNewSubCategoryName(e.target.value)}
                                        className="border rounded-md p-2 w-full mb-4"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={handleUpdateSubCategory}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => setEditingSubCategory(null)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryList