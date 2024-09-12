import  { useEffect, useState } from 'react';
import './ViewEmail.css';
import { getAllEmail } from '../../Service/Allapi';
import { useNavigate } from 'react-router-dom';

export const ViewEmail = () => {
    const [allData, setAllData] = useState([]);
const navigate=useNavigate()
    useEffect(() => {
        const getAllData = async () => {
            try {
                const result = await getAllEmail();
                setAllData(Array.isArray(result.data.allData) ? result.data.allData : []);
            } catch (error) {
                console.error(`Facing problem in getting all data from API`, error);
            }
        };
        getAllData();
    }, []);
const handalBack=()=>{
    navigate('/Dashboard')
}
    return (
        <div className='viewEmailContainer'>
            <h2>Email Details</h2>
            {allData.length === 0 ? (
                <div>No emails found.</div>
            ) : (
                <div className='emailGrid'>
                    {allData.map((item) => (
                        <div key={item._id} className='emailCard'>
                            <div className='emailInfo'>
                                <span><strong>Name:</strong> {item.name}</span>
                                <span><strong>Email:</strong> {item.email}</span>
                                <span><strong>Mobile:</strong> {item.mobile}</span>
                                <span><strong>Message:</strong> {item.message}</span>
                                <span><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</span>
                               
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handalBack} style={{marginTop:"10px"}}>Go Back</button>
        </div>
    );
};


