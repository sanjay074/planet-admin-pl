import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./RecentOrders.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { DeleteOrderList, RecentOrdersDetails } from "../Service/Allapi";

const RecentOrders = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [recentOrder, setRecentOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const itemsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await RecentOrdersDetails();
        const data = Array.isArray(result.data.myData) ? result.data.myData : [];
        setRecentOrder(data);
      } catch (error) {
        console.error("Facing problem in getting RecentOrder", error);
      }
    };
    getData();
  }, []);

  const totalPages = Math.ceil(recentOrder.length / itemsPerPage);

  // Filter orders based on the search input
  const filteredOrders = recentOrder.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadAsTxt = () => {
    const content = recentOrder
      .map(
        (order) =>
          `Order ID: ${order._id}, Total Price: Rs ${order.totalPrice}, Status: ${order.status}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "orders.txt");
  };

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(recentOrder);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const downloadCSS = () => {
    const content = `
      .container {
        width: 80%;
        margin: 0 auto;
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

  const handleAddNew = () => {
    navigate("/AddProduct");
  };

  const handleViewDetails = (orderId) => {
    navigate(`/ViewRecentOrder/${orderId}`);
  };

  const handalDeleteitem = async (id) => {
    if (window.confirm("Are you sure you want to delete this Order?")) {
      await DeleteOrderList(id);
      setRecentOrder(recentOrder.filter((item) => item._id !== id));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  return (
    <div className="container">
      <div className="actions">
        <button onClick={downloadCSS}>Css</button>
        <button onClick={downloadAsTxt}>Txt</button>
        <button onClick={downloadAsExcel}>Excel</button>
        <button onClick={printPage}>Print</button>
        <input
          type="text"
          placeholder="Search by Order ID"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange} // Handle search input change
        />
        <button className="add-new" onClick={handleAddNew}>
          + Add New Product
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No available data</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>View Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => {
                const firstProductWithImage =
                  order.orderItems.find(
                    (item) =>
                      item.productId &&
                      item.productId.images &&
                      item.productId.images.length > 0
                  ) || {};

                return (
                  <tr
                    key={order._id}
                    className={order._id % 2 === 0 ? "evenRow" : "oddRow"}
                  >
                    <td>
                      {firstProductWithImage.productId ? (
                        <div className="product-details">
                          <img
                            src={firstProductWithImage.productId.images[0]}
                            alt={firstProductWithImage.productId.name}
                          />
                          <div className="product-name">
                            {firstProductWithImage.productId.name}
                          </div>
                        </div>
                      ) : (
                        "No image available"
                      )}
                    </td>

                    <td>{order._id}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>Rs {order.totalPrice}</td>
                    <td
                      className={
                        order.paymentStatus
                          ? "payment-success"
                          : "payment-pending"
                      }
                    >
                      {order.paymentStatus ? "Success" : "Pending"}
                    </td>
                    <td>{order.paymentMethod}</td>
                    <td
                      onClick={() => handleViewDetails(order._id)}
                      style={{
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    >
                      <MdOutlineRemoveRedEye style={{ fontSize: "24px" }} />{" "}
                    </td>
                    <td>
                      <button onClick={() => handalDeleteitem(order._id)} style={{backgroundColor:"white"}}>
                        ❌
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentOrders;
