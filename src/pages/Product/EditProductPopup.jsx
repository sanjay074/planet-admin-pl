import { useState, useEffect, useRef } from "react";


 const EditProductPopup = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...product });
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null); 

  useEffect(() => {
    setFormData({ ...product });
    setImagePreviews(product.images || []); 
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click(); 
  };

  const handleImageRemove = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);


    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Base Price:</span>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Final Price:</span>
            <input
              type="number"
              name="finalPrice"
              value={formData.finalPrice || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Stock:</span>
            <input
              type="checkbox"
              name="stock"
              checked={formData.stock || false}
              onChange={(e) =>
                handleChange({ target: { name: "stock", value: e.target.checked } })
              }
              className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </label>

          <div className="mt-6">
            <h4 className="text-gray-700 mb-2">Upload Image</h4>
            <div className="flex gap-2 flex-wrap">
              <div
                className="flex-1 h-24 border-2 border-dashed border-gray-300 text-center flex items-center justify-center text-gray-400 cursor-pointer relative"
                onClick={handleFileInputClick}
              >
                <span>Click to upload</span>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-md"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProductPopup