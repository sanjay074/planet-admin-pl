import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import EditProductPopup from "./EditProductPopup";
import { DeleteProductDetails, getAllProductApi } from "../../services/Allapi";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getAllProductApi();
        const products = result.data?.getAllData || [];
        if (Array.isArray(products)) {
          setProductList(products);
        } else {
          console.error("Expected an array from API, but got:", products);
        }
      } catch (error) {
        console.log("Error in getting data from API:", error);
        setProductList([]);
      }
    };
    getData();
  }, []);

  const lastPage = currentPage * itemsPerPage;
  const firstPage = lastPage - itemsPerPage;
  const currentItems = Array.isArray(productList)
    ? productList.slice(firstPage, lastPage)
    : [];
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadAsTxt = () => {
    const content = Array.isArray(productList)
      ? productList
        .map(
          (product) =>
            `Product: ${product.name}, Product ID: ${product._id
            }, Base Price: Rs ${product.basePrice}, Final Price: Rs ${product.finalPrice
            }, Stock: ${product.stock ? "In Stock" : "Out Of Stock"}`
        )
        .join("\n")
      : "";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "products.txt");
  };

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(productList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };
  const printPage = () => {
    window.print();
  };

  const handleDelete = async (id) => {
    const isDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isDelete) {
      await DeleteProductDetails(id);
      setProductList(productList.filter((item) => item._id !== id));
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleClosePopup = () => {
    setEditingProduct(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className=" w-full mx-auto h-screen  bg-slate-100 text-black">
      <div className=" flex justify-between items-center mb-5 mt-16 p-4">
        <button
          onClick={downloadAsTxt}
          className="bg-cyan-300 text-white px-4 py-2 rounded-lg mr-2"
        >
          Txt
        </button>
        <button
          onClick={downloadAsExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
        >
          Excel
        </button>
        <button
          onClick={printPage}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg mr-2"
        >
          Print
        </button>
        <input
          type="text"
          placeholder="Search Product List Here"
          className="search  flex-grow p-2 rounded-lg mr-2"
        />
        <button
          onClick={() => navigate("/AddProduct")}
          className="bg-stone-900 text-white px-4 py-2 rounded-2xl"
        >
          + Add New
        </button>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left border">Product</th>
            <th className="p-2 text-left border">Product ID</th>
            <th className="p-2 text-left border">Base Price</th>
            <th className="p-2 text-left border">Final Price</th>
            <th className="p-2 text-left border">Stock</th>
            <th className="p-2 text-left border">Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center">
                No products available
              </td>
            </tr>
          ) : (
            currentItems.map((product, index) => (
              <tr
                key={product._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-2 border">
                  <img
                    src={
                      product.images &&
                        Array.isArray(product.images) &&
                        product.images.length > 0
                        ? product.images[0]
                        : "default-image.jpg"
                    }
                    alt={product.name || "Default Name"}
                    className="w-12 h-12 inline-block mr-2"
                  />
                  {product.name || "No Name Available"}
                </td>
                <td className="p-2 border">{product._id}</td>
                <td className="p-2 border">Rs {product.basePrice}</td>
                <td className="p-2 border">Rs {product.finalPrice}</td>
                <td className="p-2 border">
                  {product.stock ? "In Stock" : "Out Of Stock"}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="text-xl"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-xl ml-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-xl ml-2 text-red-500"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination flex justify-center mt-5 mb-5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-4 py-2 border ${currentPage === i + 1 ? "bg-purple-500 text-white" : "bg-gray-200"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {editingProduct && (
        <EditProductPopup
          product={editingProduct}
          onClose={handleClosePopup}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};
export default ProductList;
