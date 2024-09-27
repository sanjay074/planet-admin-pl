import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { DeleteOrderList, RecentOrdersDetails } from "../../services/Allapi";

const RecentOrders = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [recentOrder, setRecentOrder] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
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
        setSearchTerm(e.target.value);
    };

    return (
        <div className="max-w-full mx-auto mt-6 bg-gray-100 p-4 text-black">
            <div className="flex justify-between items-center mb-5">
                <button className="bg-purple-600 text-white py-2 px-4" onClick={downloadCSS}>
                    CSS
                </button>
                <button className="bg-purple-600 text-white py-2 px-4" onClick={downloadAsTxt}>
                    Txt
                </button>
                <button className="bg-purple-600 text-white py-2 px-4" onClick={downloadAsExcel}>
                    Excel
                </button>
                <button className="bg-purple-600 text-white py-2 px-4" onClick={printPage}>
                    Print
                </button>
                <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="flex-grow p-2 border rounded-lg"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="bg-purple-600 text-white py-2 px-4" onClick={handleAddNew}>
                    + Add New Product
                </button>
            </div>

            {filteredOrders.length === 0 ? (
                <p>No available data</p>
            ) : (
                <>
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Order ID</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Total</th>
                                <th className="p-3 border">Payment Status</th>
                                <th className="p-3 border">Payment Method</th>
                                <th className="p-3 border">View Details</th>
                                <th className="p-3 border">Action</th>
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
                                    <tr key={order._id} className="odd:bg-white even:bg-gray-100">
                                        <td className="p-3">
                                            {firstProductWithImage.productId ? (
                                                <div className="flex items-center">
                                                    <img
                                                        src={firstProductWithImage.productId.images[0]}
                                                        alt={firstProductWithImage.productId.name}
                                                        className="w-12 h-12 mr-2"
                                                    />
                                                    <span>{firstProductWithImage.productId.name}</span>
                                                </div>
                                            ) : (
                                                "No image available"
                                            )}
                                        </td>
                                        <td className="p-3">{order._id}</td>
                                        <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="p-3">Rs {order.totalPrice}</td>
                                        <td className={`p-3 ${order.paymentStatus ? "text-green-500" : "text-red-500"}`}>
                                            {order.paymentStatus ? "Success" : "Pending"}
                                        </td>
                                        <td className="p-3">{order.paymentMethod}</td>
                                        <td
                                            className="p-3 cursor-pointer text-2xl"
                                            onClick={() => handleViewDetails(order._id)}
                                        >
                                            <MdOutlineRemoveRedEye />
                                        </td>
                                        <td className="p-3">
                                            <button
                                                className="bg-red-500 text-white p-2 rounded"
                                                onClick={() => handalDeleteitem(order._id)}
                                            >
                                                ❌
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-5">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 border ${currentPage === index + 1 ? "bg-purple-600 text-white" : "bg-white"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                className="px-4 py-2 border bg-white"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
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
