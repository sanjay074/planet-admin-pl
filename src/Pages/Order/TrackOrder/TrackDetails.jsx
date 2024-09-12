import React from 'react'
import './TrackDetails.css'
export const TrackDetails = () => {
  const tableData = [
    {
      date: '20 Nov 2023',
      time: '2:30 PM',
      description: 'The Sender Is Preparing The Goods',
      location: '2715 Ash Dr. San Jose, Southa',
    },
    {
      date: '22 Nov 2023',
      time: '7:30 PM',
      description: 'The Order Has Arrived At The Post Office',
      location: '2715 Ash Dr. San Jose, Southa',
    },
    {
      date: '24 Nov 2023',
      time: '2:30 PM',
      description: 'The Order Has Been Delivered Successfully',
      location: '2715 Ash Dr. San Jose, Southa',
    },
    {
      date: '24 Nov 2023',
      time: '2:30 PM',
      description: 'The Order Has Been Delivered Successfully',
      location: '2715 Ash Dr. San Jose, Southa',
    },
  ];

    return (
      <div className="track-details">
      <div className="header2">
        <img src="https://th.bing.com/th/id/OIP.6HDxwTfobW1KpePYGti8CQAAAA?rs=1&pid=ImgDetMain" alt="Product" className="product-image" />
        <div className="order-info">
          <h3>Your Order</h3>
          <p><strong>Order Number:</strong> #JH2033</p>
          <p><strong>Order Placed:</strong> 20 Nov 2023</p>
          <p><strong>Quantity:</strong> 01</p>
        </div>
      </div>
      <div className="order-status">
        <h3>Details</h3>
        <p>Your items are on the way. Tracking information will be available within 24 hours.</p>
        <div className="status-timeline">
          <div className="status-step completed">
            <p>Receiving Orders</p>
            <span>05:43 AM</span>
          </div>
          <div className="status-step in-progress">
            <p>Order Processing</p>
            <span>01:21 PM</span>
          </div>
          <div className="status-step pending">
            <p>Being Delivered</p>
            <span>Processing</span>
          </div>
          <div className="status-step">
            <p>Delivered</p>
            <span>Pending</span>
          </div>
        </div>
      </div>
      <div className="order-details-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.description}</td>
                <td>{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      );
}
