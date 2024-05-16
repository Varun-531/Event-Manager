import React, { useState, useEffect } from "react";
import "./Userboard.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Userboard = () => {
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;
  const [eventsData1, setEventsData1] = useState([]);
  const [color, setColor] = useState("");
  const [eventsData2, setEventsData2] = useState([]);
  const [eventsData3, setEventsData3] = useState([]);
  const [From, setFrom] = useState([]);
  const [participatingEvents, setParticipatingEvents] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setParticipatingEvents(res.data.events);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
    axios
      .get(`http://localhost:4000/fetch-from-request/${userId}`)
      .then((res) => {
        console.log(res.data);
        setFrom(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventPromises = participatingEvents.map((eventId) =>
          axios.get(`http://localhost:4000/fetch-event/${eventId}`)
        );
        const eventResponses = await Promise.all(eventPromises);
        const eventsData = eventResponses.map((res) => res.data);
        setEventsData1(eventsData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [participatingEvents]);

  useEffect(() => {
    const eventIds = From.map((event) => event.eventId);

    const fetchEventData = async () => {
      try {
        const eventPromises = eventIds.map((eventId) =>
          axios.get(`http://localhost:4000/fetch-event/${eventId}`)
        );
        const eventResponses = await Promise.all(eventPromises);
        const eventsData = eventResponses.map((res) => res.data);
        setEventsData2(eventsData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [From]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-event-createdby/${userId}`)
      .then((res) => {
        console.log(res.data);
        setEventsData3(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  const handleClick = (eventId) => () => {
    console.log(eventId);
    navigate(`/dashboard/${eventId}`);
  };

  return (
    <div className="m-10">
      <div>UserBoard</div>
      <div>
        <h2>Participating Events</h2>
        <div className="flex flex-wrap gap-1">
          {eventsData1.map((event) => (
            <div
              className="bg-slate-300 m-5 w-[25vw] p-5 rounded cursor-pointer"
              onClick={handleClick(event._id)}
            >
              <h3 key={event.id}>{event.title}</h3>
              <div className="flex items-center gap-1 my-2">
                <i className="fi fi-rr-time-quarter-to mt-1 mr-1"></i>
                <p>
                  {Math.ceil(
                    (new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)
                  )}{" "}
                  days remaining
                </p>
              </div>
              <div className="flex items-center gap-1 my-2">
                <i className="fi fi-rr-marker mt-1 mr-1"></i>
                <p className="">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Your Requests</h2>
        <div className="flex flex-wrap gap-1">
          {eventsData2.map((event) => (
            <div
              className="bg-slate-300 m-5 w-[25vw] p-5 rounded cursor-pointer"
              onClick={handleClick(event._id)}
            >
              <h3 key={event.id}>{event.title}</h3>
              <div className="flex items-center gap-1 my-2">
                <i className="fi fi-rr-time-quarter-to mt-1 mr-1"></i>
                <p>
                  {Math.ceil(
                    (new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)
                  )}{" "}
                  days remaining
                </p>
              </div>
              <div className="flex items-center gap-1 my-2">
                <i className="fi fi-rr-marker mt-1 mr-1"></i>
                <p className="">{event.location}</p>
              </div>
              {From.map((from) => {
                if (from.eventId === event._id) {
                  return (
                    <div>
                      <p>
                        Status :{" "}
                        {from.status === "Accepted" ? (
                          <span className="text-green-500">{from.status}</span>
                        ) : from.status === "Rejected" ? (
                          <span className="text-red-500">{from.status}</span>
                        ) : from.status === "Pending" ? (
                          <span className="text-yellow-500">{from.status}</span>
                        ) : null}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Created Events</h2>
        <div className="flex flex-wrap gap-1">
          {eventsData3.map((eventItem) => (
            <div
              className="bg-slate-300 m-5 w-[25vw] p-5 rounded cursor-pointer"
              onClick={handleClick(eventItem._id)}
              key={eventItem.id}
            >
              <h3>{eventItem.title}</h3>
              <div className="flex items-center gap-1 my-2">
                <i className="fi fi-rr-time-quarter-to mt-1 mr-1"></i>
                <p>
                  {Math.ceil(
                    (new Date(eventItem.date) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days remaining
                </p>
              </div>
              <div className="flex items-center gap-1 my-2">
                <i className="fi fi-rr-marker mt-1 mr-1"></i>
                <p className="">{eventItem.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userboard;
