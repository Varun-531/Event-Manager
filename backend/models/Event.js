const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 60,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 200,
  },
  location: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  attendees: {
    type: Array,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  termsAndConditions: {
    type: [String],
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  // latitude: {
  //   type: Number,
  //   required: true,
  // },
  // longitude: {
  //   type: Number,
  //   required: true,
  // },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
