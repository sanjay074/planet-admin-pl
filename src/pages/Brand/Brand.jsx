import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrandPost } from '../../services/Allapi';

export const Brand = () => {
  const [subbrand, setSubbrand] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSubbrandChange = (event) => {
    setSubbrand(event.target.value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', subbrand);
      images.forEach((file) => {
        formData.append('pic', file);
      });

      const response = await BrandPost(formData);
      console.log('API Response:', response);

      toast.success('Brand saved successfully!');
      setSubbrand('');
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save brand. Please try again.');
    }
  };

  return (
    <div className="flex justify-center mt-32 px-4 ">
      <div className="flex flex-col w-full sm:w-3/4 lg:w-1/2 mt-8 shadow-lg shadow-slate-300 rounded-lg pb-8 border-2 border-gray-200">
        <h1 className="text-2xl font-bold text-center text-slate-800 pt-4">Add Brands</h1>
        <form onSubmit={handleSaveProduct} className="px-6 pt-4">
          <div className="mb-4">
            <label className="block text-lg font-semibold text-slate-900 mb-2">Brand Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 bg-slate-100"
              placeholder="Enter Subbrand Name"
              value={subbrand}
              onChange={handleSubbrandChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-slate-900 mb-2">Upload Images</label>
            <div className="w-full h-28 bg-blue-100 border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center">
              <label className="text-slate-600 font-semibold cursor-pointer">
                Click to upload
                <input
                  type="file"
                  id="imageUpload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-auto rounded-md object-cover"
                  onLoad={() => URL.revokeObjectURL(preview)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white text-lg font-semibold py-2 rounded-md hover:bg-red-700 transition"
          >
            Save Brand
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};
export default Brand