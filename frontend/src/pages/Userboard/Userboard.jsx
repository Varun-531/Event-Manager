import React, { useState, useEffect } from "react";
import "./Userboard.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userboard = () => {
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;
  const [eventsData1, setEventsData1] = useState([]);
  const [eventsData2, setEventsData2] = useState([]);
  const [eventsData3, setEventsData3] = useState([]);
  const [eventsData4, setEventsData4] = useState([]);
  const [Request, setRequest] = useState([]);
  const [From, setFrom] = useState([]);
  const [participatingEvents, setParticipatingEvents] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-user/${userId}`)
      .then((res) => {
        setUser(res.data);
        setParticipatingEvents(res.data.events);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });

    axios
      .get(`http://localhost:4000/fetch-from-request/${userId}`)
      .then((res) => {
        setFrom(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

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
    const eventIds = Request.map((event) => event.eventId);

    const fetchEventData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const eventPromises = eventIds.map((eventId) =>
          axios.get(`http://localhost:4000/fetch-event/${eventId}`)
        );
        const eventResponses = await Promise.all(eventPromises);
        const eventsData = eventResponses.map((res) => res.data);
        setEventsData4(eventsData);
        // console.log(eventsData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [Request]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-event-createdby/${userId}`)
      .then((res) => {
        setEventsData3(res.data);
        console.log()
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  const handleClick = (eventId) => () => {
    navigate(`/dashboard/${eventId}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/fetch-requests/${userId}`).then((res) => {
      setRequest(res.data);
    });
  }, [userId]);

  return (
    <div className="m-10">
      <div>UserBoard</div>
      <div>
        <h2>Participating Events</h2>
        <div className="flex flex-wrap gap-1">
          {eventsData1.length > 0 ? (
            eventsData1.map((event) => (
              <div
                className="bg-slate-300 m-5 w-[25vw] p-5 rounded cursor-pointer"
                onClick={handleClick(event._id)}
                key={event._id}
              >
                <h3>{event.title}</h3>
                <div className="flex items-center gap-1 my-2">
                  <i className="fi fi-rr-time-quarter-to mt-1 mr-1"></i>
                  <p>
                    {Math.ceil(
                      (new Date(event.date) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days remaining
                  </p>
                </div>
                <div className="flex items-center gap-1 my-2">
                  <i className="fi fi-rr-marker mt-1 mr-1"></i>
                  <p className="">{event.location}</p>
                </div>
              </div>
            ))
          ) : (
            <h3>No Events</h3>
          )}
        </div>
      </div>
      <div>
        <h2>Your Requests</h2>
        <div className="flex flex-wrap gap-1">
          {eventsData2.length > 0 ? (
            eventsData2.map((event) => (
              <div
                className="bg-slate-300 m-5 w-[25vw] p-5 rounded cursor-pointer"
                onClick={handleClick(event._id)}
                key={event._id}
              >
                <h3>{event.title}</h3>
                <div className="flex items-center gap-1 my-2">
                  <i className="fi fi-rr-time-quarter-to mt-1 mr-1"></i>
                  <p>
                    {Math.ceil(
                      (new Date(event.date) - new Date()) /
                        (1000 * 60 * 60 * 24)
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
                      <div key={from._id}>
                        <p>
                          Status:{" "}
                          {from.status === "Accepted" ? (
                            <span className="text-green-500">
                              {from.status}
                            </span>
                          ) : from.status === "Rejected" ? (
                            <span className="text-red-500">{from.status}</span>
                          ) : from.status === "Pending" ? (
                            <span className="text-yellow-500">
                              {from.status}
                            </span>
                          ) : null}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))
          ) : (
            <h3 className="m-7">No Events</h3>
          )}
        </div>
      </div>
      <div>
        <h2>Created Events</h2>
        <div className="flex flex-wrap gap-1">
          {eventsData3.length > 0 ? (
            eventsData3.map((eventItem) => (
              <div
                  className="bg-slate-300 m-5 w-[25vw] p-5 rounded cursor-pointer flex gap-2 justify-between"
                  onClick={handleClick(eventItem._id)}
                  key={eventItem._id}
                >
                  <div>
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
                  <div><p>{eventItem.requestId ? eventItem.requestId.length : 0}</p></div>
                </div>
            ))
          ) : (
            <h3>No Events</h3>
          )}
        </div>
      </div>
      <div>
        <h2>Requests</h2>
        {eventsData4.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {eventsData4.map((event) => (
              <div
                className="bg-slate-300 m-5 w-[25vw] p-5 rounded cursor-pointer"
                onClick={handleClick(event._id)}
                key={event._id}
              >
                <h3>{event.title}</h3>
                <div className="flex items-center gap-1 my-2">
                  <i className="fi fi-rr-time-quarter-to mt-1 mr-1"></i>
                  <p>
                    {Math.ceil(
                      (new Date(event.date) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days remaining
                  </p>
                </div>
                {Request.map((req) => {
                  if (req.eventId === event.requestId) {
                    return <p>{req.from}</p>;
                  } else {
                    return null;
                  }
                })}
              </div>
            ))}
          </div>
        ) : (
          <h3>No Events</h3>
        )}
      </div>
    </div>
  );
};

export default Userboard;
