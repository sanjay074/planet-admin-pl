import { useState } from 'react';
import { OfferPost } from '../services/Allapi';
import { useNavigate } from 'react-router-dom';

export const AddOffer = () => {
    const navigate = useNavigate();
    const [subbrand, setSubbrand] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [types, setTypes] = useState('');

    const handleSubbrandChange = (event) => {
        setSubbrand(event.target.value);
    };

    const handleTypesChange = (event) => {
        setTypes(event.target.value);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSaveProduct = async (event) => {
        event.preventDefault();
        setLoading(false);
        setError('');
        if (!subbrand || !types) {
            setError("Please fill out all fields");
            setLoading(false);
            return;
        }
        if (images.length === 0) {
            setError("Please upload at least one image");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', subbrand);
            formData.append('offerType', types);
            images.forEach((file) => {
                formData.append('offerImage', file);
            });

            console.log('FormData entries before sending:');
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            await OfferPost(formData);
            alert('Offers saved successfully!');
            setSubbrand('');
            setTypes('');
            setImages([]);
            setImagePreviews([]);
            navigate('/ViewOffer');
        } catch (error) {
            console.error('Error saving offers:', error);
            setError('Failed to save offers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Add Offers</h1>
                <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Offers Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Offers Name"
                            value={subbrand}
                            onChange={handleSubbrandChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Offers Type</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={types}
                            onChange={handleTypesChange}
                        >
                            <option>Select Offer Type</option>
                            <option>mens</option>
                            <option>womens</option>
                            <option>footwear</option>
                        </select>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium text-gray-700">Upload Images</h4>
                        <div className="flex flex-wrap gap-4">
                            <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer">
                                Click to upload
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            URL.revokeObjectURL(preview);
                                            setImagePreviews(imagePreviews.filter((_, i) => i !== index));
                                            setImages(images.filter((_, i) => i !== index));
                                        }}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-md px-2 py-1"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading ? 'Saving...' : 'Save Offers'}
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddOffer;