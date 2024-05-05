import React, { useState } from "react";
import "./CreateEvent.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user"]);
  const userId = cookies.userId;
  console.log(userId);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState(0);
  const [category, setCategory] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const handleFileChange = (e) => {
    toast.success("Image Set");
    setImage(e.target.files[0]);
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    if (!userId) {
      toast.error("Please Login First");
      return;
    }
    // toast.success("Event Creating");
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("size", size);
    formData.append("creator", userId);
    formData.append("category", category);
    formData.append("termsAndConditions", termsAndConditions);

    try {
      const response = await axios.post(
        "http://localhost:4000/add-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Event created:", response.data);
      toast.success("Event Created");
      navigate("/");
      // Optionally, redirect the user to another page after successful form submission
    } catch (error) {
      toast.error("Error creating event", error.message);
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="p-10 bg-rose-800">
      <div className="bg-rose-100   rounded">
        <div className="flex justify-center">
          <div className="w-1/2 p-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-3/4 ml-10 gap-y-2"
            >
              {" "}
              <h1 className="text-xl font-medium">Add Event</h1>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <input
                type="text"
                value={title}
                id="title"
                className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Image
              </label>
              <input
                type="file"
                id="image"
                className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <textarea
                value={description}
                id="description"
                className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="05"
              ></textarea>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="flex temp-1">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    id="date"
                    className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    id="time"
                    className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex temp-1">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Size
                  </label>
                  <input
                    type="number"
                    id="size"
                    min={1}
                    // max={12}
                    className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <select
                    value={category}
                    id="category"
                    className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Category</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Education">Education</option>
                    <option value="Games">Games</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Terms and Conditions
              </label>
              <textarea
                id="termsAndConditions"
                value={termsAndConditions}
                className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                onChange={(e) => setTermsAndConditions(e.target.value)}
                cols="30"
                rows="5"
              ></textarea>
              <input type="hidden" value={userId} />
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rose-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 mt-2"
              >
                Submit
              </button>
            </form>
          </div>
          <div
            className="div-img rounded-r"
            onClick={() => {
              handleLogin();
            }}
          >
            {!userId && (
              <button className="bg-black text-slate-200 p-1 float-right rounded m-4 px-2">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
