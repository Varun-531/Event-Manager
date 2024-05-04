import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
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
  },[]);
  return <div>Dashboard</div>;
};

export default Dashboard;
