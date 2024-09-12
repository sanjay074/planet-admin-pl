// import { useEffect, useState } from "react";
// import {
//   TextField,
//   MenuItem,
//   Button,
//   InputLabel,
//   Select,
//   FormControl,
// } from "@mui/material";
// import {
//   GetBrand,
//   GetCategoryData,
//   GetSubCategory,
//   PostProductData,
// } from "../../Service/Allapi";
// import { useNavigate } from "react-router-dom";

// export const AddProduct = () => {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [allSubCategories, setAllSubCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);
//   const [brands, setBrands] = useState([]);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [color, setColor] = useState([]);
//   const [size, setSize] = useState([]);
//   const [quantity, setQuantity] = useState("");
//   const [basePrice, setBasePrice] = useState("");
//   const [finalPrice, setFinalPrice] = useState("");
//   const [images, setImages] = useState([]);
//   const [pantSize, setPantSize] = useState([]);
//   const [footSize, setFootSize] = useState([]);

//   const [imagePreviews, setImagePreviews] = useState([]); // New state for image previews

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const result = await GetCategoryData();
//         setCategories(
//           Array.isArray(result.data.record) ? result.data.record : []
//         );
//       } catch (error) {
//         console.error("Error getting categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const result = await GetSubCategory();
//         setAllSubCategories(
//           Array.isArray(result.data.record) ? result.data.record : []
//         );
//         // Automatically filter subcategories if a category is already selected
//         if (category) {
//           filterSubCategories(category, result.data.record);
//         }
//       } catch (error) {
//         console.error("Error getting subcategories:", error);
//       }
//     };
//     fetchSubCategories();
//   }, [category]);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const result = await GetBrand();
//         setBrands(Array.isArray(result.data.record) ? result.data.record : []);
//       } catch (error) {
//         console.error("Error getting brands:", error);
//       }
//     };
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     if (category) {
//       // Filter subcategories based on the selected category
//       filterSubCategories(category, allSubCategories);
//     } else {
//       setFilteredSubCategories([]);
//       setSubCategory(""); // Clear subcategory selection
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category]);

//   const filterSubCategories = (categoryId, subCategories) => {
//     const filtered = subCategories.filter(
//       (subCategory) => subCategory.category === categoryId
//     );
//     setFilteredSubCategories(filtered);
//   };

//   const handleColorChange = (e) => {
//     setColor(e.target.value.split(",")); // Set selected colors
//   };

//   const handleSizeChange = (e) => {
//     setSize(e.target.value.split(",")); // Splitting the comma-separated values into an array
//   };

//   const handleFootSizeChange = (e) => {
//     setFootSize(e.target.value.split(","));
//   };

//   const handlePantSizeChange = (e) => {
//     setPantSize(e.target.value.split(","));
//   };

 
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files); 
//     setImages((prevImages) => [...prevImages, ...files]); 

    
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]); 
    
//   };
//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index)); 
//     setImagePreviews((prevPreviews) =>
//       prevPreviews.filter((_, i) => i !== index)
//     ); 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("category", category);
//       productData.append("subCategory", subCategory);
//       productData.append("brand", brand);
//       color.forEach((clr) => productData.append("color[]", clr)); 
//       size.forEach((sz) => productData.append("size[]", sz)); 
//       footSize.forEach((fsz) => productData.append("footSize[]", fsz));
//       pantSize.forEach((nsz) => productData.append("numSize[]", nsz));
//       productData.append("quantity", quantity);
//       productData.append("basePrice", basePrice);
//       productData.append("finalPrice", finalPrice);
//       images.forEach((img) => productData.append("images", img)); 
//       await PostProductData(productData);
//       alert("Product added successfully!");

     
//       setName("");
//       setDescription("");
//       setCategory("");
//       setSubCategory("");
//       setBrand("");
//       setColor([]);
//       setSize([]);
//       setPantSize([]);
//       setFootSize([]);
//       setQuantity("");
//       setBasePrice("");
//       setFinalPrice("");
//       setImages([]);
//       setImagePreviews([]); // Clear image previews
//       navigate("/ProductList");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "155%",
//         height: "auto",
//         padding: "20px",
//         backgroundColor: "#fff",
//         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//         color: "black",
//         margin: "50px auto 0",
//         boxSizing: "border-box",
//       }}
//     >
//       <h2 style={{ textAlign: "start", marginBottom: "20px" }}>Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <div style={{ marginBottom: "20px" }}>
//               <TextField
//                 label="Product Name"
//                 name="name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value.replace(/[0-9]/g, ""))}
//                 fullWidth
//               />
//             </div>
//             <div style={{ marginBottom: "20px" }}>
//               <TextField
//                 label="Description"
//                 name="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 multiline
//                 required
//                 rows={4}
//                 fullWidth
//               />
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "20px",
//                 flexWrap: "wrap",
//                 marginBottom: "20px",
//               }}
//             >
//               <FormControl style={{ flex: 1 }}>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   label="category"
//                   name="category"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   fullWidth
//                   required
//                 >
//                   {categories.map((cat) => (
//                     <MenuItem key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl style={{ flex: 1 }}>
//                 <InputLabel>SubCategory</InputLabel>
//                 <Select
//                   label="subCategory"
//                   name="subCategory"
//                   required
//                   value={subCategory}
//                   onChange={(e) => setSubCategory(e.target.value)}
//                   fullWidth
//                   disabled={!category} // Disable if no category is selected
//                 >
//                   {filteredSubCategories.map((sub) => (
//                     <MenuItem key={sub._id} value={sub._id}>
//                       {sub.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "20px",
//                 flexWrap: "wrap",
//                 marginBottom: "20px",
//               }}
//             >
//               <FormControl style={{ flex: 1 }}>
//                 <InputLabel>Brand</InputLabel>
//                 <Select
//                   label="brand"
//                   name="brand"
//                   required
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                   fullWidth
//                 >
//                   {brands.map((brand) => (
//                     <MenuItem key={brand._id} value={brand._id}>
//                       {brand.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <TextField
//                 label="Quantity"
//                 name="quantity"
//                 required
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 type="number"
//                 fullWidth
//                 style={{ flex: 1 }}
//               />
//             </div>
//           </div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "20px",
//                 flexWrap: "wrap",
//                 marginBottom: "20px",
//               }}
//             >
//               <TextField
//                 label="Base Price"
//                 name="basePrice"
//                 value={basePrice}
//                 onChange={(e) => setBasePrice(e.target.value)}
//                 type="number"
//                 required
//                 fullWidth
//                 style={{ flex: 1 }}
//               />
//               <TextField
//                 label="Final Price"
//                 name="finalPrice"
//                 required
//                 value={finalPrice}
//                 onChange={(e) => setFinalPrice(e.target.value)}
//                 type="number"
//                 fullWidth
//                 style={{ flex: 1 }}
//               />
//             </div>
//             <div style={{ marginBottom: "20px" }}>
             
//               <h4 style={{ marginBottom: "10px" }}>Upload Images</h4>
//               <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//                 <label
//                   htmlFor="image-upload"
//                   style={{
//                     flex: 1,
//                     height: "100px",
//                     border: "2px dashed #ccc",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#ccc",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Select Images
//                 </label>
//                 {/* Hidden input to select multiple images */}
//                 <input
//                   id="image-upload"
//                   type="file"
//                   multiple
//                   style={{ display: "none" }}
//                   onChange={handleImageUpload} // Call handleImageUpload on file selection
//                 />

//                 {/* Display image previews */}
//                 {imagePreviews.map((preview, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       position: "relative",
//                       width: "100px",
//                       height: "100px",
//                       border: "1px solid #ccc",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <img
//                       src={preview}
//                       alt={`Preview ${index}`}
//                       style={{ maxWidth: "100%", maxHeight: "100%" }}
//                     />
//                     {/* Button to remove an image */}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveImage(index)} // Remove image by index
//                       style={{
//                         position: "absolute",
//                         top: "-5px",
//                         right: "-5px",
//                         background: "red",
//                         color: "white",
//                         borderRadius: "50%",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ marginBottom: "20px" }}>
//               <FormControl fullWidth>
//                 {/* <InputLabel>Color</InputLabel> */}
//                 <TextField
//                   label="color"
//                   name="color"
//                   required
//                   value={color.join(",")}
//                   onChange={handleColorChange}
//                   fullWidth
//                   multiple
//                 ></TextField>{" "}
//               </FormControl>{" "}
//             </div>{" "}
//             <div style={{ marginBottom: "20px" }}>
//               {" "}
//               <TextField
//                 label="Size"
//                 name="size"
//                 value={size.join(",")}
//                 onChange={handleSizeChange}
//                 fullWidth
//               />{" "}
//             </div>{" "}
//             <div style={{ marginBottom: "20px" }}>
//               {" "}
//               <TextField
//                 label="Pant Size"
//                 name="numSize"
//                 value={pantSize.join(",")}
//                 onChange={handlePantSizeChange}
//                 fullWidth
//               />{" "}
//             </div>{" "}
//             {category === "66dfd9df98de91a4bcf0c21b" && (
//               <div style={{ marginBottom: "20px" }}>
//                 {" "}
//                 <TextField
//                   label="Foot Size"
//                   name="footSize"
//                   value={footSize.join(",")}
//                   onChange={handleFootSizeChange}
//                   fullWidth
//                 />{" "}
//               </div>
//             )}{" "}
//           </div>{" "}
//         </div>{" "}
//         <div style={{ textAlign: "center", marginTop: "30px" }}>
//           {" "}




//           <Button type="submit" variant="contained" color="primary">
//             Add Product{" "}
//           </Button>{" "}
//         </div>{" "}
//       </form>{" "}
//     </div>
//   );






// };
import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import {
  GetBrand,
  GetCategoryData,
  GetSubCategory,
  PostProductData,
} from "../../Service/Allapi";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE Editor
import { Description } from "@mui/icons-material";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // This will be used for TinyMCE
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [images, setImages] = useState([]);
  const [pantSize, setPantSize] = useState([]);
  const [footSize, setFootSize] = useState([]);

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await GetCategoryData();
        setCategories(
          Array.isArray(result.data.record) ? result.data.record : []
        );
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const result = await GetSubCategory();
        setAllSubCategories(
          Array.isArray(result.data.record) ? result.data.record : []
        );
        if (category) {
          filterSubCategories(category, result.data.record);
        }
      } catch (error) {
        console.error("Error getting subcategories:", error);
      }
    };
    fetchSubCategories();
  }, [category]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const result = await GetBrand();
        setBrands(Array.isArray(result.data.record) ? result.data.record : []);
      } catch (error) {
        console.error("Error getting brands:", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (category) {
      filterSubCategories(category, allSubCategories);
    } else {
      setFilteredSubCategories([]);
      setSubCategory(""); 
    }
  }, [category, allSubCategories]);

  const filterSubCategories = (categoryId, subCategories) => {
    const filtered = subCategories.filter(
      (subCategory) => subCategory.category === categoryId
    );
    setFilteredSubCategories(filtered);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value.split(",")); 
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value.split(",")); 
  };

  const handleFootSizeChange = (e) => {
    setFootSize(e.target.value.split(","));
  };

  const handlePantSizeChange = (e) => {
    setPantSize(e.target.value.split(","));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description); 
      productData.append("category", category);
      productData.append("subCategory", subCategory);
      productData.append("brand", brand);
      color.forEach((clr) => productData.append("color[]", clr));
      size.forEach((sz) => productData.append("size[]", sz));
      footSize.forEach((fsz) => productData.append("footSize[]", fsz));
      pantSize.forEach((nsz) => productData.append("numSize[]", nsz));
      productData.append("quantity", quantity);
      productData.append("basePrice", basePrice);
      productData.append("finalPrice", finalPrice);
      images.forEach((img) => productData.append("images", img));
      await PostProductData(productData);
      alert("Product added successfully!");

      setName("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setBrand("");
      setColor([]);
      setSize([]);
      setPantSize([]);
      setFootSize([]);
      setQuantity("");
      setBasePrice("");
      setFinalPrice("");
      setImages([]);
      setImagePreviews([]); 
      navigate("/ProductList");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div
      style={{
        width: "155%",
        height: "auto",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        color: "black",
        margin: "50px auto 0",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "start", marginBottom: "20px" }}>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                label="Product Name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value.replace(/[0-9]/g, ""))}
                fullWidth
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              {/* TinyMCE editor for the description field */}
              <Editor
                apiKey="0252xd2w7bns23pfuvfqzw5ry7ov4tduj8fpnd47ta0cc1ah" // You need to use your TinyMCE Cloud API key here
                // initialValue={description}
                value={description}
                // onInit={(_evt, editor) => editorRef.current = editor}
                  initialValue={`<P>HELLO EDITER </P>`}
                onEditorChange={(content) => setDescription(content)}
                
      // initialValue="Welcome to TinyMCE!"
    
              />
            
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <FormControl style={{ flex: 1 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ flex: 1 }}>
                <InputLabel>SubCategory</InputLabel>
                <Select
                  label="subCategory"
                  name="subCategory"
                  required
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  fullWidth
                  disabled={!category} // Disable if no category is selected
                >
                  {filteredSubCategories.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <FormControl style={{ flex: 1 }}>
                <InputLabel>Brand</InputLabel>
                <Select
                  label="brand"
                  name="brand"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  fullWidth
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand._id} value={brand._id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Quantity"
                name="quantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                fullWidth
                style={{ flex: 1 }}
              />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <TextField
                label="Base Price"
                name="basePrice"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                type="number"
                required
                fullWidth
                style={{ flex: 1 }}
              />
              <TextField
                label="Final Price"
                name="finalPrice"
                required
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                type="number"
                fullWidth
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
             
              <h4 style={{ marginBottom: "10px" }}>Upload Images</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <label
                  htmlFor="image-upload"
                  style={{
                    flex: 1,
                    height: "100px",
                    border: "2px dashed #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    cursor: "pointer",
                  }}
                >
                  Select Images
                </label>
                {/* Hidden input to select multiple images */}
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageUpload} // Call handleImageUpload on file selection
                />

                {/* Display image previews */}
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      border: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                    {/* Button to remove an image */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)} // Remove image by index
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <FormControl fullWidth>
                {/* <InputLabel>Color</InputLabel> */}
                <TextField
                  label="color"
                  name="color"
                  required
                  value={color.join(",")}
                  onChange={handleColorChange}
                  fullWidth
                  multiple
                ></TextField>{" "}
              </FormControl>{" "}
            </div>{" "}
            <div style={{ marginBottom: "20px" }}>
              {" "}
              <TextField
                label="Size"
                name="size"
                value={size.join(",")}
                onChange={handleSizeChange}
                fullWidth
              />{" "}
            </div>{" "}
            <div style={{ marginBottom: "20px" }}>
              {" "}
              <TextField
                label="Pant Size"
                name="numSize"
                value={pantSize.join(",")}
                onChange={handlePantSizeChange}
                fullWidth
              />{" "}
            </div>{" "}
            {category === "66dfd9df98de91a4bcf0c21b" && (
              <div style={{ marginBottom: "20px" }}>
                {" "}
                <TextField
                  label="Foot Size"
                  name="footSize"
                  value={footSize.join(",")}
                  onChange={handleFootSizeChange}
                  fullWidth
                />{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          {" "}


           
          </div>
        </div>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};


