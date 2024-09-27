import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

const Charts = () => {
    const Navigate = useNavigate();

    const salesRevenueChartOptions = {
        chart: {
            type: 'area',
            height: 350,
            zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        tooltip: {
            x: { format: 'MM/yy' },
        },
    };

    const salesRevenueChartSeries = [
        { name: 'Sales', data: [12, 18, 25, 30, 20, 15, 22, 28, 24, 30, 35, 40] },
        { name: 'Revenue', data: [10, 15, 20, 25, 18, 12, 20, 25, 22, 28, 33, 38] },
    ];

    const handleViewPages = () => {
        Navigate('/ViewDetails');
    };

    return (
        <div className="flex flex-col items-center mt-5 px-2">
            <div className="flex justify-between w-full p-4 bg-white shadow-md rounded-lg flex-wrap">
                <div className="w-full lg:w-1/4 flex flex-col justify-center mb-4 lg:mb-0">
                    <div className="mb-2 p-2 text-center border border-gray-300 shadow-sm rounded-md">Overall Sales: 12 Millions</div>
                    <div className="mb-2 p-2 text-center border border-gray-300 shadow-sm rounded-md">Overall Earnings: 78 Millions</div>
                    <div className="mb-2 p-2 text-center border border-gray-300 shadow-sm rounded-md">Overall Revenue: 60 Millions</div>
                    <div className="mb-2 p-2 text-center border border-gray-300 shadow-sm rounded-md">New Customers: 23k</div>
                    <button
                        className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700"
                        onClick={handleViewPages}
                    >
                        View Reports
                    </button>
                </div>
                <div className="w-full lg:w-3/4">
                    <h3 className="text-center font-bold mb-2">Sales and Revenue</h3>
                    <ReactApexChart options={salesRevenueChartOptions} series={salesRevenueChartSeries} type="area" height={350} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
