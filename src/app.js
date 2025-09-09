const express = require("express");
const { connectDb } = require("./config/database"); // ✅ destructure correctly
const User = require("./models/user"); // ✅ import the User model
const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // ✅ log the request body
    const user = new User(req.body); // ✅ create a new User instance

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
