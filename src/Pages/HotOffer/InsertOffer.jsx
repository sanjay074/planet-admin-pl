
import { useState } from 'react';
import './InsertOffer.css'; 
import { OfferPost } from '../../Service/Allapi';
import { useNavigate } from 'react-router-dom';

export const InsertOffer = () => {

  const navigate = useNavigate();

  const [subbrand, setSubbrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [types, setTypes] = useState('');

  const handleSubbrandChange = (event) => {
    setSubbrand(event.target.value);
  };

  const handleTypesChange = (event) => {
    setTypes(event.target.value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setLoading(false);
    setError('');
    if(!subbrand || !types){
      setError("please fill out all fields")
      setLoading(false)
      return;
    }
    if(images.length===0){
      setError("please upload at least one images")
      setLoading(false)
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', subbrand);
      formData.append('offerType', types);
      images.forEach((file) => {
        formData.append('offerImage', file);
      });

      console.log('FormData entries before sending:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await OfferPost(formData);
      alert('Offers saved successfully!');
      setSubbrand('');
      setTypes('');
      setImages([]);
      setImagePreviews([]);
      navigate('/ViewOffer')
    } catch (error) {
      console.error('Error saving offers:', error);
      setError('Failed to save offers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container108">
      <div className="form-container108">
        <h1 className="title08">Add Offers</h1>
        <form onSubmit={handleSaveProduct} className="form08">
          <div className="form-group08">
            <label className="label08">Offers Name</label>
            <input
              type="text"
              className="input08"
              placeholder="Enter Offers Name"
              value={subbrand}
              onChange={handleSubbrandChange}
            />
          </div>

          <div className="form-group08">
            <label className="label08">Offers Type</label>
            <select
              className="input08"
              value={types}
              onChange={handleTypesChange}
            >
              <option >Select Offer Type</option>
              <option >mens</option>
              <option >womens</option>
              <option >footwear</option>
            </select>
          </div>

          <div className="upload-section08">
            <h4 className="upload-title08">Upload Images</h4>
            <div className="upload-container08">
              <div className="upload-box08">
                <label htmlFor="imageUpload" className="upload-label08">
                  Click to upload
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input08"
                />
              </div>

              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview08">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="preview-image08"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(preview);
                      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
                      setImages(images.filter((_, i) => i !== index));
                    }}
                    className="remove-button08"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group08">
            <button className="button08" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Offers'}
           
            </button>
            {error && <p className="error08">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
