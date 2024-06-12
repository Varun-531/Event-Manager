const mongoose = require("mongoose");
const otpschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, expires: 300, default: Date.now },
});
module.exports = mongoose.model("Otp", otpschema);
