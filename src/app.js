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

// Fetch all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find(); // ✅ fetch all users
    res.send(users); // ✅ send users as JSON response
  } catch (err) {
    res.status(500).send("Failed to fetch users");
  }
});
// Fetch user by email
app.get("/user", async (req, res) => {
  try {
    const email = req.body.email; // ✅ get email from request body
    const user = await User.findOne({ email: email }); // ✅ find user by email
    if (!email) {
      return res.status(400).send("Email is required");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Failed to fetch user");
  }
});

// Delete user by userId
app.delete("/user", async (req, res) => {
  const userId = req.body.userId; // ✅ get userId from request body
  try {
    await User.findByIdAndDelete(userId); // ✅ delete user by userId
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Failed to delete user");
  }
});
// Update user by userId
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId; // ✅ get userId from request body
  const updateData = req.body; // ✅ get update data from request body
  const ALLOWED_UPDATES = ["name", "age","skills","location", ]; // ✅ define allowed fields to update
  try {
    const isValidOperation = Object.keys(updateData).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isValidOperation) {
      return res.status(400).send("Invalid updates!");
    }
    if(updateData.skills > 10){
      return res.status(400).send("Skills should be less than 10");
    }
    await User.findByIdAndUpdate(userId, updateData); // ✅ update user by userId
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Failed to update user");
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
