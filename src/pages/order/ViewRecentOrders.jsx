import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ViewRecentOrderDetails } from '../../services/Allapi';

export const ViewRecentOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getValue = async () => {
            try {
                const result = await ViewRecentOrderDetails(id);
                if (result) {
                    setOrder(result.data.getsingleData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getValue();
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
        { label: "Created At", value: new Date(order.createdAt).toLocaleString() },
        { label: "Updated At", value: new Date(order.updatedAt).toLocaleString() },
        { label: "Payment Status", value: order.paymentStatus },
        { label: "Payment Method", value: order.paymentMethod },
    ];

    return (
        <div className="flex justify-center bg-gray-100 mt-12">
            <div className="flex flex-col md:flex-row max-w-7xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Order Items */}
                <div className="flex-1 p-6 bg-gray-50 border-r border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Items:</h2>
                    {order.orderItems?.map((item, index) => (
                        <div key={index} className="flex items-center mb-4 p-4 bg-white rounded-lg shadow-sm">
                            <img
                                src={item.productId?.images?.[0]}
                                alt="Product"
                                className="w-20 h-20 object-cover rounded-lg mr-4"
                            />
                            <div>
                                <div className="font-semibold text-gray-600">Product Name:</div>
                                <div className="text-gray-800">{item.productId?.name}</div>
                                <div className="font-semibold text-gray-600 mt-2">Quantity:</div>
                                <div className="text-gray-800">{item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Details */}
                <div className="flex-1.5 p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Details</h2>
                    <div className="space-y-4">
                        {orderDetails.map((detail, index) => (
                            <div key={index} className="flex justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="font-semibold text-gray-600">{detail.label}:</div>
                                <div className="text-gray-800">{detail.value}</div>
                            </div>
                        ))}
                    </div>
                    <Link to='/Dashboard'>
                        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default ViewRecentOrder;