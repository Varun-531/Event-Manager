import React, { useState } from "react";
import "./CreateEvent.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user"]);
  const userId = cookies.userId;
  console.log(userId);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState(0);
  const [pincode, setPincode] = useState(0);
  const [category, setCategory] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [publicEvent, setPublicEvent] = useState(false);
  const [privateEvent, setPrivateEvent] = useState(false);

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

    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("endTime", endTime);
    formData.append("availability", availability);
    formData.append("location", location);
    formData.append("size", size);
    formData.append("pincode", pincode);
    formData.append("creator", userId);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("termsAndConditions", termsAndConditions);

    try {
      const response = await axios.post(
        "https://event-manager-ghso.onrender.com/add-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`, // Correctly format the Authorization header
          },
        }
      );

      console.log("Event created:", response.data);
      toast.success("Event Created");
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error creating event", error.message);
      console.error("Error creating event:", error);
    }
  };

  const handlePublicCheckboxClick = () => {
    setPublicEvent(true);
    setPrivateEvent(false);
  };

  const handlePrivateCheckboxClick = () => {
    setPublicEvent(false);
    setPrivateEvent(true);
  };

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
      <div className="p-1 ">
        <div className="bg-rose-100   rounded">
          <div className="md:flex justify-center">
            <div className="md:w-1/2 md:p-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-4/4 md:ml-10 md:p-0 p-5 gap-y-2"
              >
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
                <div className="flex temp-1">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Availability
                    </label>
                    <select
                      value={availability}
                      id="availability"
                      className="block md:pr-2 md:w-full w-[35vw] rounded-md border-0 md:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setAvailability(e.target.value)}
                    >
                      <option className="md:text-sm text-xs" value="">
                        Availability
                      </option>
                      <option className="md:text-sm text-xs" value="Public">
                        Public
                      </option>
                      <option className="md:text-sm text-xs" value="Private">
                        Private
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Date
                    </label>

                    <input
                      type="date"
                      value={date}
                      id="date"
                      className="block md:pr-2 md:w-full w-[35vw] rounded-md border-0 md:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
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
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      className="block pr-2 md:w-full w-[35vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endtime"
                      className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
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
                      className="block pr-2 md:w-full w-[35vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
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
                      className="block pr-2 md:w-full w-[35vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Category</option>
                      <option value="Music">Music</option>
                      <option value="Sports">Sports</option>
                      <option value="Education">Education</option>
                      <option value="Technology">Technology</option>
                      <option value="kids">Kids</option>
                      <option value="LifeStyle">LifeStyle</option>
                      <option value="Arts">Arts</option>
                      <option value="Culture">Culture</option>
                      <option value="Food">Food</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="temp-1 flex">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      min={0}
                      className="block pr-2 md:w-full w-[35vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Pincode
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      min={0}
                      className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
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
              className="hidden md:block div-img rounded-r"
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
    </>
  );
};

export default CreateEvent;
