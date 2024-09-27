// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import RecentOrders from "./RecenetOrder";
import { GetAllUserList, ProductHistory } from "../../services/Allapi";

const Dashboard = () => {
    const [totalUser, setTotalUser] = useState("");
    const [totalOrder, setTotalOrder] = useState("");
    console.log(totalOrder, "total historyf");

    useEffect(() => {
        const getTotalUser = async () => {
            try {
                const result = await GetAllUserList();
                setTotalUser(result.data.totalUser);
            } catch (error) {
                console.error("facing problem in getting totalUser from api", error);
            }
        };
        getTotalUser();
    }, []);

    useEffect(() => {
        const getTotalOrder = async () => {
            try {
                const result = await ProductHistory();
                console.log(result, "total result history");
                setTotalOrder(result.data.total);
            } catch (error) {
                console.error(
                    "facing problem in getting data from totalhistory",
                    error
                );
            }
        };
        getTotalOrder();
    }, []);

    return (
        <>
            <div className="flex-1 p-2 text-black mt-16 w-full">
                <h3 className="text-2xl font-bold">Good Morning</h3>
                <p className="text-xl text-red-300 font-semibold">Here the today update</p>
                <div className="flex justify-between gap-5 flex-wrap mt-5">
                    <div className=" p-5 rounded-lg shadow-md flex-1 text-center bg-green-100 ">
                        <div className="text-sm text-gray-600 mb-2 flex justify-between items-center font-semibold ">
                            Total Page Views
                            <span className="text-xs py-1 px-2 rounded-xl  text-teal-700 bg-red-100 font-bold">
                                59.3%
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">4,42,236</div>
                        <div className="text-xs text-gray-500">
                            You made an extra 35,000 this year
                        </div>
                    </div>
                    <div className=" p-5 rounded-lg shadow-md flex-1 text-center bg-pink-100">
                        <div className="text-sm text-gray-600 mb-2 flex justify-between items-center font-semibold">
                            Total Users
                            <span className="text-xs py-1 px-2 rounded-xl bg-cyan-100 text-teal-700 font-bold">
                                70.5%
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{totalUser}</div>
                        <div className="text-xs text-gray-500">
                            You made an extra 8,900 this year
                        </div>
                    </div>

                    <div className="p-5 rounded-lg shadow-md flex-1 text-center bg-yellow-100">
                        <div className="text-sm text-gray-600 mb-2 flex justify-between items-center font-semibold ">
                            Total Order
                            <span className="text-xs py-1 px-2 rounded-xl bg-blue-200 text-red-700 font-bold">
                                27.4%
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{totalOrder}</div>
                        <div className="text-xs text-gray-500">
                            You made an extra 1,943 this year
                        </div>
                    </div>

                    <div className="bg-blue-100 p-5 rounded-lg shadow-md flex-1 text-center">
                        <div className="text-sm text-gray-600 mb-2 flex justify-between items-center font-semibold">
                            Total Sales
                            <span className="text-xs py-1 px-2 rounded-xl bg-red-100 text-blue-700 font-bold">
                                27.4%
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">$35,078</div>
                        <div className="text-xs text-gray-500">
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
