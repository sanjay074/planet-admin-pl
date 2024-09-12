import{ useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getAllProductApi } from '../../Service/Allapi';
import { DeleteProductDetails } from '../../Service/Allapi';

import { useNavigate } from 'react-router-dom';

import './ProductList.css';
import { EditProductPopup } from './EditProductPopup';

export const ProductList = () => {
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
     console.error('Expected an array from API, but got:', products);
    }
   } catch (error) {
    console.log('Error in getting data from API:', error);
    setProductList([]);
   }
  };
  getData();
 }, []);

 const lastPage = currentPage * itemsPerPage;
 const firstPage = lastPage - itemsPerPage;
 const currentItems = Array.isArray(productList) ? productList.slice(firstPage, lastPage) : [];
 const totalPages = Math.ceil(productList.length / itemsPerPage);

 const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
 };

 const downloadAsTxt = () => {
  const content = Array.isArray(productList)
   ? productList.map(
     (product) =>
      `Product: ${product.name}, Product ID: ${product._id}, Base Price: Rs ${product.basePrice}, Final Price: Rs ${product.finalPrice}, Stock: ${product.stock ? 'In Stock' : 'Out Of Stock'}`
    ).join('\n')
   : '';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'products.txt');
 };

 const downloadAsExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(productList);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  XLSX.writeFile(workbook, 'products.xlsx');
 };

 const downloadCSS = () => {
  const content = `
   .container1 { width: 80%; margin: 0 auto; }
   .actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
   .actions button, .actions input { margin: 0 5px; padding: 10px; border: none; cursor: pointer; }
   .search { flex-grow: 1; padding: 10px; border-radius: 5px; }
   .delete { background-color: red; color: white; }
   .add-new { background-color: purple; color: white; }
   table { width: 100%; border-collapse: collapse; }
   thead { background-color: #f4f4f4; }
   th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
   img { width: 50px; height: 50px; margin-right: 10px; vertical-align: middle; }
   .pagination { display: flex; justify-content: center; margin-top: 20px; }
   .pagination button { margin: 0 5px; padding: 10px; border: none; cursor: pointer; }
   .pagination .active { background-color: purple; color: white; }
  `;
  const blob = new Blob([content], { type: 'text/css;charset=utf-8' });
  saveAs(blob, 'styles.css');
 };

 const printPage = () => {
  window.print();
 };

 const handleDelete = async (id) => {
  const isDelete = window.confirm('Are you sure you want to delete this product?');
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
   prevList.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
  );
 };

 return (
  <div className="container1">
   <div className="actions">
    <button onClick={downloadCSS}>Css</button>
    <button onClick={downloadAsTxt}>Txt</button>
    <button onClick={downloadAsExcel}>Excel</button>
    <button onClick={printPage}>Print</button>
    <input type="text" placeholder="Search Product List Here " className="search" />
    <button onClick={() => navigate('/AddProduct')}>+ Add New Product</button>
   </div>
   <table>
    <thead>
     <tr>
      <th>Product</th>
      <th>Product ID</th>
      <th>Base Price</th>
      <th>Final Price</th>
      <th>Stock</th>
      <th>Action</th>
     </tr>
    </thead>
    <tbody>
     {productList.length === 0 ? (
      <tr>
       <td colSpan="6">No products available</td>
      </tr>
     ) : (
      currentItems.map((product, index) => (
       <tr key={product._id} className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
        <td>
         <img
          src={product.images && Array.isArray(product.images) && product.images.length > 0
           ? product.images[0]
           : 'default-image.jpg'}
          alt={product.name || 'Default Name'}
         />
         {product.name || 'No Name Available'}
        </td>
        <td>{product._id}</td>
        <td>Rs {product.basePrice}</td>
        <td>Rs {product.finalPrice}</td>
        <td>{product.stock ? 'In Stock' : 'Out Of Stock'}</td>
        <td>
         <button onClick={() => handleViewDetails(product._id)} style={{backgroundColor:"white"}}>👁️</button>
         <button onClick={() => handleEdit(product)} style={{backgroundColor:"white"}}>✏️</button>
         <button className="delete" style={{backgroundColor:"white"}} onClick={() => handleDelete(product._id)}>❌ </button>
        </td>
       </tr>
      ))
     )}
    </tbody>
   </table>
   <div className="pagination">
    {Array.from({ length: totalPages }, (_, i) => (
     <button
      key={i}
      onClick={() => handlePageChange(i + 1)}
      className={currentPage === i + 1 ? 'active' : ''}
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


