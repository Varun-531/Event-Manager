import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Event.css";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import popcorn from "./popcorn-svgrepo-com.svg";
import satelite from "./satellite-svgrepo-com.svg";
import football from "./cricket-game-svgrepo-com.svg";
import music from "./music-svgrepo-com.svg";
import dice from "./game-die-svgrepo-com.svg";
import bookSvg from "./books-svgrepo-com.svg";
import other from "./celebrate-svgrepo-com.svg";

const Event = () => {
  const [event, setEvent] = useState({ attendees: [] });
  const [creator, setCreator] = useState({});
  const [bookOption, setBookOption] = useState("");
  const [occupancy, setOccupancy] = useState(0);
  const [Booked, setBooked] = useState(false);
  const [bookText, setBookText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { id } = useParams();
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-event/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.error("Error fetching event data:", err);
      });
  }, [id]);

  useEffect(() => {
    if (event.creator) {
      axios
        .get(`http://localhost:4000/fetch-user/${event.creator}`)
        .then((res) => {
          setCreator(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [event.creator]);
  useEffect(() => {
    setBookOption(event.availability === "Public" ? "Book" : "Request");
    const occupancyValue = event.size - (event.attendees?.length || 0);
    setOccupancy(occupancyValue);
  }, [event.availability, event.attendees, event.size]);

  useEffect(() => {
    if (event.attendees?.includes(userId)) {
      setBooked(true);
      setBookText("Booked");
    } else if (event.creator === userId) {
      setBooked(true);
      setBookText("Creator");
    } else if (event.requests?.includes(userId)) {
      setBooked(true);
      setBookText("Requested");
    }
  }, [event.attendees, userId]);

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
        return bookSvg;
      case "Technology":
        return satelite;
      default:
        return other;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleClick = () => {
    if (event.availability === "Public") {
      axios
        .post(`http://localhost:4000/book-event`, {
          eventId: id,
          userId: userId,
        })
        .then((res) => {
          console.log("Booking successful:", res.data);
          toast.success("Booking successful");
          setOccupancy(occupancy - 1);
          setBooked(true);
          setBookText("Booked");
        })
        .catch((err) => {
          console.error("Error booking event:", err);
          toast.error("Error booking event");
        });
    } else {
      axios
        .post(`http://localhost:4000/add-request`, {
          eventId: id,
          to: event.creator,
          from: userId,
          // date:event.date,
        })
        .then((res) => {
          console.log("Request sent:", res.data);
          toast.success("Request sent");
          setBooked(true);
          setBookText("Requested");
        })
        .catch((err) => {
          console.error("Error sending request:", err);
          toast.error("Error sending request");
        });
    }
  };

  const handleBookClick = () => {
    setShowConfirmation(true);
  };

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
                <img
                  src={selectSVG(event.category)}
                  className="svg"
                  alt="Category SVG"
                />
              </div>
            </div>
            <div className="mt-3 details flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center ml-3">
                  <i className="fi fi-rr-user"></i>
                  <p>{creator.username}</p>
                </div>
                <div className="flex gap-2 items-center ml-3">
                  <i className="fi fi-rr-chair"></i>
                  <p>{occupancy} left</p>
                </div>
                <div className="flex gap-2 items-center ml-3">
                  <i className="fi fi-rr-ticket"></i>
                  <p>{event.price === 0 ? "Free" : event.price}</p>
                </div>
              </div>
              {Booked ? (
                <div
                  className="m-3 booked text-pink-600 font-semibold p-3 cursor-not-allowed rounded shadow-slate-700 "
                  // onClick={handleBookClick}
                >
                  {bookText}
                </div>
              ) : (
                <div
                  className="m-3 bg-pink-600 text-slate-100 font-semibold p-3 cursor-pointer rounded shadow-slate-700 hover:bg-pink-700"
                  onClick={handleBookClick}
                >
                  {bookOption} a Ticket
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="font-semibold underline underline-offset-4">About</h3>
          <p>{event.description}</p>
          <p className="mt-3">
            {event.time} - {event.endTime}
          </p>
          <p>{event.location}</p>
          <p className="mb-3">{event.pincode}</p>
        </div>
        <div>
          <h3 className="font-semibold underline underline-offset-4">
            Terms and Conditions
          </h3>
          <ul>
            {event.termsAndConditions &&
              event.termsAndConditions
                .split("\n")
                .filter(Boolean)
                .map((item, index) => (
                  <li key={index} className="list-disc points">
                    {item}
                  </li>
                ))}
          </ul>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Booking</h2>
            <p>Are you sure you want to book a ticket for this event?</p>
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={() => {
                  setShowConfirmation(false);
                  handleClick();
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-400 text-black px-4 py-2 rounded-md"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
