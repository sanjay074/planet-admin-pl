import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./User.css";
import { GetAllUserList } from "../../Service/Allapi";

export const User = () => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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

  // Filter userList based on the search query
  const filteredUsers = userList.filter((user) =>
    user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const firstPage = (currentPage - 1) * itemsPerPage;
  const lastPage = firstPage + itemsPerPage;
  const currentItems = filteredUsers.slice(firstPage, lastPage);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const downloadAsTxt = () => {
    const content = userList
      .map(
        (user) =>
          `Phone: ${user.phone}, ID: ${user._id}, Created At: ${user.createdAt}`
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
    const content = `
      .container4 {
        width: 80%;
        margin: 0 auto;
      }
      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .actions button, .actions input {
        margin: 0 5px;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      .search {
        flex-grow: 1;
        padding: 10px;
        border-radius: 5px;
      }
      .delete {
        background-color: red;
        color: white;
      }
      .add-new {
        background-color: purple;
        color: white;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      thead {
        background-color: #f4f4f4;
      }
      th, td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
      }
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .pagination {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      .pagination button {
        margin: 0 5px;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      .pagination .active {
        background-color: purple;
        color: white;
      }
    `;
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
    <div className="container4">
      <div className="actions2">
        <button onClick={downloadCSS}>Css</button>
        <button onClick={downloadAsTxt}>Txt</button>
        <button onClick={downloadAsExcel}>Excel</button>
        <button onClick={printPage}>Print</button>
        <input
          type="text"
          placeholder="Search by Phone Number"
          className="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* <button className="add-new">+ Add New</button> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4">No user available</td>
            </tr>
          ) : (
            currentItems.map((user) => (
              <tr key={user._id}>
                <td>{user.phone}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                {/* <td>
                  <button>❌</button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};
