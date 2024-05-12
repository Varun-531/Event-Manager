import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "skyblue",
        height: "fit-content",
        width: "fit-content",
        padding: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "25%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "skyblue",
        height: "fit-content",
        width: "fit-content",
        padding: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "25%",
      }}
      onClick={onClick}
    />
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
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/fetch-events")
      .then((response) => {
        setEventList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

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
    <div className="w-[100vw] mx-[10vh]">
      <h1 className="w-1/2">Explore the events happening around you</h1>
      <div className="w-[80vw] mx-[5vw] mt-5">
      <h1>All Events</h1>
        {eventList.length > 0 ? (
          <Slider {...settings} className="event-slider my-6">
            {eventList.map((event) => (
              <div key={event.id} className="event-slide">
                <article className="event-article flex flex-col items-center" onClick={handleEvent(event._id)}>
                  <img
                    src={event.image}
                    alt={event.name}
                    className="event-image"
                  />
                  <div className="location-container">
                    <p>{formatDate(event.date)}</p>
                    {event.location}
                  </div>
                  <h1>{event.title}</h1>
                </article>
              </div>
            ))}
          </Slider>
        ) : (
          <h1>No events available</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
