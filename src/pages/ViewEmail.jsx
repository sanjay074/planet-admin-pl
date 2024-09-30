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
        <div className="container mx-auto p-6 mt-16 bg-gray-50">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Email Details</h2>
            {allData.length === 0 ? (
                <div className="text-center text-gray-500">No emails found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                    {allData.map((item) => (
                        <div key={item._id} className=" bg-yellow-50 border border-gray-200 rounded-2xl p-6  shadow-xl hover:shadow-xl transition-shadow duration-300">
                            <div className="text-sm space-y-3 text-gray-700">
                                <p><span className="font-semibold">Name:</span> {item.name}</p>
                                <p><span className="font-semibold">Email:</span> {item.email}</p>
                                <p><span className="font-semibold">Mobile:</span> {item.mobile}</p>
                                <p className="break-words"><span className="font-semibold">Message:</span> {item.message}</p>
                                <p><span className="font-semibold">Created At:</span> {new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button
                onClick={handleBack}
                className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
                Go Back
            </button>
        </div>


    );
};
