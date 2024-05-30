import React, { useEffect, useCallback, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import background from "./blob-haikei.svg";
import events from "./undraw_events_re_98ue.svg";
import userFriendly from "./undraw_true_friends_c-94-g.svg";
import secure from "./undraw_secure_login_pdn4.svg";
import Feature from "./undraw_product_iteration_kjok.svg";
import mail from "./undraw_newsletter_re_wrob.svg";
import Authentication from "./undraw_certification_re_ifll.svg";
import Dynamic from "./undraw_building_websites_i78t.svg";
import ReactSvg from "./undraw_react_re_g3ui.svg";
import backEnd from "./undraw_server_cluster_jwwq.svg";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [login, setLogin] = useState(false);

  const handleDash = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    removeCookie("userId", { path: "/" });
    removeCookie("token", { path: "/" });
    setLogin(false);
    navigate("/");
    toast.success("Logged out successfully");
  }, [removeCookie, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (cookies.userId) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [cookies.userId]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="container-1 p-[2%] px-[10vw]">
        {/* {login && (
      <button className="float-right bg-slate-900 p-1 rounded text-base px-2 login-button">
        {" "}
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </button>
    )} */}

        <div className="flex flex-col"></div>
        <div className="flex flex-col justify-center items-center mt-[25vh]">
          <h1 className="text-4xl font-bold mt-10">Welcome to Event Manager</h1>
          <p className="text-lg mt-4">
            A place to explore and create events around you
          </p>
          <div className="flex gap-10 mt-5">
            {!login ? (
              <button className="home-button" onClick={handleLogin}>
                Get Started
              </button>
            ) : (
              <button className="home-button" onClick={handleDash}>
                Dashboard
              </button>
            )}
            <button className="home-button" onClick={handleScrollToAbout}>
              About Us
            </button>
          </div>
        </div>
      </div>
      <section className="bg-slate-300 px-10 pb-10" id="about">
        {/* <h1 className="p-5 text-slate-800 text-3xl text-center pt-10">About</h1> */}
        <div className="flex justify-center items-center px-[15vw] pt-20 pb-10">
          <img src={events} className="h-[50vh]" />
          <div className="flex flex-col h-[50vh] gap-3">
            <h3 className="text-6xl pt-10 text-slate-800">
              Manage Your Events with Ease
            </h3>
            <p className="text-xl font-normal p-tag text-justify">
              Welcome to our cutting-edge React Event Manager, your ultimate
              solution for seamless event management. Whether you're organizing
              a small meeting or a large conference, our platform provides all
              the tools you need to create, manage, and track your events
              effortlessly.
            </p>
          </div>
        </div>
        <div className="px-[10vw]">
          <h3 className="text-6xl pt-20 text-slate-800">Why Choose Us?</h3>
          <div className="flex pt-10 gap-10">
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={userFriendly} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold">User-Friendly Interface:</span> Our
                platform features an intuitive interface, making it easy for
                users of all skill levels to navigate and manage their events.
              </p>
            </div>
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={secure} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold">Secure and Reliable:</span> We
                prioritize the security of your data with robust authentication
                and encryption mechanisms.
              </p>
            </div>
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={Feature} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold">Feature-Rich: </span>From scheduling
                and attendee management to notifications and analytics, our
                platform is equipped with a comprehensive set of features to
                meet all your event management needs.
              </p>
            </div>
          </div>
        </div>
        <div className="px-[10vw]">
          <h3 className="text-6xl pt-20 text-slate-800">Key Features</h3>
          <div className="flex pt-10 gap-10">
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={mail} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold">Real-Time Notifications:</span> Keep
                your attendees informed with instant notifications and updates,
                leveraging react-hot-toast and nodemailer.
              </p>
            </div>
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={Authentication} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold">
                  Seamless User Authentication:{" "}
                </span>{" "}
                Secure your events with reliable authentication using bcrypt and
                jsonwebtoken.
              </p>
            </div>
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={Dynamic} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold">Dynamic Content: </span>Enhance your
                events with dynamic visual effects using vanta and
                react-confetti.
              </p>
            </div>
          </div>
        </div>
        <div className="px-[10vw]">
          <h3 className="text-6xl pt-20 text-slate-800">
            Built with Modern Technologies
          </h3>
          <h4 className="text-xl pt-5 text-slate-800">
            Our Event Manager is built with a robust stack of modern
            technologies to ensure a smooth and efficient experience
          </h4>
          <div className="flex pt-10 gap-10 justify-evenly">
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={ReactSvg} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold"> Frontend:</span> Developed with
                React, our frontend offers a responsive and interactive user
                experience. We use vite for a fast development environment,
                along with tailwindcss for sleek and modern styling.
              </p>
            </div>
            <div className="w-[30vw] flex flex-col justify-center items-center">
              <img src={backEnd} className="h-[20vh] m-10" />
              <p className="text-lg text-justify">
                <span className="font-bold">Backend: </span> Powered by Express
                and Mongoose, our backend is designed to handle complex event
                data efficiently. We also use dotenv for environment variable
                management and cloudinary for image storage.
              </p>
            </div>
          </div>
        </div>
        <div className="px-[10vw]">
          <h3 className="text-6xl pt-20 text-slate-800">Get Started Today!</h3>
          <p className="text-xl pt-10 pb-2">
            Join our platform today and take the first step towards hassle-free
            event management. Whether you're planning a corporate event, a
            community gathering, or a private party, our Event Manager is here
            to simplify your tasks and help you achieve success.
          </p>
          <button
            className="bg-slate-800 text-slate-200 text-lg py-1 px-2 rounded"
            onClick={handleScrollToTop}
          >
            Back To Top
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
