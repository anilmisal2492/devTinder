const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
  password: String,
  location: String,
  confirmPassword: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
