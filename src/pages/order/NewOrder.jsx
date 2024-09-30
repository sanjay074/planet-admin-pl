import { useEffect, useState } from "react";
import { DeleteOrderList, NewProductList, updateProductDetail } from "../../services/Allapi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NewOrder = () => {
    const [orderList, setOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 3;

    useEffect(() => {
        const getProduct = async () => {
            try {
                const result = await NewProductList();
                const data = Array.isArray(result.data.recentOrder) ? result.data.recentOrder : [];
                setOrderList(data);
            } catch (error) {
                console.log("Error in fetching data", error);
            }
        };
        getProduct();
    }, []);

    const totalPages = Math.ceil(orderList.length / itemsPerPage);
    const currentItems = orderList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const downloadAsTxt = () => {
        const content = orderList
            .map(
                (order) =>
                    `Order ID: ${order._id}, Address: ${order.address?.name || "N/A"}, Total Price: Rs ${order.totalPrice || "N/A"}`
            )
            .join("\n");
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "orders.txt");
    };

    const downloadAsExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(orderList);
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

    const handleOrderView = (id) => {
        navigate(`/OrderDetails/${id}`);
    };

    const handleDelete = async (id) => {
        const isConfirm = window.confirm("Are you sure you want to delete this order?");
        if (isConfirm) {
            await DeleteOrderList(id);
            setOrderList(orderList.filter((item) => item._id !== id));
        }
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        setOrderList((prevOrderList) =>
            prevOrderList.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleUpdateProductItem = async (item_id, status) => {
        try {
            await updateProductDetail(item_id, { status });
            toast.success("Order status updated successfully");
            handleUpdateStatus(item_id, status);
        } catch (error) {
            toast.error("Error updating order status");
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg mt-20">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button onClick={downloadAsTxt} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Download as Txt
                    </button>
                    <button onClick={downloadAsExcel} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                        Download as Excel
                    </button>
                    <button onClick={printPage} className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded">
                        Print
                    </button>
                </div>
                <input type="text" placeholder="Search" className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-xs" />
            </div>

            {/* Enable horizontal scrolling */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto bg-gray-100 ">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Product ID</th>
                            <th className="px-4 py-2">Product Image</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Total Price</th>
                            <th className="px-4 py-2">Order Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((order) => (
                            <tr key={order._id} className="border-b">
                                <td className="px-4 py-2">{order.orderItems?.[0]?.productId?.name || "N/A"}</td>
                                <td className="px-4 py-2">{order.orderId || "N/A"}</td>
                                <td className="px-4 py-2">
                                    {order.orderItems?.[0]?.productId?.images?.[0] ? (
                                        <img
                                            src={order.orderItems[0].productId.images[0]}
                                            alt={order.orderItems[0].productId.name || "N/A"}
                                            className="w-20 h-20 object-cover"
                                        />
                                    ) : "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                    {order.orderItems?.map((item, index) => (
                                        <div key={index} className="text-center">
                                            {item.quantity || "N/A"}
                                        </div>
                                    ))}
                                </td>
                                <td className="px-4 py-2">
                                    <div>{order.address?.name || "N/A"}</div>
                                    <div>{order.address?.mobile || "N/A"}</div>
                                    <div>{order.address?.email || "N/A"}</div>
                                    <div>{order.address?.Pincode || "N/A"}</div>
                                </td>
                                <td className="px-4 py-2">Rs {order.totalPrice || "N/A"}</td>
                                <td className="px-4 py-2">{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</td>
                                <td className="px-4 py-2">{order.status || "N/A"}</td>
                                <td className="px-4 py-2 flex space-x-2 items-center justify-center">
                                    <button onClick={() => handleOrderView(order._id)} className="text-blue-500">
                                        👁️
                                    </button>
                                    <select
                                        className="border rounded-md px-2 py-1 bg-white"
                                        name="orderStatus"
                                        id="orderStatus"
                                        onChange={(e) => handleUpdateProductItem(order._id, e.target.value)}
                                        value={order.status || ""}
                                    >
                                        <option value="">Select Status</option>
                                        {["Processed", "Shipped", "InRoute", "Arrival", "Delivered", "Returned", "Cancelled", "OutofStock"].map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleDelete(order._id)} className="text-red-500">
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 border ${currentPage === index + 1 ? "bg-purple-500 text-white" : "bg-white"}`}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 border bg-white">
                        Next
                    </button>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};
export default NewOrder;