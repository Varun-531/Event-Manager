// import React, { useContext } from "react";
// import { useCookies } from "react-cookie";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider"; // Adjust the path as necessary
// import toast from "react-hot-toast";

// const Header = () => {
//   const { isAuthenticated, login, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);
//   const handleLogin = () => {
//     navigate("/login"); // Navigate to the user board after login
//   };
//   const handleLogout = () => {
//     logout();
//     removeCookie("userId", { path: "/" });
//     toast.success("Logged out successfully");
//     navigate("/"); // Navigate to the home page after logout
//   };
//   const handleDash = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <div className="flex justify-between bg-slate-900 p-7 items-center">
//       <div className="text-slate-200 font-semibold text-xl">
//         <Link to="/">Event Manager</Link>
//       </div>
//       <nav className="text-slate-200">
//         <ul className="flex justify-center gap-7">
//           {isAuthenticated ? (
//             <>
//               <li>
//                 <button onClick={() => navigate("/create-event")}>
//                   Create Event
//                 </button>
//               </li>
//               <li className="cursor-pointer" onClick={handleDash}>
//                 Dashboard
//               </li>
//               <li
//                 className="headerLink cursor-pointer"
//                 onClick={() => navigate("/myEvents")}
//               >
//                 myEvents
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//             </>
//           ) : (
//             <li>
//               <button onClick={handleLogin}>Login</button>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Header;

import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider"; // Adjust the path as necessary
import toast from "react-hot-toast";
import logo from "./calender-day-love-svgrepo-com.svg";

const Header = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleLogout = () => {
    logout();
    removeCookie("userId", { path: "/" });
    toast.success("Logged out successfully");
    navigate("/"); // Navigate to the home page after logout
  };

  // Function to determine if the link should be highlighted
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex justify-between bg-slate-900 p-3 items-center">
      <div className=" flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-14" />
        </Link>
        <Link
          className="hidden md:block text-slate-200 font-semibold text-xl"
          to="/"
        >
          Event Manager
        </Link>
      </div>
      <nav className="text-slate-200">
        <ul className="flex justify-center md:gap-7 gap-5">
          {isAuthenticated ? (
            <>
              <li></li>
              <li
                className={`cursor-pointer ${
                  isActive("/dashboard") ? "text-slate-500 font-semibold" : ""
                }`}
                onClick={() => navigate("/dashboard")}
              >
                All Events
              </li>
              <li
                // className="headerLink cursor-pointer"
                className={`cursor-pointer ${
                  isActive("/myEvents") ? "text-slate-500 font-semibold" : ""
                }`}
                onClick={() => navigate("/myEvents")}
              >
                My Events
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogin}>Login</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
