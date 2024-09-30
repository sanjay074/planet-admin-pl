import { useEffect, useState } from 'react';
import { getAllEmail } from '../services/Allapi';
import { useNavigate } from 'react-router-dom';

export const ViewEmail = () => {
    const [allData, setAllData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllData = async () => {
            try {
                const result = await getAllEmail();
                setAllData(Array.isArray(result.data.allData) ? result.data.allData : []);
            } catch (error) {
                console.error('Facing problem in getting all data from API', error);
            }
        };
        getAllData();
    }, []);

    const handleBack = () => {
        navigate('/Dashboard');
    };

    return (
        <div className="container mx-auto p-6 mt-12 bg-white">
            <h2 className="text-2xl font-bold mb-6">Email Details</h2>
            {allData.length === 0 ? (
                <div>No emails found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allData.map((item) => (
                        <div key={item._id} className="border border-gray-300 rounded-md p-4 bg-white shadow">
                            <div className="text-sm space-y-2">
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Mobile:</strong> {item.mobile}</p>
                                <p><strong>Message:</strong> {item.message}</p>
                                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button
                onClick={handleBack}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Go Back
            </button>
        </div>
    );
};
