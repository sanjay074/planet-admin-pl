import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BrandPost } from '../services/Allapi';
const Brand = () => {
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
    <div className="flex justify-center px-4 mt-16">
    {/* <ToastContainer />  */}
      <div className="flex justify-center flex-col w-full sm:w-full md:w-full lg:w-1/2 mt-8 shadow-md shadow-sky-200 rounded-lg pb-16">
        <div className="flex justify-center capitalize text-xl sm:text-2xl font-bold pt-5 text-slate-800">
          Add Brands
        </div>
        <form className="px-4 sm:px-8 pt-4 pb-8" onSubmit={handleSaveProduct}>
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-semibold text-slate-900 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              placeholder="Enter SubBrand Name"
              className="w-full h-10 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 mt-1 bg-slate-100 text-base sm:text-lg font-semibold"
              required
              value={subbrand}
              onChange={handleSubbrandChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-semibold text-slate-900 mb-2" htmlFor="imageUpload">
              Upload Images
            </label>
            <div className="w-full h-28 bg-blue-300  border-2  border-dashed border-slate-300 rounded-md flex items-center justify-center">
              <label className="text-slate-500 text-lg font-semibold cursor-pointer p-1 ">
                click to Upload
                <input type="file"
                  id="imageUpload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload} className="hidden " />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 capitalize text-white text-base sm:text-lg font-semibold py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Save Brand
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Brand;
