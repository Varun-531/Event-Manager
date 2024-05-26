import React, { useEffect, useCallback, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import background from "./blob-haikei.svg";

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

  return (
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
          <button className="home-button" onClick={handleDash}>
            About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
