import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Event.css";

const Event = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  
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

  // Function to determine whether the event is public or private
  const determinePrivacy = () => {
    if (event.public) {
      return "Public";
    } else if (event.private) {
      return "Private";
    } else {
      return "Unknown"; // Handle the case where neither public nor private is specified
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  return (
    <div className="m-10 mx-32">
      <div className="flex gap-3">
        <div className="image-container">
          <img src={event.image} className="image" alt="Event" />
        </div>
        <div className="details flex flex-col gap-2">
          <h2 className="font-semibold">{event.title}</h2>
          <div className="flex gap-2 items-center">
            <i className="fi fi-rr-bookmark"></i>
            <p>{event.category}</p>
          </div>
          <div className="flex gap-2 items-center">
            <i className="fi fi-rr-earth-americas"></i>
            <p>{determinePrivacy()}</p>
          </div>
          <div className="flex gap-2 items-center">
            <i className="fi fi-rr-calendar-day"></i>
            <p>{formatDate(event.date)}</p>
            <p>{event.time}</p>
          </div>
          <div className="flex gap-2 items-center">
          <i class="fi fi-rr-marker"></i>
            <p>{event.location}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Event;
