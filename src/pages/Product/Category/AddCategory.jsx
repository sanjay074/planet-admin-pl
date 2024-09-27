import React, { useState } from "react";
import { PostCategoryData } from "../../../services/Allapi";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate();

    const [addCategory, setAddCategory] = useState({
        name: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAddCategory((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await PostCategoryData(addCategory);
            console.log(response, "responseData..............");

            if (response) {
                alert("Category data added successfully");
            }
            navigate("/AddSubCategory");
        } catch (error) {
            console.error("Facing problem in post data in API:", error);
        }
    };
    return (
        <>
            <div className="flex items-center justify-center mt-24">
                <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg hover:shadow-blue-500">
                    <h2 className="text-xl font-semibold bg-cyan-400 ps-2 text-black rounded p-2 mb-6">
                        Add Category
                    </h2>
                    <form action="" onSubmit={handleSave}>
                        <div>
                            <div class="w-full mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={addCategory.name}
                                    onChange={handleOnChange}
                                    className=" block w-full mt-5 text-lg font-semibold px-3 ps-2 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required

                                    fullWidth
                                />
                            </div>

                            <small className="text-gray-600 text-base">
                                Do Not Exceed 20 Characters When Entering The Category Name.
                            </small>
                        </div>
                        <button type="submit" className="w-full my-10 bg-indigo-600 text-lg capitalize text-white py-2 rounded-md hover:bg-indigo-700">
                            save category
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCategory;