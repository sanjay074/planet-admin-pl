import React, { useEffect, useState } from 'react';
import './ViewOrderList.css'; // Make sure to import the CSS file
import { Link, useParams } from 'react-router-dom';
import { ViewOrderHistory } from '../../../Service/Allapi';

export const ViewOrderList = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null); // Initialize as null

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ViewOrderHistory(id);
        if (result) {
          setOrder(result.data.getsingleData);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    getData();
  }, [id]);

  
  if (!order) {
    return <div>Loading...</div>; // Handle the loading state
  }

  const orderDetails = [
    { label: "User ID", value: order.userId },
    { label: "Total Price", value: order.totalPrice },
    { label: "Order Date", value: new Date(order.orderDate).toLocaleDateString() },
    { label: "Landmark", value: order.address?.Landmark },
    { label: "Pincode", value: order.address?.Pincode },
    { label: "District", value: order.address?.district },
    { label: "Email", value: order.address?.email },
    { label: "Mobile", value: order.address?.mobile },
    { label: "Name", value: order.address?.name },
    { label: "State", value: order.address?.state },
    { label: "Status", value: order.status },
    // { label: "Created At", value: new Date(order.createdAt).toLocaleString() },
    // { label: "Updated At", value: new Date(order.updatedAt).toLocaleString() },
    // { label: "Payment Status", value: order.paymentStatus }, // Assuming these fields exist in your API response
    // { label: "Payment Method", value: order.paymentMethod },
  ];

  return (
    <div className="classname09-container">
      <div className="classname09-card">
        <div className="classname09-order-items-col">
          <h2 className="classname09-items-title">Order Items:</h2>
          {order.orderItems?.map((item, index) => (
            <div key={index} className="classname09-item-detail">
              <img src={item.productId?.images?.[0]} alt="Product" className="classname09-item-image" />
              <div className="classname09-item-info">
                <div className="classname09-item-field"><strong>Product Name:</strong></div>
                <div className="classname09-item-value">{item.productId?.name}</div>
                <div className="classname09-item-field"><strong>Quantity:</strong></div>
                <div className="classname09-item-value">{item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="classname09-details-col">
          <h2 className="classname09-order-title">Order Details</h2>
          
            
           

          <div className="classname09-order-details">
            {orderDetails.map((detail, index) => (
              <div key={index} className="classname09-order-detail">
                <div className="classname09-order-field"><strong>{detail.label}:</strong></div>
                <div className="classname09-order-value">{detail.value}</div>
              </div>
            ))}
            <Link to='/OrderHistory'>
              <button className='classname09-btn'>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
