import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import { DeleteOrderHistory, ProductHistory } from "../../../Service/Allapi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const getAllHistory = async () => {
      try {
        const result = await ProductHistory();
        const data = Array.isArray(result?.data?.getAllData)
          ? result.data.getAllData
          : [];
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    getAllHistory();
  }, []);

  const totalPages = Math.ceil(orderHistory.length / itemsPerPage);
  const currentItems = orderHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadAsTxt = () => {
    if (orderHistory.length === 0) {
      alert("No data available to download.");
      return;
    }
    const content = orderHistory
      .map(
        (order) =>
          `Order ID: ${order?._id || "N/A"}, Product Name: ${order?.orderItems
            .map((item) => item?.productId?.name || "N/A")
            .join(", ")}, Total Price: Rs ${order?.totalPrice || "N/A"}, Order Date: ${
            order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"
          }, Status: ${order?.status || "N/A"}, Address: ${order?.address?.name || "N/A"}, ${
            order?.address?.mobile || "N/A"
          }, ${order?.address?.email || "N/A"}, ${order?.address?.Pincode || "N/A"}, ${
            order?.address?.Landmark || "N/A"
          }, ${order?.address?.district || "N/A"}, ${order?.address?.state || "N/A"}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "orders.txt");
  };

  const downloadAsExcel = () => {
    if (orderHistory.length === 0) {
      alert("No data available to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(
      orderHistory.map((order) => ({
        OrderID: order?._id || "N/A",
        ProductName: order?.orderItems
          .map((item) => item?.productId?.name || "N/A")
          .join(", "),
        TotalPrice: order?.totalPrice || "N/A",
        OrderDate: order?.orderDate
          ? new Date(order.orderDate).toLocaleDateString()
          : "N/A",
        Status: order?.status || "N/A",
        AddressName: order?.address?.name || "N/A",
        AddressMobile: order?.address?.mobile || "N/A",
        AddressEmail: order?.address?.email || "N/A",
        AddressPincode: order?.address?.Pincode || "N/A",
        AddressLandmark: order?.address?.Landmark || "N/A",
        AddressDistrict: order?.address?.district || "N/A",
        AddressState: order?.address?.state || "N/A",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const downloadCSS = () => {
    const content = `
      .container3 {
        height: 100vh;
        margin-top: 115px;
        background-color: whitesmoke;
        color: black;
        margin-left: 5px;
      }
      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .actions button, .actions input {
        margin: 0 5px;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      .search {
        flex-grow: 1;
        padding: 10px;
        border-radius: 5px;
      }
      .delete {
        background-color: red;
        color: white;
      }
      .add-new {
        background-color: purple;
        color: white;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      thead {
        background-color: #f4f4f4;
      }
      th, td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
      }
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .pagination {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      .pagination button {
        margin: 0 5px;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      .pagination .active {
        background-color: purple;
        color: white;
      }
    `;
    const blob = new Blob([content], { type: "text/css;charset=utf-8" });
    saveAs(blob, "styles.css");
  };

  const printPage = () => {
    window.print();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handalViewHistory = (id) => {
    navigate(`/ViewOrderList/${id}`);
  };

  // const handalEditHistory = (id) => {
  //   navigate(`/EditOrderHistory/${id}`);
  // };

  const handalDeleteHistory = async(id) => {
    const isConfirm=window.confirm(" are you sure you want to delete Order")
    
    if(isConfirm){
      const deleteData=await DeleteOrderHistory(id)
    
      setOrderHistory(orderHistory.filter((item)=>item._id !==id))
    }
   
  };

  return (
    <div className="container3">
      <div className="actions1">
        <button onClick={downloadCSS}>Css</button>
        <button onClick={downloadAsTxt}>Txt</button>
        <button onClick={downloadAsExcel}>Excel</button>
        <button onClick={printPage}>Print</button>
        <input type="text" placeholder="Search" className="search" />
        {/* <button className="add-new">+ Add New</button> */}
      </div>
      {orderHistory.length === 0 ? (
        <div className="no-data-message">No data available.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>OrderID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr key={order?._id}>
                  <td>
                    {order?.orderItems.map((item) => (
                      <div key={item?._id}>{item?.productId?.name || "N/A"}</div>
                    ))}
                  </td>
                  <td>{order?._id || "N/A"}</td>
                  <td>
                    {order?.orderItems.map((item, index) => (
                      <div key={index} className="product-image-name">
                        {item?.productId?.images && item.productId.images.length > 0 ? (
                          <img
                            src={item.productId.images[0]}
                            alt={item?.productId?.name || "No image"}
                          />
                        ) : (
                          <div>No image available</div>
                        )}
                      </div>
                    ))}
                  </td>
                  <td>
                    {order?.orderItems.map((item, index) => (
                      <div key={index}>{item?.quantity || "N/A"}</div>
                    ))}
                  </td>
                  <td>
                    <div className="address-info">
                      <div className="address-item">
                        <span>Name:</span> {order?.address?.name || "N/A"}
                      </div>
                      <div className="address-item">
                        <span>Mobile:</span> {order?.address?.mobile || "N/A"}
                      </div>
                      <div className="address-item">
                        <span>Email:</span> {order?.address?.email || "N/A"}
                      </div>
                      <div className="address-item">
                        <span>Pincode:</span> {order?.address?.Pincode || "N/A"}
                      </div>
                      <div className="address-item">
                        <span>Landmark:</span> {order?.address?.Landmark || "N/A"}
                      </div>
                      <div className="address-item">
                        <span>District:</span> {order?.address?.district || "N/A"}
                      </div>
                      <div className="address-item">
                        <span>State:</span> {order?.address?.state || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td>Rs {order?.totalPrice || "N/A"}</td>
                  <td>
                    {order?.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{order?.status || "N/A"}</td>
                  <td style={{display:"flex"}}>
                    <button onClick={() => handalViewHistory(order?._id)} style={{backgroundColor:"white"}}>👁️</button>
                    {/* <button onClick={() => handalEditHistory(order?._id)}>Edit</button> */}
                    <button onClick={() => handalDeleteHistory(order?._id)} style={{backgroundColor:"white"}}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
