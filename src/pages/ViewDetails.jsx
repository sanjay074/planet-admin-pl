import React from 'react';
import { AnalyticsReport } from './AnalyticsReport';
import { useNavigate } from 'react-router-dom';

export const ViewDetails = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/Dashboard');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg w-4/5 p-5 flex flex-row gap-20 mt-20 relative">
                <div className="flex-1 flex flex-col gap-5">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Sales and Revenue</h1>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg hover:translate-y-1 transition-all">
                                <p className="text-xl font-semibold text-gray-700">Overall Sales:</p>
                                <span className="font-bold text-blue-600 text-xl">12 Millions</span>
                            </div>
                            <div className="flex justify-between bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg hover:translate-y-1 transition-all">
                                <p className="text-xl font-semibold text-gray-700">Overall Earnings:</p>
                                <span className="font-bold text-blue-600 text-xl">78 Millions</span>
                            </div>
                            <div className="flex justify-between bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg hover:translate-y-1 transition-all">
                                <p className="text-xl font-semibold text-gray-700">Overall Revenue:</p>
                                <span className="font-bold text-blue-600 text-xl">60 Millions</span>
                            </div>
                            <div className="flex justify-between bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg hover:translate-y-1 transition-all">
                                <p className="text-xl font-semibold text-gray-700">New Customers:</p>
                                <span className="font-bold text-blue-600 text-xl">23k</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleBack}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Go Back
                    </button>
                </div>
                <div className="flex-1 bg-white p-5 rounded-lg shadow-md">
                    <AnalyticsReport />
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;