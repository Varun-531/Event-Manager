// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PropagateLoader from "react-spinners/PropagateLoader";
// import { toast } from "react-hot-toast";
// // import wave from "./wave.svg"

// const RequestDetailsPopup = ({ requests, closePopup }) => {
//   const [senderData, setSenderData] = useState({});
//   const [eventData, setEventData] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchSenderData = async () => {
//       try {
//         const senderIds = requests.map((request) => request.from);
//         const senderDataMap = {};
//         for (const senderId of senderIds) {
//           const response = await axios.get(
//             `http://localhost:4000/fetch-user/${senderId}`
//           );
//           senderDataMap[senderId] = response.data;
//         }
//         setSenderData(senderDataMap);
//       } catch (error) {
//         console.error("Error fetching sender data:", error);
//       }
//     };

//     const fetchEventData = async () => {
//       try {
//         const eventIds = requests.map((request) => request.eventId); // Assuming 'eventId' is the field for the event ID
//         const eventDataMap = {};
//         for (const eventId of eventIds) {
//           const response = await axios.get(
//             `http://localhost:4000/fetch-event/${eventId}`
//           );
//           eventDataMap[eventId] = response.data;
//         }
//         setEventData(eventDataMap);
//       } catch (error) {
//         console.error("Error fetching event data:", error);
//       }
//     };

//     fetchSenderData();
//     fetchEventData();
//   }, [requests]);

//   const handleAccept = async (requestId) => {
//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:4000/accept-request`, { requestId });
//       toast.success("Request accepted successfully");
//       // You can optionally update the UI to reflect the change in status

//       setLoading(false);
//     } catch (error) {
//       console.error("Error accepting request:", error);
//       setLoading(false);
//       toast.error("Error accepting request");
//       // Handle error or display a notification to the user
//     }
//   };

//   const handleDecline = async (requestId) => {
//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:4000/decline-request`, { requestId });
//       // You can optionally update the UI to reflect the change in status
//       setLoading(false);
//       toast.success("Request declined successfully");
//     } catch (error) {
//       console.error("Error declining request:", error);
//       // Handle error or display a notification to the user
//       setLoading(false);
//       toast.error("Error declining request");
//     }
//   };

//   return (
//     <>
//       {loading && (
//         <div className="loader-overlay">
//           <PropagateLoader
//             loading={loading}
//             speedMultiplier={1}
//             size={20}
//             aria-label="Loading Spinner"
//           />
//         </div>
//       )}
//       <div className="popup-overlay">
//         <div className="popup-content w-1/3">
//           <button className="close-button" onClick={closePopup}>
//             &times;
//           </button>
//           <h2>Requests Details</h2>
//           <div className="flex flex-col gap-2 popup popup-inner-content">
//             {requests.map((request) => (
//               <div
//                 key={request._id}
//                 className="flex justify-between items-center gap-5 mt-10"
//               >
//                 <div>
//                   <p>From: {senderData[request.from]?.username}</p>
//                   <p>Email: {senderData[request.from]?.email}</p>
//                   <p>Event Name: {eventData[request.eventId]?.title}</p>{" "}
//                 </div>
//                 <div>
//                   {request.status === "Pending" ? (
//                     <div className="flex gap-1">
//                       <button
//                         className="button-poppup bg-green-700 text-slate-100 text-sm p-2 rounded"
//                         onClick={() => handleAccept(request._id)}
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="button-poppup bg-red-700 text-slate-100 text-sm p-1 rounded"
//                         onClick={() => handleDecline(request._id)}
//                       >
//                         Decline
//                       </button>
//                     </div>
//                   ) : (
//                     <p>
//                       Status:{" "}
//                       <span
//                         className={
//                           request.status === "Accepted"
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }
//                       >
//                         {request.status}
//                       </span>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RequestDetailsPopup;

import React, { useEffect, useState } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { toast } from "react-hot-toast";
import wave from "./wave.svg";
import "./RequestDetailsPopup.css";

const RequestDetailsPopup = ({ requests, closePopup }) => {
  const [senderData, setSenderData] = useState({});
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSenderData = async () => {
      try {
        const senderIds = requests.map((request) => request.from);
        const senderDataMap = {};
        for (const senderId of senderIds) {
          const response = await axios.get(
            `http://localhost:4000/fetch-user/${senderId}`
          );
          senderDataMap[senderId] = response.data;
        }
        setSenderData(senderDataMap);
      } catch (error) {
        console.error("Error fetching sender data:", error);
      }
    };

    const fetchEventData = async () => {
      try {
        const eventIds = requests.map((request) => request.eventId);
        const eventDataMap = {};
        for (const eventId of eventIds) {
          const response = await axios.get(
            `http://localhost:4000/fetch-event/${eventId}`
          );
          eventDataMap[eventId] = response.data;
        }
        setEventData(eventDataMap);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchSenderData();
    fetchEventData();
  }, [requests]);

  const handleAccept = async (requestId) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:4000/accept-request`, { requestId });
      toast.success("Request accepted successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error accepting request:", error);
      setLoading(false);
      toast.error("Error accepting request");
    }
  };

  const handleDecline = async (requestId) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:4000/decline-request`, { requestId });
      setLoading(false);
      toast.success("Request declined successfully");
    } catch (error) {
      console.error("Error declining request:", error);
      setLoading(false);
      toast.error("Error declining request");
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <PropagateLoader
            loading={loading}
            speedMultiplier={1}
            size={20}
            aria-label="Loading Spinner"
          />
        </div>
      )}
      <div className="popup-overlay">
        <div className="popup-content w-1/3 div">
          <button className="close-button" onClick={closePopup}>
            &times;
          </button>
          <h2 className="">Requests</h2>
          <div className="popup-inner-content">
            {requests.map((request) => (
              <div
                key={request._id}
                className="flex justify-between items-center gap-5 mt-5"
              >
                <div>
                  <div className="flex items-center gap-1">
                    <i class="fi fi-rr-user user"></i>
                    <p>{senderData[request.from]?.username}</p>
                  </div>
                  <div className="flex gap-1">
                    <i class="fi fi-rr-at user2"></i>
                    <p>{senderData[request.from]?.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <i class="fi fi-rr-calendar-day user"></i>
                    <p>
                      {/* Event Name:  */}
                      {eventData[request.eventId]?.title}
                    </p>
                  </div>
                </div>
                <div>
                  {request.status === "Pending" ? (
                    <div className="flex gap-1">
                      <button
                        className="button-popup bg-green-700 text-slate-100 text-sm px-2 rounded"
                        onClick={() => handleAccept(request._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="button-popup bg-red-700 text-slate-100 text-sm p-1 rounded"
                        onClick={() => handleDecline(request._id)}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <p>
                      Status:{" "}
                      <span
                        className={
                          request.status === "Accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {request.status}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDetailsPopup;
