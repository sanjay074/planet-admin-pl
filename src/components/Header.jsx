// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Avatar,
//   Badge,
// } from "@mui/material";
// import { MdEmail } from "react-icons/md";
// import { IoIosNotifications } from "react-icons/io";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Planet from "../assets/Planet.svg";
// import { useEffect, useState } from "react";
// import { getAllEmail } from "../Service/Allapi";

// const Logo = styled("img")({
//   width: "220px",
//   height: "auto",
// });

// const Header = () => {
//   const navigate = useNavigate();
//   const [emailData, setemailData] = useState([]);
//   console.log(emailData, "emaildata from api ////");
//   useEffect(() => {
//     const getemail = async () => {
//       try {
//         const result = await getAllEmail();
//         setemailData(
//           Array.isArray(result.data.allData) ? result.data.allData : []
//         );
//       } catch (error) {
//         console.error(`facing problem in getting email`, error);
//       }
//     };
//     getemail();
//   }, []);

//   const handleEmailClick = () => {
//     navigate("/ViewEmail");
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           top: 0,
//           left: 0,
//           zIndex: 1000,
//           width: "100%",
//           boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <Logo src={Planet} alt="Logo" />
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//             <IconButton color="inherit" aria-label="Notifications">
//               <Badge
//                 badgeContent={emailData.length}
//                 color="error"
//                 aria-label="Email"
//                 onClick={handleEmailClick}
//               >
//                 <MdEmail />
//               </Badge>
//             </IconButton>
//             <IconButton color="inherit" aria-label="Notifications">
//               <Badge badgeContent={250} color="error">
//                 <IoIosNotifications />
//               </Badge>
//             </IconButton>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <Avatar
//                 src="https://static.vecteezy.com/system/resources/previews/012/210/707/non_2x/worker-employee-businessman-avatar-profile-icon-vector.jpg"
//                 alt="Profile"
//                 sx={{ width: 40, height: 30, paddingLeft: "10px" }}
//               />
//               <Typography variant="body1">Admin</Typography>
//             </div>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };

// export default Header;
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Planet from "../assets/Planet.svg";
import { useEffect, useState } from "react";
import { getAllEmail } from "../Service/Allapi";

const Logo = styled("img")({
  width: "220px",
  height: "auto",
});

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
        setUnreadCount(emails.filter(email => !email.isRead).length); // Assuming email data has an 'isRead' field
      } catch (error) {
        console.error("Error fetching emails", error);
      }
    };
    fetchEmails();
  }, []);

  const handleEmailClick = () => {
    navigate("/ViewEmail");
    // Update unread count if needed (e.g., by marking emails as read)
    const updatedEmails = emailData.map(email => ({ ...email, isRead: true }));
    setEmailData(updatedEmails);
    setUnreadCount(0);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo src={Planet} alt="Logo" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <IconButton color="inherit" aria-label="Emails">
            <Badge
              badgeContent={unreadCount}
              color="error"
              aria-label="Email"
              onClick={handleEmailClick}
            >
              <MdEmail />
            </Badge>
          </IconButton>
          <IconButton color="inherit" aria-label="Notifications">
            <Badge badgeContent={250} color="error">
              <IoIosNotifications />
            </Badge>
          </IconButton>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="https://static.vecteezy.com/system/resources/previews/012/210/707/non_2x/worker-employee-businessman-avatar-profile-icon-vector.jpg"
              alt="Profile"
              sx={{ width: 40, height: 30, paddingLeft: "10px" }}
            />
            <Typography variant="body1">Admin</Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
