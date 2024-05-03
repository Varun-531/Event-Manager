import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="container-1 p-4">
        <nav className="list-none flex gap-3 float-right">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </nav>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
