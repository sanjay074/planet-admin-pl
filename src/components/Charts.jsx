import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './Charts.css';
// import RecentOrders from './RecentOrders';
//  import AnalyticsReport from './AnalyticsReport';
import { useNavigate } from 'react-router-dom';

const Charts = () => {
  const Navigate=useNavigate()
  const salesRevenueChartOptions = {
    chart: {
      type: 'area',  
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    tooltip: {
      x: {
        format: 'MM/yy',
      },
    },
  };

  const salesRevenueChartSeries = [
    {
      name: 'Sales',
      data: [12, 18, 25, 30, 20, 15, 22, 28, 24, 30, 35, 40],
    },
    {
      name: 'Revenue',
      data: [10, 15, 20, 25, 18, 12, 20, 25, 22, 28, 33, 38],
    },
  ];

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `$${val}`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      position: 'top',
      labels: {
        offsetY: -18,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        offsetY: -35,
      },
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100, 100],
      },
    },
  };

  const barChartSeries = [
    {
      name: 'Income',
      data: [1650, 1750, 2250, 2250, 1850, 1950, 2450],
    },
  ];


  const handalViewPages=()=>{
    Navigate('/ViewDetails')
  }
  return (
    <div className="charts">
      <div className="chart-container">
        <div className="chart-info-card">
          <div className="chart-info-item">Overall Sales: 12 Millions</div>
          <div className="chart-info-item">Overall Earnings: 78 Millions</div>
          <div className="chart-info-item">Overall Revenue: 60 Millions</div>
          <div className="chart-info-item">New Customers: 23k</div>
          <button className="view-reports-button" onClick={handalViewPages}>View Reports</button>
        </div>
        <div className="chart">
          <h3>Sales and Revenue</h3>
          <ReactApexChart options={salesRevenueChartOptions} series={salesRevenueChartSeries} type="area" height={350} />
        </div>
      </div>
      <div className="chart-container">
        {/* <div className="chart">
          <h3>Income Overview</h3>
          <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
        </div> */}
      </div>
      
    </div>
  );
};

export default Charts;
