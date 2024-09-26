import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Planet from "../assets/Planet.svg";
import { getAllEmail } from "../services/Allapi";

const Header = () => {
    const navigate = useNavigate();
    const [emailData, setEmailData] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const result = await getAllEmail();
                const emails = Array.isArray(result.data.allData) ? result.data.allData : [];
                setEmailData(emails);
                setUnreadCount(emails.filter((email) => !email.isRead).length);
            } catch (error) {
                console.error("Error fetching emails", error);
            }
        };
        fetchEmails();
    }, []);

    const handleEmailClick = () => {
        navigate("/ViewEmail");
        const updatedEmails = emailData.map((email) => ({ ...email, isRead: true }));
        setEmailData(updatedEmails);
        setUnreadCount(0);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-lg flex justify-between items-center p-4 bg-blue-600">
            <div className="flex items-center">
                <img src={Planet} alt="Logo" className="w-40 h-auto" />
            </div>
            <div className="flex items-center space-x-6 ">
                {/* Email Icon with Badge */}
                <div className="relative">
                    <MdEmail
                        className="text-3xl  cursor-pointer text-white"
                        onClick={handleEmailClick}
                    />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </div>

                {/* Notifications Icon with Badge */}
                <div className="relative">
                    <IoIosNotifications className="text-3xl text-white cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        250
                    </span>
                </div>

                {/* Profile Section */}
                <div className="flex items-center space-x-2">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/012/210/707/non_2x/worker-employee-businessman-avatar-profile-icon-vector.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className=" font-semibold text-white">Admin</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
