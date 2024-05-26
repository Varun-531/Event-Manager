import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home/Home.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";
import CreateEvent from "./pages/CreateEvent/CreateEvent.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Event from "./pages/Event/Event.jsx";
import Userboard from "./pages/Userboard/Userboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create-event",
        element: <CreateEvent />,
      },
      {
        path: "/dashboard/:id",
        element: <Event />,
      },
      {
        path: "/userboard",
        element: <Userboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
