import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <nav>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </nav>
      <div className="container-1 flex justify-center items-center">
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
