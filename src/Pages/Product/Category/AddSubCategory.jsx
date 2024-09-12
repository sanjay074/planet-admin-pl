import  { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './AddSubCategory.css'; 
import { GetCategoryData, PostSubCatagory } from '../../../Service/Allapi';
import { useNavigate } from 'react-router-dom';

export const AddSubCategory = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
        // console.log(subCategoryName,"subcatagoryname >>>>>>>.");
      // console.log(selectedCategory,"selecter catagory list >>>>");
 
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const result = await GetCategoryData();
        //console.log(result,"........result>>>");
        
        const data= Array.isArray(result.data.record) ? result.data.record :[]
        setCategories(data)
      } catch (error) {
        console.error('Error fetching category data:', error);
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
        setSubCategoryName('');
        setSelectedCategory('');
      }
      navigate('/CategoryList')
    } catch (error) {
      console.error('Facing problem to post data of subcategory', error);
    }
    console.log('SubCategory Name:', subCategoryName);
    console.log('Selected Category:', selectedCategory);
  };

  return (
    <div className="classname03-form-container">
     <div className='classname03-form-containerMiddle'>

     <h2 className="classname03-heading">Add SubCategory</h2>
      <form onSubmit={handleSave} className="classname03-form">
        <div className="classname03-form-group">
          <FormControl fullWidth variant="outlined" required className="classname03-form-control">
            <InputLabel id="select-category-label">Category</InputLabel>
            <Select
              labelId="select-category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="classname03-form-group">
          <TextField
            name="subCategoryName"
            label="SubCategory Name"
            value={subCategoryName}
            onChange={handleSubCategoryChange}
            sx={{ height: '50px' }}
            variant="outlined"
            fullWidth
            required
            className="classname03-textfield"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="classname03-button"
        >
          Save SubCategory
        </Button>
      </form>
     </div>
    </div>
  );
};
