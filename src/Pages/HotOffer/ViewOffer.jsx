import "./Viewoffer.css";
import { useEffect, useState } from "react";
import { OfferGet, OfferDelete, OfferUpdate } from "../../Service/Allapi";

export const ViewOffer = () => {
 const [offers, setOffers] = useState([]);
 const [editingOffer, setEditingOffer] = useState(null);
 const [editForm, setEditForm] = useState({
  name: '',
  offerType:'',
  offerImage: ''
 });
 const [imagePreviews, setImagePreviews] = useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);

 useEffect(() => {
  const fetchOffers = async () => {
   try {
    const data = await OfferGet();
    setOffers(data.data.data);
   } catch (error) {
    console.error("Error fetching offers:", error);
   }
  };
  fetchOffers();
 }, []);

 const handleDelete = async (id) => {
  try {
   await OfferDelete(id);
const ischeck = window.confirm(" are you sure you want to delete Product")
if(ischeck){
  setOffers(prevOffers => prevOffers.filter(offer => offer._id !== id));
} 
}
catch (error) {
  console.error("Error deleting offer:", error);
}
 };

 const handleEdit = (offer) => {
  setEditingOffer(offer);
  setEditForm({
   name: offer.name,
   offerType: offer.offerType,
   offerImage: ''
  });
  setImagePreviews([offer.offerImage]);
  setIsModalOpen(true);
 };

 const handleImageUpload = (e) => {
  const file = e.target.files[0];
  const preview = URL.createObjectURL(file);

  setEditForm(prevForm => ({
   ...prevForm,
   offerImage: file
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
   formData.append('offerType',editForm.offerType);
   formData.append('offerImage', editForm.offerImage);

   await OfferUpdate(editingOffer._id, formData);

   setOffers(prevOffers =>
    prevOffers.map(offer =>
     offer._id === editingOffer._id
      ? {
        ...offer,
        name: editForm.name,
        offerType:editForm.offerType,
        offerImage: imagePreviews[0]
       }
      : offer
    )
   );

   setEditingOffer(null);
   setEditForm({ name: '', offerImage: '' });
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
  <div className="offers-container04">
   <div className="offers-header04">
    <h1>View Offers</h1>
   </div>
   <div className="offers-list04">
    {offers.length > 0 ? (
     offers.map(offer => (
      <div className="offer-card04" key={offer._id}>
       <img
        src={offer.offerImage}
        alt={offer.name}
        className="offer-image04"
       />
       <h4 style={{marginBottom:'-15px'}}>Name: {offer.name}</h4>
       <h4>Type: {offer.offerType}</h4>
    
       <div className="offer-actions04">
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
      <h4 style={{ marginBottom: '10px',color:"black" }}>Edit Offer</h4>
      <div style={{ marginBottom: '20px' ,color:"black"}}>
      <label  > Please Enter a Brand Name </label>
       <input
        type="text"
        name="name"
        value={editForm.name}
        onChange={handleFormChange}
        placeholder="Offer Name"
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
       />
      </div>
      <div style={{ marginBottom: '20px' ,color:"black" }}>
      <label > Please Enter a  Valid Brand Type </label>
       <input
        type="text"
        name="offerType"
        value={editForm.offerType}
        onChange={handleFormChange}
        placeholder="Offer Type"
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
       />
      </div>
      <div style={{ marginBottom: '20px',color:"black" }}>
      <label  > Please Upload  a Brand Image </label>
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
             offerImage: ''
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
