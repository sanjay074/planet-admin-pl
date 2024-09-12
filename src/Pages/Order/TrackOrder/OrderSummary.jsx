import React from 'react';
import './OrderSummary.css';
import { useNavigate } from 'react-router-dom';

export const OrderSummary = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/TrackDetails');
  }

  // Local object containing the order details
  const orderDetails = {
    orderNumber: '#JH2033',
    date: '20 Nov 2023',
    items: [
      { name: 'Shirt', quantity: 2, totalPrice: 799 },
      { name: 'T-Shirt', quantity: 4, totalPrice: 999 },
      { name: 'Shirt', quantity: 2, totalPrice: 799 },
    ],
    customerName: 'Harman',
    phoneNumber: '90453627863',
    bagOption: 'Bag Option',
    payment: 'COD',
    orderId: '#192847',
    totalAmount: '$948.5',
    shippingAddress: '3517 W. Gray St. Utica, Pennsylvania 57867',
    expectedDelivery: '20 Nov 2023',
  };

  return (
    <div className="order-summary1">
      <div className="header1">
        <h2>Order Number <span>{orderDetails.orderNumber}</span></h2>
        <h2>Date - <span>{orderDetails.date}</span></h2>
      </div>
      <div className='main-content1'>
        <div className="left-column">
          <div className="items-summary">
            <h3>Items Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>QTY</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index} className={index%2===0 ? 'evenRow' : "oddRow"}>
                    <td>{item.name}</td>
                    <td>{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</td>
                    <td>{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="customer-order-details">
            <h3>Customer And Order Details</h3>
            <table>
              <tbody>
                <tr>
                  <td>Customer Name</td>
                  <td>{orderDetails.customerName}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{orderDetails.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Bag Option</td>
                  <td>{orderDetails.bagOption}</td>
                </tr>
                <tr>
                  <td>Payment</td>
                  <td>{orderDetails.payment}</td>
                </tr>
              </tbody>
            </table>
          </div>
        
        </div>
        <div className="right-column">
          <div className="summary">
            <h3>Summary</h3>
            <div className="summary-item">
              <p>Order ID</p>
              <span>{orderDetails.orderId}</span>
            </div>
            <div className="summary-item">
              <p>Date</p>
              <span>{orderDetails.date}</span>
            </div>
            <div className="summary-item">
              <p>Total</p>
              <span>{orderDetails.totalAmount}</span>
            </div>
          </div>
          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <p>{orderDetails.shippingAddress}</p>
          </div>
          <div className="expected-delivery">
            <h3>Expected Date Of Delivery</h3>
            <div className="delivery-date">
              <p>{orderDetails.expectedDelivery}</p>
              <button onClick={handleOnClick} className='button1'>Track Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
