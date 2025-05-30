const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add last name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);
