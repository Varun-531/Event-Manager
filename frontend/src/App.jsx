import { useState } from "react";
import { useLocation } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
