import { useEffect, useState } from "react";
import { OfferGet, OfferDelete, OfferUpdate } from "../services/Allapi";

export const ViewOffer = () => {
    const [offers, setOffers] = useState([]);
    const [editingOffer, setEditingOffer] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        offerType: '',
        offerImage: ''
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await OfferGet();
                setOffers(data.data.data);
            } catch (error) {
                console.error("Error fetching offers:", error);
            }
        };
        fetchOffers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const ischeck = window.confirm("Are you sure you want to delete this offer?");
            if (ischeck) {
                await OfferDelete(id);
                setOffers(prevOffers => prevOffers.filter(offer => offer._id !== id));
            }
        } catch (error) {
            console.error("Error deleting offer:", error);
        }
    };

    const handleEdit = (offer) => {
        setEditingOffer(offer);
        setEditForm({
            name: offer.name,
            offerType: offer.offerType,
            offerImage: ''
        });
        setImagePreviews([offer.offerImage]);
        setIsModalOpen(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        setEditForm(prevForm => ({
            ...prevForm,
            offerImage: file
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
            formData.append('offerType', editForm.offerType);
            formData.append('offerImage', editForm.offerImage);

            await OfferUpdate(editingOffer._id, formData);

            setOffers(prevOffers =>
                prevOffers.map(offer =>
                    offer._id === editingOffer._id
                        ? { ...offer, name: editForm.name, offerType: editForm.offerType, offerImage: imagePreviews[0] }
                        : offer
                )
            );

            setEditingOffer(null);
            setEditForm({ name: '', offerType: '', offerImage: '' });
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
        <div className="container mx-auto p-4 mt-20">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">View Offers</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {offers.length > 0 ? (
                    offers.map(offer => (
                        <div key={offer._id} className="bg-gray-100 border-2 shadow-lg rounded-lg p-4">
                            <img src={offer.offerImage} alt={offer.name} className="w-full h-64 object-cover mb-4 rounded" />
                            <h4 className="text-lg font-semibold text-gray-800">Name: {offer.name}</h4>
                            <h4 className="text-md text-gray-600">Type: {offer.offerType}</h4>
                            <div className="flex justify-between mt-4">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleEdit(offer)}>Edit</button>
                                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => handleDelete(offer._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No offers available</p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h4 className="text-lg font-semibold mb-4 text-gray-900">Edit Offer</h4>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleFormChange}
                                placeholder="Offer Name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="offerType"
                                value={editForm.offerType}
                                onChange={handleFormChange}
                                placeholder="Offer Type"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <h4 className="mb-2 text-gray-700">Upload Image</h4>
                            <label className="w-full h-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                Click to upload
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative mt-4">
                                    <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded border" />
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white text-sm p-1 rounded"
                                        onClick={() => {
                                            URL.revokeObjectURL(preview);
                                            setImagePreviews([]);
                                            setEditForm(prevForm => ({ ...prevForm, offerImage: '' }));
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleUpdate}>
                                Update Offer
                            </button>
                            <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ViewOffer