// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./Event.css";
// import popcorn from "./popcorn-svgrepo-com.svg";
// import satelite from "./satellite-svgrepo-com.svg";
// import football from "./cricket-game-svgrepo-com.svg";
// import music from "./music-svgrepo-com.svg";
// import dice from "./game-die-svgrepo-com.svg";
// import book from "./books-svgrepo-com.svg";
// import other from "./celebrate-svgrepo-com.svg";

// const Event = () => {
//   const [event, setEvent] = useState({});
//   const [user, setUser] = useState({});
//   // const [price,setPrice] = useState("");
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/fetch-event/${id}`)
//       .then((res) => {
//         setEvent(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);
//   useEffect(() => {
//     if (event && event.creator) {
//       axios
//         .get(`http://localhost:4000/fetch-user/${event.creator}`)
//         .then((res) => {
//           console.log(res);
//           console.log(res.data);
//           setUser(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [event]);

//   // Function to determine whether the event is public or private
//   const determinePrivacy = () => {
//     if (event.public) {
//       return "Public";
//     } else if (event.private) {
//       return "Private";
//     } else {
//       return "Unknown"; // Handle the case where neither public nor private is specified
//     }
//   };
//   let svgimg = "";
//   if (event.category === "Entertainment") {
//     svgimg = popcorn;
//   } else if (event.category === "Sports") {
//     svgimg = football;
//   } else if (event.category === "Music") {
//     svgimg = music;
//   } else if (event.category === "Games") {
//     svgimg = dice;
//   } else if (event.category === "Education") {
//     svgimg = book;
//   } else if (event.category === "Technology") {
//     svgimg = satelite;
//   } else {
//     svgimg = other;
//   }

//   // Function to format the date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(); // Adjust the format as needed
//   };
//   let occupancy = event.size - (event.attendees?.length || 0);




//   return (
//     <div className="">
//       <div className="m-10 mx-20">
//         <div className="flex gap-3">
//           <div className="image-container">
//             <img src={event.image} className="image" alt="Event" />
//           </div>
//           <div className="">
//             <div className="details flex items-center justify-around">
//               <div className="flex flex-col gap-2">
//                 <h2 className="font-semibold absolute">{event.title}</h2>
//                 <div className="flex gap-2 items-center pt-10">
//                   <i className="fi fi-rr-bookmark text-lg" id="bookmark"></i>
//                   <p>{event.category}</p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <i className="fi fi-rr-earth-americas"></i>
//                   <p>{event.availability}</p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <i className="fi fi-rr-calendar-day"></i>
//                   <p>{formatDate(event.date)}</p>
//                   <p>{event.time}</p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <i class="fi fi-rr-marker"></i>
//                   <p>{event.location}</p>
//                 </div>
//               </div>
//               <div className="">
//                 <img src={svgimg} className="svg" />
//               </div>
//             </div>
//             <div className="mt-3 details">
//               <div className="flex gap-2 items-center ml-3">
//                 <i class="fi fi-rr-user"></i>
//                 <p>{user.username}</p>
//               </div>
//               <div className="flex gap-2 items-center ml-3">
//               <i class="fi fi-rr-chair"></i>
//                 <p>{event.size - event.attendees.length}</p>
//               </div>
//               <div className="flex gap-2 items-center ml-3">
//               <i class="fi fi-rr-ticket"></i>
//                 <p>{occupancy}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Event;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Event.css";
// Importing SVGs directly might require a specific loader or import method depending on your setup
import popcorn from "./popcorn-svgrepo-com.svg";
import satelite from "./satellite-svgrepo-com.svg";
import football from "./cricket-game-svgrepo-com.svg";
import music from "./music-svgrepo-com.svg";
import dice from "./game-die-svgrepo-com.svg";
import book from "./books-svgrepo-com.svg";
import other from "./celebrate-svgrepo-com.svg";

const Event = () => {
  // Initialize event with an empty attendees array to prevent undefined errors
  const [event, setEvent] = useState({ attendees: [] });
  const [user, setUser] = useState({});
  const { id } = useParams();

  // Fetch event data
  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-event/${id}`)
      .then((res) => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Fetch user data based on the event creator
  useEffect(() => {
    if (event.creator) {
      axios
        .get(`http://localhost:4000/fetch-user/${event.creator}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [event.creator]); // Depend on event.creator to avoid unnecessary requests

  // Function to determine event privacy
  const determinePrivacy = () => {
    if (event.public) {
      return "Public";
    } else if (event.private) {
      return "Private";
    }
    return "Unknown"; // Handle case where neither public nor private is specified
  };

  // Function to select SVG based on category
  const selectSVG = (category) => {
    switch (category) {
      case "Entertainment":
        return popcorn;
      case "Sports":
        return football;
      case "Music":
        return music;
      case "Games":
        return dice;
      case "Education":
        return book;
      case "Technology":
        return satelite;
      default:
        return other;
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as needed
  };

  // Calculate occupancy
  let occupancy = event.size - (event.attendees?.length || 0);

  let cost = 0;
  if(event.price == 0)
      cost = "Free";
  else 
    cost = event.price;

  return (
    <div className="">
      <div className="m-10 mx-20">
        <div className="flex gap-3">
          <div className="image-container">
            <img src={event.image} className="image" alt="Event" />
          </div>
          <div className="">
            <div className="details flex items-center justify-around">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold absolute">{event.title}</h2>
                <div className="flex gap-2 items-center pt-10">
                  <i className="fi fi-rr-bookmark text-lg" id="bookmark"></i>
                  <p>{event.category}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <i className="fi fi-rr-earth-americas"></i>
                  <p>{event.availability}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <i className="fi fi-rr-calendar-day"></i>
                  <p>{formatDate(event.date)}</p>
                  <p>{event.time}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <i className="fi fi-rr-marker"></i>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className="">
                <img src={selectSVG(event.category)} className="svg" />
              </div>
            </div>
            <div className="mt-3 details">
              <div className="flex gap-2 items-center ml-3">
                <i className="fi fi-rr-user"></i>
                <p>{user.username}</p>
              </div>
              <div className="flex gap-2 items-center ml-3">
                <i className="fi fi-rr-chair"></i>
                <p>{event.size - (event.attendees?.length || 0)} left</p>
              </div>
              <div className="flex gap-2 items-center ml-3">
                <i className="fi fi-rr-ticket"></i>
                <p>{cost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

