const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Event = require("./models/Event");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dp1gjfgmg",
  api_key: "973866118168666",
  api_secret: "hJTdoFtZiFavz4kS10rjKihjrOY",
});

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/EventManager", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
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
    size,
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
      size,
      creator,
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

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
