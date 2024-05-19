// // import React, { useEffect } from "react";
// // import "./Home.css";
// // import { Link } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";
// // import { useCookies } from "react-cookie";

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [cookies, setCookie, removeCookie] = useCookies(["user"]);

// //   const handleDash = () => {
// //     navigate("/dashboard");
// //   };
// //   const handleLogout = () => {
// //     removeCookie("userId");
// //     removeCookie("token")
// //   };
// //   useEffect(() => {}, [cookies.userId]);
// //   return (
// //     <>
// //       <div className="container-1 p-[2%] px-[10vw] flex flex-col ">
// //         <div>
// //           <nav className="list-none flex gap-3 float-right">
// //             <li>
// //               <Link to="/about">About</Link>
// //             </li>
// //             {cookies.userId ? ( // Check if user cookie exists
// //               <>
// //                 <li>
// //                   <Link to="/dashboard">Dashboard</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/create-event">Add Event</Link>
// //                 </li>
// //                 <li>
// //                   <button onClick={handleLogout}>Logout</button>
// //                 </li>
// //               </>
// //             ) : (
// //               <li>
// //                 <Link to="/login">Login</Link>
// //               </li>
// //             )}
// //           </nav>
// //           <h1>Event Manager</h1>
// //         </div>
// //         <div className="flex flex-col justify-center items-center mt-[25vh]">
// //           <h1 className="text-4xl font-bold">Welcome to Event Manager</h1>
// //           <p className="text-lg mt-4">
// //             A place to explore and create events around you
// //           </p>
// //           <div className="flex gap-10 mt-5">
// //             <button className="home-button" onClick={handleDash}>
// //               Dashboard
// //             </button>
// //             <button className="home-button">Explore</button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Home;


// import React, { useEffect, useCallback } from "react";
// import "./Home.css";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);

//   const handleDash = useCallback(() => {
//     navigate("/dashboard");
//   }, [navigate]);

//   const handleLogout = useCallback(() => {
//     removeCookie("userId");
//     removeCookie("token");
//   }, [removeCookie]);

//   useEffect(() => {}, [cookies.userId]);

//   return (
//     <div className="container-1 p-[2%] px-[10vw] flex flex-col">
//       <div>
//         <nav className="list-none flex gap-3 float-right">
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           {cookies.userId ? (
//             <>
//               <li>
//                 <Link to="/dashboard">Dashboard</Link>
//               </li>
//               <li>
//                 <Link to="/create-event">Add Event</Link>
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//             </>
//           ) : (
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           )}
//         </nav>
//         <h1>Event Manager</h1>
//       </div>
//       <div className="flex flex-col justify-center items-center mt-[25vh]">
//         <h1 className="text-4xl font-bold">Welcome to Event Manager</h1>
//         <p className="text-lg mt-4">
//           A place to explore and create events around you
//         </p>
//         <div className="flex gap-10 mt-5">
//           <button className="home-button" onClick={handleDash}>
//             Dashboard
//           </button>
//           <button className="home-button">Explore</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useCallback } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import background from "./blob-haikei.svg";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleDash = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    removeCookie("userId");
    removeCookie("token");
  }, [removeCookie]);

  useEffect(() => {}, [cookies.userId]);

  return (
    <div className="container-1 p-[2%] px-[10vw] flex flex-col">
      <div>
        {/* <nav className="list-none flex gap-3 float-right">
          <li>
            <Link to="/about">About</Link>
          </li>
          {cookies.userId ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/create-event">Add Event</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </nav> */}
        {/* <h1>Event Manager</h1> */}
      </div>
      <div className="flex flex-col justify-center items-center mt-[25vh]">
        <h1 className="text-4xl font-bold mt-10">Welcome to Event Manager</h1>
        <p className="text-lg mt-4">
          A place to explore and create events around you
        </p>
        <div className="flex gap-10 mt-5">
          <button className="home-button" onClick={handleDash}>
            Dashboard
          </button>
          <button className="home-button">Explore</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

