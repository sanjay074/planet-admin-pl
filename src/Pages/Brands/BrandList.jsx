import { useEffect, useState } from "react";
import { BrandGet, Branddelete, Brandupdate } from "../../Service/Allapi";
import "./BrandList.css";

export const BrandList = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOffer, setEditingOffer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    pic: ''
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await BrandGet();
        setOffers(data.data.record);
        setFilteredOffers(data.data.record); // Initialize filtered offers
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    fetchOffers();
  }, []);

  // Handle the search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = offers.filter(offer =>
      offer.name.toLowerCase().includes(value) || offer._id.toLowerCase().includes(value)
    );
    setFilteredOffers(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const ischeck = window.confirm("Are you sure you want to delete this Product?");
      if (ischeck) {
        await Branddelete(id);
        setOffers(prevOffers => prevOffers.filter(offer => offer._id !== id));
        setFilteredOffers(prevOffers => prevOffers.filter(offer => offer._id !== id));
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setEditForm({
      name: offer.name,
      pic: ''
    });
    setImagePreviews([offer.pic]);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);

    setEditForm(prevForm => ({
      ...prevForm,
      pic: file
    }));

    setImagePreviews([preview]);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('pic', editForm.pic);

      await Brandupdate(editingOffer._id, formData);

      setOffers(prevOffers =>
        prevOffers.map(offer =>
          offer._id === editingOffer._id
            ? {
              ...offer,
              name: editForm.name,
              pic: imagePreviews[0]
            }
            : offer
        )
      );

      setEditingOffer(null);
      setEditForm({ name: '', pic: '' });
      setImagePreviews([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOffer(null);
  };

  return (
    <div className="brand09-container">
      <div className="brand09-header">
        <h2>Brands List</h2>
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or ID"
          className="brand09-search "
        />
      </div>
      <div className="brand09-list">
        {filteredOffers.length > 0 ? (
          filteredOffers.map(offer => (
            <div className="brand09-card" key={offer._id}>
              <img
                src={offer.pic}
                alt={offer.name}
                className="brand09-image"
              />
              <h4>Name: {offer.name}</h4>
              <div className="brand09-actions">
                <button onClick={() => handleDelete(offer._id)}>Delete</button>
                <button onClick={() => handleEdit(offer)}>Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay04">
          <div className="modal-content04">
            <h4 style={{ marginBottom: '10px', color: "black" }}>Edit Offer</h4>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleFormChange}
                placeholder="Offer Name"
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>
            <div style={{ marginBottom: '20px', color: "black" }}>
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
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ddd' }}>
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(preview);
                        setImagePreviews([]);
                        setEditForm(prevForm => ({
                          ...prevForm,
                          pic: ''
                        }));
                      }}
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
            <button onClick={handleUpdate}>Update Offer</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
