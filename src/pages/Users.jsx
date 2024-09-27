import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { GetAllUserList } from "../services/Allapi";

export const User = () => {
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await GetAllUserList();
                const data = Array.isArray(result.data.alluser) ? result.data.alluser : [];
                setUserList(data);
            } catch (error) {
                console.error("Facing problem in getAllUserData", error);
            }
        };
        getData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = searchQuery === "" ? userList : userList.filter((user) =>
        user.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const firstPage = (currentPage - 1) * itemsPerPage;
    const lastPage = firstPage + itemsPerPage;
    const currentItems = filteredUsers.slice(firstPage, lastPage);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const downloadAsTxt = () => {
        const content = userList
            .map(
                (user) =>
                    `Phone: ${user?.phone}, ID: ${user?._id}, Created At: ${user?.createdAt}`
            )
            .join("\n");
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "users.txt");
    };

    const downloadAsExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(userList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "users.xlsx");
    };

    const downloadCSS = () => {
        const content = `/* Tailwind optimized styles */`;
        const blob = new Blob([content], { type: "text/css;charset=utf-8" });
        saveAs(blob, "styles.css");
    };

    const printPage = () => {
        window.print();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto py-4 mt-20">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <button onClick={downloadAsTxt} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-700">
                    Txt
                </button>
                <button onClick={downloadAsExcel} className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-700">
                    Excel
                </button>
                <button onClick={printPage} className="bg-purple-500 text-white px-4 py-2 hover:bg-purple-700 rounded-xl">
                    Print
                </button>
                <input
                    type="text"
                    placeholder="Search by first name"
                    className="flex-grow border border-gray-300 rounded-xl px-4 py-2 shadow-lg"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">Phone Number</th>
                        <th className="py-2 px-4 text-left">First Name</th>
                        <th className="py-2 px-4 text-left">Last Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Created At</th>
                        <th className="py-2 px-4 text-left">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No user available</td>
                        </tr>
                    ) : (
                        currentItems.map((user) => (
                            <tr key={user._id} className="border-b">
                                <td className="py-2 px-4">{user?.phone || "N/A"}</td>
                                <td className="py-2 px-4">{user?.firstName || "N/A"}</td>
                                <td className="py-2 px-4">{user?.lastName || "N/A"}</td>
                                <td className="py-2 px-4">{user?.email || "N/A"}</td>
                                <td className="py-2 px-4">{new Date(user?.createdAt).toLocaleDateString()}</td>
                                <td className="py-2 px-4">{new Date(user?.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? "bg-purple-500 text-white" : "bg-gray-200"}`}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)} className="mx-1 px-4 py-2 bg-purple-500 text-white rounded">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default User;