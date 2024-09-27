import { useEffect, useState } from "react";
import {
  GetBrand,
  GetCategoryData,
  GetSubCategory,
  PostProductData,
} from "../../Services/Allapi";
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
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
      pantSize.forEach((nsz) => productData.append("pantSize[]", nsz));
      productData.append("quantity", quantity);
      productData.append("basePrice", basePrice);
      productData.append("finalPrice", finalPrice);
      images.forEach((img) => productData.append("images", img));
       console.log(productData,"product added");
       
      await PostProductData(productData);
      alert("Product added successfully!");
      resetForm();
      navigate("/ProductList");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
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
  };

  return (
    <div className="w-full mx-auto mt-12 p-6 bg-white shadow-md">
      <div className="flex justify-center rounded-xl pt-2 pb-0 bg-indigo-100 mb-2">
        <h2 className="text-2xl  font-semibold mb-4">Add Product</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full">
            <label className=" font-semibold block mb-2">Product Name</label>
            <input
              type="text"
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[0-9]/g, ""))}
              required
            />
          </div>
          <div className="w-full">
            <label className=" font-semibold block mb-2">Description</label>
            <textarea
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              required
            />
          </div>

          <div className="w-full">
            <label className=" font-semibold block mb-2">Category</label>
            <select
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className=" font-semibold block mb-2">SubCategory</label>
            <select
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              disabled={!category}
              required
            >
              <option value="">Select SubCategory</option>
              {filteredSubCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className=" font-semibold block mb-2">Brand</label>
            <select
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className=" font-semibold block mb-2">Quantity</label>
            <input
              type="number"
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className=" font-semibold block mb-2">Color</label>
            <input
              type="text"
              className="w-full max-w-md p-2 border border-gray-300 rounded-md "
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value.split(","))}
              required
            />
          </div>

          <div className="w-full">
            <label className=" font-semibold block mb-2">
              Size 
            </label>
            <input
              type="text"
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={size}
              onChange={(e) => setSize(e.target.value.split(","))}
              required
            />
          </div>

          <div className="w-full">
            <label className=" font-semibold block mb-2">Base Price</label>
            <input
              type="number"
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className=" font-semibold block mb-2">Final Price</label>
            <input
              type="number"
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={finalPrice}
              onChange={(e) => setFinalPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <h4 className="mb-2 text-lg font-semibold">Upload Images</h4>
            <div className="flex gap-2 flex-wrap">
              <div className="flex-1 h-24 border-2 rounded-xl border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-sm relative">
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 cursor-pointer flex items-center justify-center text-gray-400"
                >
                  Click to upload images
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {imagePreviews.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Preview"
                  className="w-24 h-24 rounded-md object-cover border border-gray-300"
                />
              ))}
            </div>
          </div>

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className=" w-40 py-2 px-4 bg-purple-800 text-white rounded-xl hover:bg-zinc-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
