import { useEffect, useState } from "react";
import "./CatagoriList.css";
import {
 GetCategoryData,
 getSubCategoryById,
 DeleteCategory,
 UpdateCategory,
 UpdateSubCategory,
 DeleteSubCategory
} from "../../../Service/Allapi";
import { useNavigate } from "react-router-dom";

export const CategoryList = () => {
 const [categoryData, setCategoryData] = useState([]);
 const [subCategories, setSubCategories] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState(null);

 const [editingCategory, setEditingCategory] = useState(null);
 const [newCategoryName, setNewCategoryName] = useState("");

 const [editingSubCategory, setEditingSubCategory] = useState(null);
 const [newSubCategoryName, setNewSubCategoryName] = useState("");
 const navigate=useNavigate()

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
 let IsOk =  window.confirm("Are you sure you want to delete the Category?");
  if(IsOk){
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
  
    await UpdateSubCategory(editingSubCategory._id,data);
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
  <div className="category-page">
   <div className="category-header">
    <h1>Category</h1>
    { <div className="category-actions">
     {/* <button
      className="delete-button"
      onClick={() => {
       if (selectedCategory) {
        handleDeleteCategory(selectedCategory);
       }
      }}
      disabled={!selectedCategory} 
     >
      Delete
     </button> */}
     <button className="add-new-button" onClick={()=>navigate("/Addcategory")}>+ Add New Category</button>
    </div> 
    }
   </div>

   <table className="category-table" style={{cursor:"pointer"}}>
    <thead>
     <tr>
      <th>Product Title</th>
      <th>Action</th>
     </tr>
    </thead>
    <tbody>
     {categoryData.map((category, index) => (
      <tr
       onClick={() => getSubCategoryDataById(category._id)}
       key={index}
      >
       <td>{category.name}</td>
       <td className="action-buttons">
        <button
         onClick={() => handleDeleteCategory(category._id)}
         style={{backgroundColor:"white"}}>
         ❌
        </button>
        <button
         onClick={() => handleEditCategory(category)}
         style={{backgroundColor:"white"}}>
         ✏️
        </button>
       </td>
      </tr>
     ))}
    </tbody>
   </table>

   {editingCategory && (
    <div className="edit-category-form">
     <h2>Edit Category</h2>
     <input
      type="text"
      value={newCategoryName}
      onChange={(e) => setNewCategoryName(e.target.value)}
     />
     <button onClick={handleUpdateCategory}>Update</button>
     <button onClick={() => setEditingCategory(null)}>Cancel</button>
    </div>
   )}

   <div className="subcategory-section">
    <div className="category-header">
     <h1>Sub Category</h1>
     <button className="add-new-button" onClick={()=>navigate("/AddSubCategory")}>+ Add New SubCategory</button>
    </div>

    <table className="subcategory-table">
     <thead>
      <tr>
       <th>Product Title</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {subCategories.map((subcategory, index) => (
       <tr key={index}>
        <td>{subcategory.name}</td>
        <td className="action-buttons">
         <button onClick={() => handleDeleteSubCategory(subcategory._id)} style={{backgroundColor:"white"}}>
          ❌
         </button>
         <button onClick={() => handleEditSubCategory(subcategory)} style={{backgroundColor:"white"}}>
            ✏️
         </button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>

    {editingSubCategory && (
     <div className="edit-subcategory-form">
      <h2>Edit Subcategory</h2>
      <input
       type="text"
       value={newSubCategoryName}
       onChange={(e) => setNewSubCategoryName(e.target.value)}
      />
      <button onClick={handleUpdateSubCategory}>Update</button>
      <button onClick={() => setEditingSubCategory(null)}>Cancel</button>
     </div>
    )}
   </div>
  </div>
 );
};
