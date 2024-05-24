import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
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
    slidesToScroll: 1,
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
    autoplaySpeed: 3000,
  };

  const [eventList, setEventList] = useState([]);
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
      <div className="flex">
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
                      className="event-article1 flex flex-col items-center"
                      onClick={handleEvent(event._id)}
                    >
                      {/* <h3 className="absolute z-10 text-slate-300">
                    {event.title}
                  </h3> */}
                      <img
                        src={event.image}
                        alt={event.name}
                        className="event-image1 relative"
                      />
                    </article>
                  </div>
                ))}
              </Slider>
            ) : (
              <h3>No events available</h3>
            )}
            <div className="mt-[25vh] flex gap-8">
              <h3 className="text-pink-700">All Events</h3>
              <h3>Entertainment</h3>
              <h3>Technology</h3>
              <h3>Music</h3>
              <h3>Education</h3>
              <h3>Sports</h3>
              <h3>Culture</h3>
              <h3>Kids</h3>
              <h3>LifeStyle</h3>
              <h3>Arts</h3>
              <h3>Food</h3>
              <h3>other</h3>
            </div>
            {eventList.length > 0 ? (
              <Slider {...settings} className="event-slider my-6 px-5">
                {eventList.map((event) => (
                  <div key={event.id} className="event-slide">
                    <article
                      className="event-article flex flex-col items-center"
                      onClick={handleEvent(event._id)}
                    >
                      <img
                        src={event.image}
                        alt={event.name}
                        className="event-image"
                      />
                      <div className="location-container">
                        <p>{formatDate(event.date)}</p>
                        {event.location}
                      </div>
                      <h3>{event.title}</h3>
                    </article>
                  </div>
                ))}
              </Slider>
            ) : (
              <h3>No events available</h3>
            )}
          </div>
          {/* <Link to={`/userboard`}>UserBoard</Link> */}

          {eventList.length > 0 ? (
            <Slider
              {...settings}
              className="event-slider w-[80vw] mx-[5vw] mt-5 my-6 px-5"
            >
              {eventList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image"
                    />
                    <div className="location-container">
                      <p>{formatDate(event.date)}</p>
                      {event.location}
                    </div>
                    <h3>{event.title}</h3>
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
