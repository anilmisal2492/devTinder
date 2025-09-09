const mongoose = require("mongoose");

// Use proper naming and return the function call
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anil_369:anil369@namastenode.qderzwt.mongodb.net/devTinder"
    );
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; // re-throw so that main file can catch it
  }
};

module.exports = { connectDb };