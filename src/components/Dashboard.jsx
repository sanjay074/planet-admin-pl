// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Chart from "./Charts";
import RecentOrders from "./RecentOrders";
import { GetAllUserList, ProductHistory } from "../Service/Allapi";

const Dashboard = () => {
  const [totalUser, setTotalUser] = useState("");
  const [totalOrder, setTotalOrder] = useState("");
  // console.log(totalOrder, "total Order list ");
  console.log(totalOrder,"total historyf ");
  

  useEffect(() => {
    const getTotalUser = async () => {
      try {
        const result = await GetAllUserList();
        // console.log(result,"result data from apuiiiiiiiii");
        
       // console.log(result.data.totalUser, "total user List ");

        setTotalUser(result.data.totalUser);
      } catch (error) {
        console.error("facing problem in getting totalUser from api", error);
      }
    };
    getTotalUser();
  }, []);

  useEffect(() => {
    const getTotalorder = async () => {
      try {
        const result = await ProductHistory();
        console.log(result,"total result history ");
        
        setTotalOrder(result.data.total);
      } catch (error) {
        console.error(
          "facing problem in getting data from totalhistory ",
          error
        );
      }
    };
    getTotalorder();
  }, []);
  return (
    <>
      <div className="dashboard">
        <h3 className="h4">Good Morning </h3>
        <p className="p1">here the today update </p>
        <div className="stats">
          <div className="stat">
            <div className="stat-header">
              Total Page Views
              <span className="stat-trend up">59.3%</span>
            </div>
            <div className="stat-value">4,42,236</div>
            <div className="stat-footer">
              You made an extra 35,000 this year
            </div>
          </div>
          <div className="stat">
            <div className="stat-header">
              Total Users
              <span className="stat-trend up">70.5%</span>
            </div>
            <div className="stat-value">{totalUser}</div>
            <div className="stat-footer">You made an extra 8,900 this year</div>
          </div>
          <div className="stat">
            <div className="stat-header">
              Total Order
              <span className="stat-trend down">27.4%</span>
            </div>
            <div className="stat-value">{totalOrder}</div>
            <div className="stat-footer">You made an extra 1,943 this year</div>
          </div>
          <div className="stat">
            <div className="stat-header">
              Total Sales
              <span className="stat-trend down">27.4%</span>
            </div>
            <div className="stat-value">$35,078</div>
            <div className="stat-footer">
              You made an extra $20,395 this year
            </div>
          </div>
        </div>
      </div>
      <div>
        <Chart />
      </div>
      <div>
        <div>
          <RecentOrders />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
