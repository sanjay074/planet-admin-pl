import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../../services/Allapi";

 const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await GetSingleProduct(id);
        setProduct(result.data.record);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between bg-gray-50 border border-gray-200 rounded-lg p-5 w-full max-w-5xl mx-auto mt-20 shadow-lg">
      <div className="lg:w-1/3 flex flex-col items-center mb-5 lg:mb-0">
        <div className="flex flex-wrap justify-center gap-4">
          {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <div key={index} className="w-48 h-48 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <img src={image} alt={`Product Image ${index + 1}`} className="object-cover w-full h-full" />
              </div>
            ))
          ) : (
            <div className="w-48 h-48 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <img src="default-image.jpg" alt="Default Product" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
        <div className={`mt-4 px-4 py-2 rounded-md font-bold ${product.stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {product.stock ? "In Stock" : "Out Of Stock"}
        </div>
      </div>
      <div className="lg:w-2/3 lg:pl-8">
        <div className="bg-blue-200 text-center rounded-lg p-4 mb-5">
          <h1 className="text-2xl font-bold">Product Details</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Product ID", value: product._id || "N/A" },
            { label: "Name", value: product.name || "N/A" },
            { label: "Base Price", value: `Rs ${product.basePrice || "N/A"}` },
            { label: "Final Price", value: `Rs ${product.finalPrice || "N/A"}` },
            { label: "Discount Price", value: `Rs ${product.discountPrice || "N/A"}` },
            { label: "Description", value: product.description || "N/A" },
          ].map((field, index) => (
            <div key={index} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
              <p className="text-lg">
                <strong>{field.label}:</strong> <span className="ml-2">{field.value}</span>
              </p>
            </div>
          ))}
        </div>
        <button onClick={() => window.history.back()} className="mt-8 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
          Go Back
        </button>
      </div>
    </div>
  );
};
export default ProductDetails