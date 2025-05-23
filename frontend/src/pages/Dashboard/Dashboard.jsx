import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropagateLoader from "react-spinners/PropagateLoader";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
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
        className="fi fi-sr-angle-double-small-right firstarrow"
        style={{ fontSize: "24px", color: "white" }}
      ></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
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
        justifyContent: "center",
        borderRadius: "50%",
        zIndex: "2",
        backgroundColor: "black",
        // marginLeft: "40px",
        hover: { backgroundColor: "white" },
        // marginLeft: isSmallScreen ? "20px" : "0px",
      }}
      onClick={onClick}
    >
      <i
        className="fi fi-sr-angle-double-small-left"
        style={{ fontSize: "24px", color: "white" }}
      ></i>
    </div>
  );
}

const Dashboard = () => {
  // var settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 2,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Large screens and above
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768, // Medium screens (tablets)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480, // Small screens (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
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
  const [EntertainmentList, setEntertainmentList] = useState([]);
  const [TechnologyList, setTechnologyList] = useState([]);
  const [SportsList, setSportsList] = useState([]);
  const [MusicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://event-manager-ghso.onrender.com/fetch-events")
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
      .get("https://event-manager-ghso.onrender.com/fetch-events-reverse")
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
    setLoading(true);
    axios
      .get(
        `https://event-manager-ghso.onrender.com/fetch-events-by-category/Sports`
      )
      .then((response) => {
        setLoading(false);
        setSportsList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://event-manager-ghso.onrender.com/fetch-events-by-category/Entertainment`
      )
      .then((response) => {
        setLoading(false);
        setEntertainmentList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://event-manager-ghso.onrender.com/fetch-events-by-category/Technology`
      )
      .then((response) => {
        setLoading(false);
        setTechnologyList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://event-manager-ghso.onrender.com/fetch-events-by-category/Music`
      )
      .then((response) => {
        setLoading(false);
        setMusicList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredEventList =
    selectedCategory === "All Events"
      ? eventList
      : eventList.filter((event) => event.category === selectedCategory);

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
        <div className="md:w-[100vw] w-[90vw] md:mx-[10vh]">
          <div className="md:w-[80vw] w-full mx-[5vw] mt-5">
            {topEventsNearDate.length > 0 ? (
              <Slider
                {...settings1}
                className="event-slider1 my-6 custom-slider"
              >
                {topEventsNearDate.map((event) => (
                  <div key={event.id} className="event-slide">
                    <article
                      className="event-article1 md:relative flex flex-col items-center"
                      onClick={handleEvent(event._id)}
                    >
                      <img
                        src={event.image}
                        alt={event.name}
                        className="event-image1 relative rounded"
                      />
                      <div className="location-container">
                        <h3>{event.title}</h3>
                      </div>
                      <div className="hidden md:block absolute bg-slate-200 rounded md:bottom-2 md:left-20 h-fit p-2 ">
                        <h3 className="md:text-2xl text-sm">{event.title}</h3>
                        <h3 className="text-sm md:text-base">
                          {formatDate(event.date)}
                        </h3>
                        <h3 className="text-sm md:text-base">
                          {event.category}
                        </h3>
                        <h3 className="text-sm md:text-base">
                          {event.location}
                        </h3>
                      </div>
                    </article>
                  </div>
                ))}
              </Slider>
            ) : (
              <h3 className="mt-10">No events available</h3>
            )}
          </div>
          <div className="flex md:mt-[25vh] md:ml-0 ml-10 md:justify-evenly gap-2 flex-wrap md:flex-nowrap justify-center">
            <h4
              className={`font-medium cursor-pointer rounded ${
                selectedCategory === "All Events"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("All Events")}
            >
              All Events
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Entertainment"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Entertainment")}
            >
              Entertainment
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Technology"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Technology")}
            >
              Technology
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Music"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Music")}
            >
              Music
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Education"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Education")}
            >
              Education
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Sports"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Sports")}
            >
              Sports
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Culture"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Culture")}
            >
              Culture
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "kids" ? "text-pink-700" : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("kids")}
            >
              kids
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "LifeStyle"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("LifeStyle")}
            >
              LifeStyle
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Arts" ? "text-pink-700" : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Arts")}
            >
              Arts
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "Food" ? "text-pink-700" : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("Food")}
            >
              Food
            </h4>
            <h4
              className={`font-medium cursor-pointer ${
                selectedCategory === "other"
                  ? "text-pink-700"
                  : "text-slate-700"
              }`}
              onClick={() => handleCategoryClick("other")}
            >
              other
            </h4>
          </div>
          {filteredEventList.length > 0 ? (
            <Slider
              {...settings}
              className="event-slider md:my-6 md:px-5 md:w-[90vw]"
            >
              {filteredEventList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image rounded object-cover"
                    />
                    <div className="location-container flex flex-col justify-center items-center">
                      <h3>{event.title}</h3>
                      <h4>{event.availability}</h4>
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
            <h3 className="mt-10">No events available</h3>
          )}

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
                      className="event-image rounded object-cover"
                    />
                    <div className="location-container flex flex-col justify-center items-center">
                      <h3>{event.title}</h3>
                      <h4>{event.availability}</h4>
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
            <h3 className="mt-10">No events available</h3>
          )}

          <h4 className="mt-10 ml-14 font-medium text-pink-700">
            Entertainment
          </h4>
          {EntertainmentList.length > 0 ? (
            <Slider {...settings} className="event-slider my-6 px-5 w-[90vw]">
              {EntertainmentList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image rounded object-cover"
                    />
                    <div className="location-container flex flex-col justify-center items-center">
                      <h3>{event.title}</h3>
                      <h4>{event.availability}</h4>
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
            <h3 className="mt-10">No events available</h3>
          )}

          <h4 className="mt-10 ml-14 font-medium text-pink-700">Technology</h4>
          {TechnologyList.length > 0 ? (
            <Slider {...settings} className="event-slider my-6 px-5 w-[90vw]">
              {TechnologyList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image rounded object-cover"
                    />
                    <div className="location-container flex flex-col justify-center items-center">
                      <h3>{event.title}</h3>
                      <h4>{event.availability}</h4>
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
            <h3 className="mt-10">No events available</h3>
          )}

          <h4 className="mt-10 ml-14 font-medium text-pink-700">Sports</h4>
          {SportsList.length > 0 ? (
            <Slider {...settings} className="event-slider my-6 px-5 w-[90vw]">
              {SportsList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image rounded object-cover"
                    />
                    <div className="location-container flex flex-col justify-center items-center">
                      <h3>{event.title}</h3>
                      <h4>{event.availability}</h4>
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
            <h3 className="mt-10">No events available</h3>
          )}
          <h4 className="mt-10 ml-14 font-medium text-pink-700">Music</h4>
          {MusicList.length > 0 ? (
            <Slider {...settings} className="event-slider my-6 px-5 w-[90vw]">
              {MusicList.map((event) => (
                <div key={event.id} className="event-slide">
                  <article
                    className="event-article flex flex-col items-center"
                    onClick={handleEvent(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="event-image rounded object-cover"
                    />
                    <div className="location-container flex flex-col justify-center items-center">
                      <h3>{event.title}</h3>
                      <h4>{event.availability}</h4>
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
            <h3 className="mt-10">No events available</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
