import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TrackOrder = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const navigate = useNavigate();

    const handleOrderNumberChange = (e) => {
        setOrderNumber(e.target.value);
    };

    const handleContactInfoChange = (e) => {
        setContactInfo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order Number:', orderNumber);
        console.log('Contact Info:', contactInfo);
        navigate('/OrderSummary');
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-8 bg-gray-100 justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">TRACK ORDER</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <input
                    type="text"
                    placeholder="Order Number"
                    value={orderNumber}
                    onChange={handleOrderNumberChange}
                    required
                    className="w-full p-3 mb-4 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                    type="text"
                    placeholder="Email/Phone No"
                    value={contactInfo}
                    onChange={handleContactInfoChange}
                    required
                    className="w-full p-3 mb-4 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};
export default TrackOrder;
