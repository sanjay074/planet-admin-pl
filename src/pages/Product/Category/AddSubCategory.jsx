import React, { useEffect, useState } from "react";
import { GetCategoryData, PostSubCatagory } from "../../../services/Allapi";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    // console.log(subCategoryName,"subcatagoryname >>>>>>>.");
    // console.log(selectedCategory,"selecter catagory list >>>>");

    useEffect(() => {
        const getCategoryData = async () => {
            try {
                const result = await GetCategoryData();
                //console.log(result,"........result>>>");

                const data = Array.isArray(result.data.record)
                    ? result.data.record
                    : [];
                setCategories(data);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };

        getCategoryData();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubCategoryChange = (e) => {
        setSubCategoryName(e.target.value);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await PostSubCatagory(subCategoryName, selectedCategory);
            console.log(response, "result for all subcategory");
            if (response) {
                alert("Subcategory data added successfully");
                setSubCategoryName("");
                setSelectedCategory("");
            }
            navigate("/CategoryList");
        } catch (error) {
            console.error("Facing problem to post data of subcategory", error);
        }
        console.log("SubCategory Name:", subCategoryName);
        console.log("Selected Category:", selectedCategory);
    };
    return (
        <>
            <div className="flex justify-center mt-24">
                <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg p-8 shadow-lg hover:shadow-xl hover:shadow-blue-300 transition-shadow duration-200">
                    <h2 className=" text-2xl bg-cyan-400   h-10 flex items-center rounded-md  justify-center font-bold text-slate-950 mb-6">
                        Add SubCategory
                    </h2>

                    <form onSubmit={handleSave} className="space-y-4">

                        <div className="form-group">
                            <label
                                htmlFor="category"
                                className="block text-lg font-medium text-gray-700 mb-1"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="block w-full text-lg capitalize font-semibold px-4 py-2 mt-5 h-12 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-300 focus:border-indigo-500 outline-none hover:border-blue-400"
                                required
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                        className=" text-sm font-semibold"
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="form-group">
                            <label
                                htmlFor="subCategoryName"
                                className="block text-lg font-medium text-gray-700 mb-1"
                            >
                                SubCategory Name
                            </label>
                            <input
                                type="text"
                                id="subCategoryName"
                                name="subCategoryName"
                                placeholder="subCategoryName"
                                value={subCategoryName}
                                onChange={handleSubCategoryChange}
                                className="block w-full mt-5 h-12 px-4 capitalize font-semibold py-2 border-2 border-gray-400 outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>


                        <div className=" py-5" >

                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white text-lg capitalize font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Save SubCategory
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddSubCategory;