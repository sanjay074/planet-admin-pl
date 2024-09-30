import { useEffect, useState } from "react";
import { GetBrand, GetCategoryData, GetSubCategory, PostProductData } from "../../services/Allapi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [numSize, setPantSize] = useState([]);
  const [footSize, setFootSize] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await GetCategoryData();
        setCategories(Array.isArray(result.data.record) ? result.data.record : []);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const result = await GetSubCategory();
        setAllSubCategories(Array.isArray(result.data.record) ? result.data.record : []);
      } catch (error) {
        console.error("Error getting subcategories:", error);
      }
    };
    fetchSubCategories();
  }, []);

  // Filter subcategories based on selected category
  useEffect(() => {
    if (category) {
      const filtered = allSubCategories.filter((sub) => sub.category === category);
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
      setSubCategory("");
    }
  }, [category, allSubCategories]);

  // Fetch brands
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

  // Handle image upload and previews
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Handle form submission
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

      // Append size fields based on selected subcategory
      if (subCategory) {
        const selectedSubCategory = allSubCategories.find(sub => sub._id === subCategory);
        if (selectedSubCategory) {
          if (["Shirt", "Tshirt", "Dress"].includes(selectedSubCategory.name)) {
            productData.append("size[]", [size]);
          } else if (selectedSubCategory.name === "Jeans") {
            productData.append("numSize[]", [numSize]);
          } else if (["Loafer-shoes", "Formal shoes", "Sport shoes"].includes(selectedSubCategory.name)) {
            productData.append("footSize[]", [footSize]);
          }
        }
      }

      productData.append("quantity", quantity);
      productData.append("basePrice", basePrice);
      productData.append("finalPrice", finalPrice);
      images.forEach((img) => productData.append("images", img));

      await PostProductData(productData);
      alert("Product added successfully!");
      resetForm();
      navigate("/ProductList");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setSubCategory("");
    setBrand("");
    setColor([]);
    setSize("");
    setPantSize("");
    setFootSize("");
    setQuantity("");
    setBasePrice("");
    setFinalPrice("");
    setImages([]);
    setImagePreviews([]);
  };

  // Dynamically render the appropriate size field
  const renderSizeFields = () => {
    if (filteredSubCategories.length === 0) return null;

    const selectedSubCategory = filteredSubCategories.find(sub => sub._id === subCategory);

    if (selectedSubCategory) {
      if (["Shirt", "Tshirt", "Dress"].includes(selectedSubCategory.name)) {
        return (
          <div className="w-full">
            <label className="font-semibold block mb-2">Size</label>
            <select
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            >
              <option value="">Select Size</option>
              {["S", "M", "L", "XS", "XL", "XXL"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        );
      }

      if (selectedSubCategory.name === "Jeans") {
        return (
          <div className="w-full">
            <label className="font-semibold block mb-2">Pant Size</label>
            <select
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={numSize}
              onChange={(e) => setPantSize(e.target.value)}
              required
            >
              <option value="">Select Pant Size</option>
              {["28", "30", "32", "34", "36"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        );
      }

      if (["Loafer-shoes", "Formal shoes", "Sport shoes"].includes(selectedSubCategory.name)) {
        return (
          <div className="w-full">
            <label className="font-semibold block mb-2">Foot Size</label>
            <select
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={footSize}
              onChange={(e) => setFootSize(e.target.value)}
              required
            >
              <option value="">Select Foot Size</option>
              {["1", "2", "3", "4", "5", "6", "7"].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4 py-6 shadow-lg border-2 bg-indigo-100 border-gray-200 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <label className="font-semibold block mb-2">Product Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label className="font-semibold block mb-2">Category</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="font-semibold block mb-2">Subcategory</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value="">Select Subcategory</option>
                {filteredSubCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            {renderSizeFields()}

            <div className="w-full">
              <label className="font-semibold block mb-2">Brand</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="font-semibold block mb-2">Color</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value.split(","))}
                required
              />
            </div>

            <div className="w-full">
              <label className="font-semibold block mb-2">Quantity</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <label className="font-semibold block mb-2">Base Price</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <label className="font-semibold block mb-2">Final Price</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <label className="font-semibold block mb-2">Description</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <label className="font-semibold block mb-2">Upload Images</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
                multiple
                onChange={handleImageUpload}
                required
              />
              <div className="flex flex-wrap mt-2">
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt="preview" className="w-20 h-20 object-cover mr-2" />
                ))}
              </div>
            </div>

          </div>
          <div className="flex justify-center">
            <button type="submit" className="text-center mt-6 w-full md:w-auto bg-blue-500 text-white py-2 px-6 rounded-md">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AddProduct;
