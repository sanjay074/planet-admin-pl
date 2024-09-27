// src/AnalyticsReport.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
export const AnalyticsReport = () => {
    const lineChartOptions = {
        chart: {
            type: 'line',
            height: 200,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
    };

    const lineChartSeries = [
        {
            name: 'Growth',
            data: [30, 40, 35, 50, 49, 60, 70],
        },
    ];

    return (
        <div className="analyticsreport">
            <h1>Analytics Report</h1>
            <div className="report">
                <p>Company Finance  : <span className="positive">  +45.14%</span></p>
                <p>Company Expenses Ratio :<span> 0.58%</span></p>
                <p>Business Risk Cases :<span className="low"> - Low</span></p>
                <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height={200} />
            </div>
        </div>
    );
};


