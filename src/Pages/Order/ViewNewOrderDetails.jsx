import React, { useState } from 'react';
import './ViewNewOrderDetails.css';

export const ViewNewOrderDetails = () => {
  // Dummy data for demonstration
  const [order, setOrder] = useState({
    userId: 'user123',
    _id: 'order456',
    orderItems: [
      {
        productId: {
          images: ['https://oldnavy.gap.com/webcontent/0019/220/001/cn19220001.jpg'],
          name: 'Sample Product'
        },
        quantity: 2
      }
    ],
    address: {
      name: 'John Doe',
      mobile: '1234567890',
      email: 'john.doe@example.com',
      Pincode: '123456',
      Landmark: 'Near Park',
      district: 'Central',
      state: 'StateName'
    },
    totalPrice: 500,
    orderDate: '2024-08-13T12:00:00Z',
    status: 'Pending'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableOrder, setEditableOrder] = useState({ ...order });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    setOrder(editableOrder);
    setIsEditing(false);
  };

  return (
    <div className="order-details-container">
      <div className="order-details-content">
        <div className="order-details-left">
          {order.orderItems.map((item, index) => (
            <div key={index} className="product-details">
              {item.productId.images && item.productId.images.length > 0 && (
                <div className="product-image">
                  <img src={item.productId.images[0]} alt={item.productId.name} />
                  <div className="product-name">{item.productId.name}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="order-details-right">
          <div className="order-details-card">
            <h3>Order Details</h3>
            <div className="form-group">
              <label>User ID:</label>
              <input
                type="text"
                name="userId"
                value={editableOrder.userId}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Order ID:</label>
              <input
                type="text"
                name="_id"
                value={editableOrder._id}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              {order.orderItems.map((item, index) => (
                <div key={index} className="product-details">
                  <input
                    type="number"
                    name={`quantity-${index}`}
                    value={item.quantity}
                    readOnly={!isEditing}
                    onChange={(e) => {
                      const updatedItems = [...editableOrder.orderItems];
                      updatedItems[index].quantity = e.target.value;
                      setEditableOrder(prevState => ({
                        ...prevState,
                        orderItems: updatedItems
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={JSON.stringify(editableOrder.address, null, 2)}
                readOnly={!isEditing}
                onChange={(e) => {
                  const address = JSON.parse(e.target.value);
                  setEditableOrder(prevState => ({
                    ...prevState,
                    address
                  }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Total Price:</label>
              <input
                type="text"
                name="totalPrice"
                value={`Rs ${editableOrder.totalPrice}`}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Order Date:</label>
              <input
                type="text"
                name="orderDate"
                value={new Date(editableOrder.orderDate).toLocaleDateString()}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={editableOrder.status}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleEdit} className="edit-button">
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button type="button" onClick={handleSave} className="save-button">
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


