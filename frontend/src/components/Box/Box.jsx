import React from "react";

const Box = ({ event, handleClick }) => {
  return (
    <div
      className="bg-slate-300 m-5 w-[30vw] p-5 rounded cursor-pointer"
      onClick={handleClick(event._id)}
    >
      <h3>{event.title}</h3>
      <div className="flex items-center gap-1 my-2">
        <i className="fi fi-rr-time-quarter-to mt-1 mr-1"></i>
        {Math.ceil(
          (new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)
        )}{" "}
        days remaining
      </div>
    </div>
  );
};

export default Box;
