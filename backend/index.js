const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Otp = require("./models/Otp");
const Event = require("./models/Event");
const Request = require("./models/Request");
const Invite = require("./models/Invite");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const dotenv = require("dotenv");
const otpGenerator = require("otp-generator");
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

mongoose
  .connect(
    "mongodb+srv://21pa1a0531:JU5kGfUf5niBZreG@eventscluster.aoyo1zs.mongodb.net/EventManager"
    // "mongodb+srv://emcommerce-admin:123456780@cluster0.z8jcujg.mongodb.net/EventManager"
  )
  .then(() => console.log(`${mongoose.connection.name}`))
  .catch((err) => console.log(err));

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("MongoDB connected successfully");
// });

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_PASSWORD,
  },
});

//middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }
  const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

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
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "3h" });
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

app.post(
  "/add-event",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
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
  }
);

app.post("/email-verification", async (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  try {
    const mailOptions = {
      from: process.env.REACT_APP_EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Your OTP is ${otp}`,
    };
    const hashedOtp = await bcrypt.hash(otp, 10);
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        try {
          await Otp.deleteOne({ email });
          const newOtp = new Otp({
            email,
            otp: hashedOtp,
          });
          await newOtp.save();
          console.log("OTP sent successfully");
          return res.json({ success: true });
        } catch (error) {
          console.error("Error saving otp:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/otp-verification", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const userOtp = await Otp.findOne({ email });
    if (userOtp) {
      const match = await bcrypt.compare(otp, userOtp.otp);
      if (match) {
        return res.json({ success: true });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } else {
      return res.status(404).json({ message: "OTP not found" });
    }
  } catch (error) {
    console.error("Error during otp verification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/change-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({ success: true });
  } catch (error) {
    console.error("Error changing password:", error);
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

app.get("/fetch-events-reverse", async (req, res) => {
  try {
    const events = await Event.find();
    events.reverse();
    return res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/fetch-events-by-category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const events = await Event.find({ category });
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

app.post("/book-event", verifyToken, async (req, res) => {
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
      return res
        .status(400)
        .json({ message: "You are already registered for this event" });
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

app.post("/add-request", verifyToken, async (req, res) => {
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
    if (event.requestsId.includes(newRequest._id)) {
      return res.status(400).json({ message: "Request already sent" });
    }
    const user = await User.findById(from);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const creator = await User.findById(to);
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    //send email to user
    try {
      const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: user.email,
        subject: "Event Request Confirmation",
        text: `Hi ${user.username}, you have successfully requested to join the event ${event.title}`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    //send email to creator about the request
    try {
      const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: creator.email,
        subject: "Event Request",
        text: `Hi ${creator.username}, you have a new request for the event ${event.title}`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
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
    //reverse
    requests.reverse();
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

app.get("/fetch-users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/decline-request", verifyToken, async (req, res) => {
  const { requestId } = req.body;
  try {
    //send email to user about the request being declined
    const request = await Request.findById(requestId);
    const user = await User.findById(request.from);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    const event = await Event.findById(request.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    try {
      const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: user.email,
        subject: "Event Request Declined",
        text: `Hi ${user.username}, your request to join the event ${event.title} has been declined , better luck next time!`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    request.status = "Declined";
    await request.save();
    return res.json({ success: true });
  } catch (error) {
    console.error("Error declining request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/add-invite", verifyToken, async (req, res) => {
  const { eventId, to, from } = req.body;
  try {
    const newInvite = new Invite({
      eventId,
      to,
      from,
    });
    await newInvite.save();
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.invites.includes(to)) {
      return res.status(400).json({ message: "Invite already sent" });
    }
    event.invites.push(from);

    const user = await User.findById(to);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await event.save();
    //send email
    try {
      const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: user.email,
        subject: "Event Invite",
        text: `Hi ${user.username}, you have been invited to the event ${event.title}`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error adding invite:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/accept-request", verifyToken, async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await Request.findById(requestId);
    const user = await User.findById(request.from);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    const event = await Event.findById(request.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.attendees.length === event.size) {
      return res.status(400).json({ message: "Event is full" });
    }
    if (event.attendees.includes(request.from)) {
      return res
        .status(400)
        .json({ message: "User already registered for this event" });
    }
    if (user.events.includes(event._id)) {
      return res
        .status(400)
        .json({ message: "User already registered for this event" });
    }
    //send email
    try {
      const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: user.email,
        subject: "Event Request Accepted",
        text: `Hi ${user.username}, your request to join the event ${event.title} has been accepted, see you there!`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    user.events.push(event._id);
    await user.save();
    event.attendees.push(request.from);
    await event.save();
    request.status = "Accepted";
    await request.save();
    return res.json({ success: true });
  } catch (error) {
    console.error("Error accepting request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
