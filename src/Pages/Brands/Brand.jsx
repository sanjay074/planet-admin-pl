import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrandPost } from '../../Service/Allapi';
import './Brand.css'; // Import the external CSS file

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
    <div className="container05">
      <div className="form-container05">
        <h1 className="title05">Add Brands</h1>
        <form onSubmit={handleSaveProduct} className="form05">
          <div className="form-group05">
            <label className="label05">Brand Name</label>
            <input
              type="text"
              required
              className="input05"
              placeholder="Enter Subbrand Name"
              value={subbrand}
              onChange={handleSubbrandChange}
            />
          </div>

          <div className="upload-section05">
            <h4 className="upload-title05">Upload Images</h4>
            <div className="upload-box05">
              <div className="image-upload05">
                <label htmlFor="imageUpload" className="image-upload-label05">
                  Click to upload
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-input05"
                />
              </div>
            </div>
            <div className="image-preview05">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  onLoad={() => URL.revokeObjectURL(preview)}
                />
              ))}
            </div>
          </div>

          <div className="form-group05">
            <button className="button05" type="submit">
              Save Brand
            </button>
          </div>
        </form>
        <ToastContainer /> {/* Toast container to display toasts */}
      </div>
    </div>
  );
};
