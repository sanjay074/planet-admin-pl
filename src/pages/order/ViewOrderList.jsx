import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ViewOrderHistory } from '../../services/Allapi';

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
    ];

    return (
        <div className="flex justify-center py-8 bg-gray-100">
            <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-hidden">

                {/* Left column: Order items */}
                <div className="lg:w-1/2 p-6 bg-gray-50 border-r">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Items:</h2>
                    {order.orderItems?.map((item, index) => (
                        <div key={index} className="flex items-center mb-4 p-4 bg-white rounded-lg shadow-md">
                            <img
                                src={item.productId?.images?.[0]}
                                alt="Product"
                                className="w-20 h-20 object-cover rounded-lg mr-4"
                            />
                            <div className="flex flex-col space-y-1">
                                <div><strong>Product Name:</strong> {item.productId?.name}</div>
                                <div><strong>Quantity:</strong> {item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right column: Order details */}
                <div className="lg:w-1/2 p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>
                    <div className="space-y-4">
                        {orderDetails.map((detail, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md"
                            >
                                <span className="font-semibold text-gray-700">{detail.label}:</span>
                                <span className="text-gray-600">{detail.value}</span>
                            </div>
                        ))}
                        <Link to='/OrderHistory'>
                            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
