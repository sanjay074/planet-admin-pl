import React from "react";

const BrandCard = (props) => {
  const { img, imgalt, offername, handleDelete, handleedit, id } = props;
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full  bg-white rounded-lg shadow-md shadow-slate-400 hover:shadow-xl hover:shadow-cyan-500 overflow-hidden">
        <img
          src={img}
          alt={imgalt}
          className="w-full h-64 object-cover px-3 py-3"
        />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 flex justify-center">
            name : {offername}
          </h3>

          <div className="mt-4 flex justify-center gap-3">
            <button className="bg-blue-600 text-white py-1  px-4 rounded hover:bg-blue-600 transition duration-200 capitalize font-medium text-lg" onClick={() => handleDelete(id)} >
              delete
            </button>
            <button className="bg-green-500 text-white  py-1 px-4 rounded hover:bg-green-600 transition duration-200 capitalize font-medium text-lg" onClick={() => handleedit(id)}>
              edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
