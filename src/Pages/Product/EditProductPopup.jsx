import { useState, useEffect, useRef } from 'react';
// Import your API update function
import './EditProductPopup.css'; // Add styles for the popup

 export const EditProductPopup = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...product });
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null); // Reference to the file input

  useEffect(() => {
    setFormData({ ...product });
    setImagePreviews(product.images || []); // Set initial images if available
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));

    setImagePreviews(prev => [...prev, ...newPreviews]);
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...files]
    }));
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleImageRemove = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
    
    // Optionally remove the file from formData.images as well
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await UpdateProductDetails(formData); // Replace with your API call
      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Base Price:
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Final Price:
            <input
              type="number"
              name="finalPrice"
              value={formData.finalPrice || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Stock:
            <input
            className='check1'
              type="checkbox"
              name="stock"
              checked={formData.stock || false}
              onChange={(e) => handleChange({ target: { name: 'stock', value: e.target.checked } })}
            />
          </label>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>Upload Image</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div
                style={{
                  flex: 1,
                  height: '100px',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ccc',
                  fontSize: '14px',
                  position: 'relative',
                }}
              >
                <label
                  htmlFor="imageUpload"
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Click to upload
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </div>
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0 0 0 4px',
                      cursor: 'pointer',
                      padding: '2px 5px',
                      fontSize: '12px',
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

