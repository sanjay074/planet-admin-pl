import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Addcatagori.css";
import { PostCategoryData } from "../../../Service/Allapi";
import { useNavigate } from "react-router-dom";

export const Addcategory = () => {

  const navigate = useNavigate()

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
      navigate('/AddSubCategory')
    } catch (error) {
      console.error("Facing problem in post data in API:", error);
    }
  };

  
  return (
    <div className="form-container5">
    <div className="form-containerMiddle5">
    <h2>Add Category</h2>
      <form onSubmit={handleSave}>
        <div className="form-group5">
          <TextField
            name="name"
            label="Name"
            value={addCategory.name}
            onChange={handleOnChange}
            sx={{ height: "50px" }}
            variant="outlined"
            fullWidth
            required
          />
          <small>
            Do Not Exceed 20 Characters When Entering The Category Name.
          </small>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="save-button5"
        >
          Save Category
        </Button>
      </form>
    </div>
    
    </div>
  );
};