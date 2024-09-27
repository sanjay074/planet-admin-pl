import { useEffect, useState } from "react";
import { BrandGet, Branddelete, Brandupdate } from "../services/Allapi";
import BrandCard from "./BrandCard";

const BrandList = () => {
  const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingOffer, setEditingOffer] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        pic: ''
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
     console.log(editForm.name)
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await BrandGet();
                setOffers(data.data.record);
                setFilteredOffers(data.data.record); // Initialize filtered offers
            } catch (error) {
                console.error("Error fetching offers:", error);
            }
        };
        fetchOffers();
    }, []);

    // Handle the search functionality
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = offers.filter(offer =>
            offer.name.toLowerCase().includes(value) || offer._id.toLowerCase().includes(value)
        );
        setFilteredOffers(filtered);
    };

    const handleDelete = async (id) => {
        try {
            const ischeck = window.confirm("Are you sure you want to delete this Product?");
            if (ischeck) {
                await Branddelete(id);
                setOffers(prevOffers => prevOffers.filter(offer => offer._id !== id));
                setFilteredOffers(prevOffers => prevOffers.filter(offer => offer._id !== id));
            }
        } catch (error) {
            console.error("Error deleting offer:", error);
        }
    };

    const handleEdit = (offer) => {
        setEditingOffer(offer);
        setEditForm({
            name: offer.name,
            pic: ''
        });
        setImagePreviews([offer.pic]);
        setIsModalOpen(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);

        setEditForm(prevForm => ({
            ...prevForm,
            pic: file
        }));

        setImagePreviews([preview]);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', editForm.name);
            formData.append('pic', editForm.pic);

            await Brandupdate(editingOffer._id, formData);

            setOffers(prevOffers =>
                prevOffers.map(offer =>
                    offer._id === editingOffer._id
                        ? {
                            ...offer,
                            name: editForm.name,
                            pic: imagePreviews[0]
                        }
                        : offer
                )
            );

            setEditingOffer(null);
            setEditForm({ name: '', pic: '' });
            setImagePreviews([]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating offer:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingOffer(null);
    };

  return (
    <>
      <div className="mx-2 mt-20">
        <div className="h-9 ps-3 bg-cyan-500 rounded-md text-2xl capitalize font-bold text-slate-900">
          Brands List
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or ID"
          className="bg-slate-100 mt-5 h-10 rounded-md outline-none border border-slate-400 hover:border-blue-400 capitalize px-3 text-lg"
        />
      </div>

      <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-2">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div key={offer._id}>
              <BrandCard
                id={offer._id}
                img={offer.pic}
                imgalt={offer.name}
                offername={offer.name}
                handleDelete={handleDelete}
                handleedit={handleEdit}
              />
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h4 className="font-semibold capitalize text-2xl">Edit Offer</h4>
            <div className="w-full mt-5">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleFormChange}
                placeholder="Offer Name"
                className="bg-slate-600 w-full h-10 rounded-md ps-1 font-bold text-slate-50"
              />
            </div>
            <div className="mt-5">
              <h4 className="mb-5 text-xl font-bold">Upload Image</h4>
              <div className="flex gap-4">
                <div className="w-[450px] h-28 border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center">
                  <label
                    className="text-slate-500 text-lg font-semibold cursor-pointer p-1"
                    htmlFor="imageUpload"
                  >
                    Click to Upload
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {imagePreviews.map((preview, index) => (
                  <div key={index} className="w-24 h-24 border-2 relative">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                     
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(preview);
                        setImagePreviews([]);
                        setEditForm((prevForm) => ({
                          ...prevForm,
                          pic: "",
                        }));
                      }}
                      className="absolute top-0 right-0 bg-red-700 border-0 text-slate-50 px-1 py-1 rounded-sm"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className=" mt-5">
              <button
                onClick={handleUpdate}
                className="px-2 py-2 bg-blue-500 capitalize rounded-lg font-semibold text-slate-50"
              >
                Update Offer
              </button>
              <button
                onClick={handleCloseModal}
                className="px-2 py-2 bg-gray-500 capitalize rounded-lg font-semibold text-slate-50 ms-2" 
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandList;
