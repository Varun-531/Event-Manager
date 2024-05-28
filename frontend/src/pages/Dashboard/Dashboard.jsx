import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
// import background from "./blob-scatter-haikei (2).svg";
import PropagateLoader from "react-spinners/PropagateLoader";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      // className={className}
      className={`${className} custom-prev-arrow`}
      style={{
        ...style,
        paddingTop: "10px",
        height: "35px",
        width: "35px",
        border: "2px solid black",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        paddingRight: "8px",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: "black",
        zIndex: "2",
      }}
      onClick={onClick}
    >
      <i
        class="fi fi-sr-angle-double-small-right firstarrow"
        style={{ fontSize: "24px", color: "white" }}
      ></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        paddingTop: "10px",
        height: "35px",
        width: "35px",
        border: "2px solid black",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        zIndex: "2",
        backgroundColor: "black",
        hover: { backgroundColor: "white" },
      }}
      onClick={onClick}
    >
      <i
        class="fi fi-sr-angle-double-small-left"
        style={{ fontSize: "24px", color: "white" }}
      ></i>
    </div>
  );
}

const Dashboard = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [eventList, setEventList] = useState([]);
  const [reverseList, setReverseList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/fetch-events")
      .then((response) => {
        setLoading(false);
        setEventList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching events:", error);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/fetch-events-reverse")
      .then((response) => {
        setLoading(false);
        setReverseList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    window.scrollTo(0, 0);
    // setLoading(true);
    // }, 2000);
    // setLoading(false);
  }, []);

  const getTopEventsNearDate = () => {
    const currentDate = new Date();
    const filteredEvents = eventList.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= currentDate;
    });
    filteredEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    return filteredEvents.slice(0, 4);
  };

  const topEventsNearDate = getTopEventsNearDate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const navigate = useNavigate();
  const handleEvent = (eventId) => () => {
    console.log(eventId);
    navigate(`/dashboard/${eventId}`);
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
      <div className="flex dashboard">
        <div className="w-[100vw] mx-[10vh]">
          {/* <h3 className="w-1/2 my-5">Explore the events happening around you</h3> */}
          <div className="w-[80vw] mx-[5vw] mt-5">
            {/* <h3>Closing time</h3> */}
            {topEventsNearDate.length > 0 ? (
              <Slider
                {...settings1}
                className="event-slider1 my-6 custom-slider"
              >
                {topEventsNearDate.map((event) => (
                  <div key={event.id} className="event-slide">
                    <article
                      className="event-article1 relative flex flex-col items-center"
                      onClick={handleEvent(event._id)}
                    >
                      {/* <h3 className="absolute z-10 text-slate-300">
                        {event.title}
                      </h3> */}
                      <img
                        src={event.image}
                        alt={event.name}
                        className="event-image1 relative rounded"
                      />
                      <div className="location-container">
                        <h3>{event.title}</h3>
                      </div>
                      <div className="absolute bg-slate-200 p-1 rounded bottom-2 left-20 h-fit p-2 ">
                        <h3 className="text-2xl underline underline-offset-4 decoration-dashed mb-1">
                          {event.title}
                        </h3>
                        <h3 className="text-base">{formatDate(event.date)}</h3>
                        <h3 className="text-base">{event.category}</h3>
                        <h3 className="text-base">{event.location}</h3>
                      </div>
                    </article>
                  </div>
                ))}
              </Slider>
            ) : (
              <h3>No events available</h3>
            )}
          </div>
          <div className="mt-[25vh] flex justify-evenly">
            <h4 className="font-medium text-pink-700">All Events</h4>
            <h4 className="font-medium text-slate-700">Entertainment</h4>
            <h4 className="font-medium text-slate-700">Technology</h4>
            <h4 className="font-medium text-slate-700">Music</h4>
            <h4 className="font-medium text-slate-700">Education</h4>
            <h4 className="font-medium text-slate-700">Sports</h4>
            <h4 className="font-medium text-slate-700">Culture</h4>
            <h4 className="font-medium text-slate-700">Kids</h4>
            <h4 className="font-medium text-slate-700">LifeStyle</h4>
            <h4 className="font-medium text-slate-700">Arts</h4>
            <h4 className="font-medium text-slate-700">Food</h4>
            <h4 className="font-medium text-slate-700">other</h4>
          </div>
          {eventList.length > 0 ? (
            <Slider {...settings} className="event-slider my-6 px-5 w-[90vw]">
              {eventList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image rounded"
                    />
                    <div className="location-container">
                      <h3>{event.title}</h3>
                    </div>
                    <h3 className="absolute bg-slate-200 p-1 rounded right-4 top-4 text-sm">
                      {formatDate(event.date)}
                    </h3>
                    <h3 className="absolute bg-slate-200 p-1 rounded bottom-4 left-4 text-sm">
                      {event.category}
                    </h3>
                  </article>
                </div>
              ))}
            </Slider>
          ) : (
            <h3>No events available</h3>
          )}

          {/* <Link to={`/userboard`}>UserBoard</Link> */}

          <h4 className="mt-10 ml-14 font-medium text-pink-700">
            Recently created Events
          </h4>

          {reverseList.length > 0 ? (
            <Slider {...settings} className="event-slider my-6 px-5 w-[90vw]">
              {reverseList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image rounded"
                    />
                    <div className="location-container">
                      <h3>{event.title}</h3>
                    </div>
                    <h3 className="absolute bg-slate-200 p-1 rounded right-4 top-4 text-sm">
                      {formatDate(event.date)}
                    </h3>
                    <h3 className="absolute bg-slate-200 p-1 rounded bottom-4 left-4 text-sm">
                      {event.category}
                    </h3>
                  </article>
                </div>
              ))}
            </Slider>
          ) : (
            <h3>No events available</h3>
          )}
        </div>
        {/* <Link to={`/userboard`}>UserBoard</Link> */}
      </div>
    </>
  );
};

export default Dashboard;
