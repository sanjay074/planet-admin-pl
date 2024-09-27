import React, { useEffect, useState } from "react";
import { DeleteOrderHistory, ProductHistory } from "../../services/Allapi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export const OrderHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderHistory, setOrderHistory] = useState([]);
    const itemsPerPage = 3;
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
                        .join(", ")}, Total Price: Rs ${order?.totalPrice || "N/A"}, Order Date: ${order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"
                    }, Status: ${order?.status || "N/A"}, Address: ${order?.address?.name || "N/A"}, ${order?.address?.mobile || "N/A"
                    }, ${order?.address?.email || "N/A"}, ${order?.address?.Pincode || "N/A"}, ${order?.address?.Landmark || "N/A"
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

    const printPage = () => {
        window.print();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handalViewHistory = (id) => {
        navigate(`/OrderDetails/${id}`);
    };

    const handalDeleteHistory = async (id) => {
        const isConfirm = window.confirm("Are you sure you want to delete Order?");
        if (isConfirm) {
            const deleteData = await DeleteOrderHistory(id);
            setOrderHistory(orderHistory.filter((item) => item._id !== id));
        }
    };

    return (
        <div className="container mx-auto mt-16 p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-6 space-x-4">
                <button
                    onClick={downloadAsTxt}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Download as Txt
                </button>
                <button
                    onClick={downloadAsExcel}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Download as Excel
                </button>
                <button
                    onClick={printPage}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                >
                    Print
                </button>
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded"
                />
            </div>

            {orderHistory.length === 0 ? (
                <div className="text-center text-gray-500">No data available.</div>
            ) : (
                <>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-6 py-3 border-b">Product Name</th>
                                <th className="px-6 py-3 border-b">OrderID</th>
                                <th className="px-6 py-3 border-b">Product</th>
                                <th className="px-6 py-3 border-b">Quantity</th>
                                <th className="px-6 py-3 border-b">Address</th>
                                <th className="px-6 py-3 border-b">Total Price</th>
                                <th className="px-6 py-3 border-b">Order Date</th>
                                <th className="px-6 py-3 border-b">Status</th>
                                <th className="px-6 py-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((order) => (
                                <tr key={order?._id}>
                                    <td className="px-6 py-4 border-b">
                                        {order?.orderItems.map((item) => (
                                            <div key={item?._id}>{item?.productId?.name || "N/A"}</div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 border-b">{order?._id || "N/A"}</td>
                                    <td className="px-6 py-4 border-b">
                                        {order?.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                {item?.productId?.images && item.productId.images.length > 0 ? (
                                                    <img
                                                        src={item.productId.images[0]}
                                                        alt={item?.productId?.name || "No image"}
                                                        className="w-12 h-12 object-cover"
                                                    />
                                                ) : (
                                                    <span>No image available</span>
                                                )}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {order?.orderItems.map((item, index) => (
                                            <div key={index}>{item?.quantity || "N/A"}</div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <div className="space-y-1">
                                            <div>Name: {order?.address?.name || "N/A"}</div>
                                            <div>Mobile: {order?.address?.mobile || "N/A"}</div>
                                            <div>Email: {order?.address?.email || "N/A"}</div>
                                            <div>Pincode: {order?.address?.Pincode || "N/A"}</div>
                                            <div>Landmark: {order?.address?.Landmark || "N/A"}</div>
                                            <div>District: {order?.address?.district || "N/A"}</div>
                                            <div>State: {order?.address?.state || "N/A"}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-b">Rs {order?.totalPrice || "N/A"}</td>
                                    <td className="px-6 py-4 border-b">
                                        {order?.orderDate
                                            ? new Date(order.orderDate).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 border-b">{order?.status || "N/A"}</td>
                                    <td className="px-6 py-4 border-b space-y-2">
                                        <button
                                            onClick={() => handalViewHistory(order?._id)}
                                            className="bg-white text-balck px-4 py-2 rounded"
                                        >
                                            👁️
                                        </button>
                                        <button
                                            onClick={() => handalDeleteHistory(order?._id)}
                                            className=" bg-white text-red-500 px-4 py-2 rounded"
                                        >
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-6">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                            (page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 mx-1 rounded ${page === currentPage
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default OrderHistory;