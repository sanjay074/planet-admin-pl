import React, { useState } from 'react'
import './TrackOrder.css';
import { useNavigate } from 'react-router-dom';

export const TrackOrder = () => {

    const [orderNumber, setOrderNumber] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const navigate=useNavigate()
  
    const handleOrderNumberChange = (e) => {
      setOrderNumber(e.target.value);
    };
  
    const handleContactInfoChange = (e) => {
      setContactInfo(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Order Number:', orderNumber);
      console.log('Contact Info:', contactInfo);
      navigate('/OrderSummary')
    };
  return (
    <div className="track-order-container">
    <h2>TRACK ORDER</h2>
    <form onSubmit={handleSubmit} className="track-order-form">
      <input
        type="text"
        placeholder="Order Number"
        value={orderNumber}
        onChange={handleOrderNumberChange}
        required
      />
      <input
        type="text"
        placeholder="Email/Phone No"
        value={contactInfo}
        onChange={handleContactInfoChange}
        required
      />
      <button type="submit">Continue</button>
    </form>
  </div>
  )
}
