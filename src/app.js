const express = require("express");
const { connectDb } = require("./config/database"); // ✅ destructure correctly
const User = require("./models/user"); // ✅ import the User model
const app = express();
const PORT = 3000;

app.post("/login", async (req, res) => {
  try {
    const user = new User({
      name: "Virat",
      age: 23,
      gender: "male",
      email: "test@email.com",
      password: "12345",
      location: "Pune",
      confirmPassword: "12345",
    });

    await user.save(); // ✅ save is async
    res.send("User created successfully !!");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Failed to create user");
  }
});

connectDb()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
