import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditOrderHistory.css";

// Dummy data
const dummyOrders = [
  {
    _id: "12345",
    userId: "user1",
    totalPrice: "99.99",
    orderDate: "2024-08-13",
    status: "Shipped",
    address: {
      name: "John Doe",
      mobile: "1234567890",
      email: "john@example.com",
      Pincode: "123456",
      Landmark: "Near Park",
      district: "District 1",
      state: "State 1",
    },
  },
  // Add more dummy orders as needed
];

export const EditOrderHistory = () => {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const getOrder = () => {
      const orderData = dummyOrders.find((order) => order._id === id);
      setOrder(orderData);
    };
    getOrder();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving changes
    console.log("Order updated:", order);
    navigate("/OrderHistory"); // Redirect to the Order History page
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="edit-order-container02">
      <h2 className="title02">Edit Order</h2>
      <form onSubmit={handleSubmit} className="form02">
        <div className="form-group02">
          <label className="label02">User ID:</label>
          <input
            type="text"
            name="userId"
            value={order.userId || ""}
            onChange={handleChange}
            className="input02"
            readOnly
          />
        </div>
        <div className="form-group02">
          <label className="label02">Total Price:</label>
          <input
            type="text"
            name="totalPrice"
            value={order.totalPrice || ""}
            onChange={handleChange}
            className="input02"
          />
        </div>
        <div className="form-group02">
          <label className="label02">Order Date:</label>
          <input
            type="date"
            name="orderDate"
            value={order.orderDate || ""}
            onChange={handleChange}
            className="input02"
          />
        </div>
        <div className="form-group02">
          <label className="label02">Status:</label>
          <input
            type="text"
            name="status"
            value={order.status || ""}
            onChange={handleChange}
            className="input02"
          />
        </div>
        <div className="form-group02">
          <label className="label02">Address:</label>
          <textarea
            name="address"
            value={order.address ? JSON.stringify(order.address) : ""}
            onChange={handleChange}
            className="textarea02"
          />
        </div>
        <button type="submit" className="button02">Save Changes</button>
      </form>
    </div>
  );
};
