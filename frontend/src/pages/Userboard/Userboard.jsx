import React, { useState, useEffect } from "react";
import "./Userboard.css";
import Calendar from "react-calendar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequestDetailsPopup from "../../components/RequestDetailsPopup/RequestDetailsPopup.jsx";
import PropagateLoader from "react-spinners/PropagateLoader";
import toast from "react-hot-toast";
// import "react-calendar/dist/Calendar.css";

const Userboard = () => {
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;
  const [eventsData1, setEventsData1] = useState([]);
  const [eventsData2, setEventsData2] = useState([]);
  const [eventsData3, setEventsData3] = useState([]);
  const [eventsData4, setEventsData4] = useState([]);
  const [Request, setRequest] = useState([]);
  const [createdEventDates, setCreatedEventDates] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [count, setCount] = useState(0);
  const [showRequestsPopup, setShowRequestsPopup] = useState(false);
  const [From, setFrom] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [participatingEvents, setParticipatingEvents] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios
      .get(`http://localhost:4000/fetch-user/${userId}`)
      .then((res) => {
        setUser(res.data);
        setParticipatingEvents(res.data.events);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });

    // Fetch requests sent from the user
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
    // Fetch participating events data
    const fetchData = async () => {
      setLoading(true);
      try {
        const eventPromises = participatingEvents.map((eventId) =>
          axios.get(`http://localhost:4000/fetch-event/${eventId}`)
        );
        const eventResponses = await Promise.all(eventPromises);
        const eventsData = eventResponses.map((res) => res.data);
        setEventsData1(eventsData);
        setEventDates(eventsData.map((event) => new Date(event.date)));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [participatingEvents]);

  useEffect(() => {
    // Fetch events data from requests received by the user
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
    // Fetch events data for requests sent by the user
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
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [Request]);

  useEffect(() => {
    // Fetch events created by the user
    axios
      .get(`http://localhost:4000/fetch-event-createdby/${userId}`)
      .then((res) => {
        setEventsData3(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-requests/${userId}`)
      .then((res) => {
        setRequest(res.data);
        setCount(res.data.length);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
      });
  }, [userId]);

  const handleClick = (eventId) => () => {
    navigate(`/dashboard/${eventId}`);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-event-createdby/${userId}`)
      .then((res) => {
        setEventsData3(res.data);
        setCreatedEventDates(res.data.map((event) => new Date(event.date)));
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  const isParticipatingEventDate = (date) => {
    return eventDates.some(
      (eventDate) =>
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
    );
  };

  const isCreatedEventDate = (date) => {
    return createdEventDates.some(
      (eventDate) =>
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
    );
  };

  const handleRequests = () => {
    if (count === 0) {
      toast.error("No requests to show");
      return;
    } else {
      setShowRequestsPopup(true);
    }
  };

  const closePopup = () => {
    setShowRequestsPopup(false);
  };

  const handleCalender = () => {
    setShowCalender(!showCalender);
  };

  const isEventDate = (date) => {
    return eventDates.some(
      (eventDate) =>
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
    );
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
      <div className="m-10">
        {/* <Calendar
          className="react-calendar"
          tileClassName={({ date, view }) =>
            view === "month" && isEventDate(date) ? "event-date" : null
          }
        /> */}
        <button
          className="bg-slate-900 text-slate-200 py-2 px-5 rounded hover:bg-slate-800 float-right"
          onClick={handleCalender}
        >
          Calendar
        </button>
        {showCalender && (
          <>
            <div className="flex gap-10">
              <Calendar
                className="react-calendar"
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    if (isParticipatingEventDate(date)) {
                      return "participating-event-date";
                    }
                    if (isCreatedEventDate(date)) {
                      return "created-event-date";
                    }
                  }
                  return null;
                }}
                onClickDay={(value) => {
                  // Find participating events that match the clicked date
                  const participatingEvents = eventsData1.filter((event) => {
                    const eventDate = new Date(event.date);
                    return (
                      eventDate.getFullYear() === value.getFullYear() &&
                      eventDate.getMonth() === value.getMonth() &&
                      eventDate.getDate() === value.getDate()
                    );
                  });

                  // Find created events that match the clicked date
                  const createdEvents = eventsData3.filter((event) => {
                    const eventDate = new Date(event.date);
                    return (
                      eventDate.getFullYear() === value.getFullYear() &&
                      eventDate.getMonth() === value.getMonth() &&
                      eventDate.getDate() === value.getDate()
                    );
                  });

                  // Combine the event IDs from both participating and created events
                  const eventIds = [
                    ...participatingEvents,
                    ...createdEvents,
                  ].map((event) => event._id);

                  // Set the state with the event IDs
                  setSelectedDateEvents(eventIds);
                }}
              />

              <h3>Hello</h3>
              <div className="event-ids">
                {selectedDateEvents.length > 0 ? (
                  <ul>
                    {selectedDateEvents.map((eventId) => (
                      <li key={eventId}>{eventId}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No events for this date.</p>
                )}
              </div>
            </div>
          </>
        )}

        <div>
          <h2>Participating Events</h2>
          <div className="flex flex-wrap gap-1">
            {eventsData1.length > 0 ? (
              eventsData1.map((event) => (
                <div
                  className="m-5 w-[25vw] p-5 rounded cursor-pointer box"
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
                  className="box m-5 w-[25vw] p-5 rounded cursor-pointer"
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
                            ) : from.status === "Declined" ? (
                              <span className="text-red-500">
                                {from.status}
                              </span>
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
          <div className="flex justify-between">
            <h2>Created Events</h2>
            <button
              className="bg-slate-900 text-slate-200 py-2 px-5 rounded hover:bg-slate-800"
              onClick={handleRequests}
            >
              Requests <span className="ml-2">{count}</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {eventsData3.length > 0 ? (
              eventsData3.map((eventItem) => (
                <div
                  className="box m-5 w-[25vw] p-5 rounded cursor-pointer flex gap-2 justify-between"
                  key={eventItem._id}
                  onClick={handleClick(eventItem._id)}
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
                </div>
              ))
            ) : (
              <h3>No Events</h3>
            )}
          </div>
        </div>
        {showRequestsPopup && (
          <RequestDetailsPopup requests={Request} closePopup={closePopup} />
        )}
      </div>
    </>
  );
};

export default Userboard;
