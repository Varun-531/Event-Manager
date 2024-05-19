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
  endTime:{
    type:String,
    required:true
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
    type: String,
    required: true,
  },
  pincode:{
    type:Number,
    required:true,
  },
  availability:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  category: {
    type: String,
    required: true,
  },
  requests:{
    type:[String]
  },
  requestsId:{
    type:[String]
  }
});

module.exports = mongoose.model("Event", eventSchema);
