const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Event = require("./models/Event");
const Request = require("./models/Request");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const dotenv = require("dotenv");
const upload = multer({ dest: "uploads/" });

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dp1gjfgmg",
  api_key: "973866118168666",
  api_secret: "hJTdoFtZiFavz4kS10rjKihjrOY",
});
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/EventManager", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_PASSWORD,
  },
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
    return res.json({ success: true, token, userId: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();
    return res.json(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/add-event", upload.single("image"), async (req, res) => {
  console.log("testing");
  const {
    title,
    description,
    location,
    date,
    time,
    pincode,
    endTime,
    price,
    size,
    availability,
    creator,
    termsAndConditions,
    category,
  } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    let imageUrl = null;
    if (image) {
      console.log("Uploading Image");
      const result = await cloudinary.uploader.upload(image);
      console.log("Image Uploaded");
      imageUrl = result.url;
    }

    const newEvent = new Event({
      title,
      description,
      location,
      date,
      time,
      endTime,
      pincode,
      size,
      availability,
      creator,
      price,
      termsAndConditions,
      image: imageUrl,
      category,
    });
    await newEvent.save();
    console.log("Event created:", newEvent);
    return res.json(newEvent);
  } catch (error) {
    console.error("Error during event creation:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/fetch-events", async (req, res) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/fetch-event/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/fetch-event-createdby/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const events = await Event.find({ creator: id });
    return res.json(events);
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/book-event", async (req, res) => {
  const { eventId, userId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (event.size - event.attendees.length === 0) {
      return res.status(400).json({ message: "Event is full" });
    }
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }
    if (!user.events) {
      user.events = []; 
    }
    if (!user.events.includes(eventId)) {
      user.events.push(eventId);
    }
    await user.save();

    event.attendees.push(userId);
    await event.save();
    try {
      const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: user.email,
        subject: "Event Booking Confirmation",
        text: `Hi ${user.username}, you have successfully booked the event ${event.title}`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error("Error booking event:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/fetch-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/send-mail", async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    const mailOptions = {
      from: process.env.REACT_APP_EMAIL,
      to: email,
      subject,
      text: message,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/add-request", async (req, res) => {
  const { eventId, to, from } = req.body;
  try {
    const newRequest = new Request({
      eventId,
      to,
      from,
    });
    await newRequest.save();
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.requests.includes(from)) {
      return res.status(400).json({ message: "Request already sent" });
    }
    event.requests.push(from);
    if(event.requestsId.includes(newRequest._id)){
      return res.status(400).json({ message: "Request already sent" });
    }
    event.requestsId.push(newRequest._id);
    await event.save(); 
    return res.json(newRequest);
  } catch (error) {
    console.error("Error adding request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/fetch-requests/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const requests = await Request.find({ to: id });
    return res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/fetch-from-request/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const requests = await Request.find({ from: id });
    return res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/decline-request", async (req, res) => {
  const { requestId } = req.body;
  try{
    const request = await Request.findById(requestId);
    if(!request){
      return res.status(404).json({message:"Request not found"});
    }
    const event = await Event.findById(request.eventId);
    if(!event){
      return res.status(404).json({message:"Event not found"});
    }
    request.status = "Declined";
    await request.save();
  }
  catch(error){
    console.error("Error declining request:",error);
    return res.status(500).json({message:"Internal Server Error"});
  }
});

app.post("/accept-request", async (req, res) => {
  const { requestId } = req.body;
  try{
    const request = await Request.findById(requestId);
    const user = await User.findById(request.from);
    if(!request){
      return res.status(404).json({message:"Request not found"});
    }
    const event = await Event.findById(request.eventId);
    if(!event){
      return res.status(404).json({message:"Event not found"});
    }
    if(event.attendees.length === event.size){
      return res.status(400).json({message:"Event is full"});
    }
    if(event.attendees.includes(request.from)){
      return res.status(400).json({message:"User already registered for this event"});
    }
    if(user.events.includes(event._id)){
      return res.status(400).json({message:"User already registered for this event"});
    }
    user.events.push(event._id);
    await user.save();
    event.attendees.push(request.from);
    await event.save();
    request.status = "Accepted";
    await request.save();
  }
  catch(error){
    console.error("Error accepting request:",error);
    return res.status(500).json({message:"Internal Server Error"});
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
