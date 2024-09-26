import { MdEmail } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Planet from "../assets/Planet.svg";
// import { getAllEmail } from "../Service/Allapi";
import {getAllEmail} from "../../services/Allapi"
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
        setUnreadCount(emails.filter(email => !email.isRead).length);
      } catch (error) {
        console.error("Error fetching emails", error);
      }
    };
    fetchEmails();
  }, []);

  const handleEmailClick = () => {
    navigate("/ViewEmail");
    const updatedEmails = emailData.map(email => ({ ...email, isRead: true }));
    setEmailData(updatedEmails);
    setUnreadCount(0);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src='' alt="Logo" className="w-56 h-auto" />
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-4">
          {/* Email Icon */}
          <div className="relative">
            <MdEmail className="text-xl cursor-pointer" onClick={handleEmailClick} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Notifications Icon */}
          <div className="relative">
            <IoIosNotifications className="text-xl cursor-pointer" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              250
            </span>
          </div>

          {/* Avatar and Name */}
          <div className="flex items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/012/210/707/non_2x/worker-employee-businessman-avatar-profile-icon-vector.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <p className="ml-2 text-sm font-medium">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
