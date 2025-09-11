const express = require("express");
const { connectDb } = require("./config/database"); // ✅ destructure correctly
const User = require("./models/user"); // ✅ import the User model
const { validationData } = require("./utils/utils"); // ✅ import validation function
const bcrypt = require("bcrypt"); // ✅ import bcrypt for password hashing
const cookieParser = require('cookie-parser'); // Import cookie-parser middleware
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

app.post("/signup", async (req, res) => {
  try {
    // Valtion of reuest body
    validationData(req); // ✅ validate request data
    const { name, email, gender, password, age, skills, location } = req.body;
    //  Password hashing
    const passwordHashed = await bcrypt.hash(password, 10); // ✅ hash password
    console.log("passwordHashed", passwordHashed);
    const user = new User({
      name,
      email,
      password: passwordHashed, // ✅ store hashed password
      age,
      location,
      gender,
      skills,
    }); // ✅ create a new User instance

    await user.save(); // ✅ save is async
    res.send("User created successfully !!");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Error creating user: " + err.message);
  }
});

// login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ get email and password from request body
    const user = await User.findOne({ email: email }); // ✅ find user by email
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password); // ✅ compare passwords
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid email or password");
    }

    // Generate a simple token (in real applications, use JWT or similar)
    // ✅ Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload
      "Namaste@369", // 🔑 secret key (keep in env variable!)
      { expiresIn: "1h" } // token expires in 1 hour
    ); // ✅ generate a simple token
        // send a cookie
    res.cookie('token', token);
    res.send("Login successful");

    
  } catch (err) {
    res.status(500).send("ERROR logging in" + err.message);
  }
});
// Profile API to get user details
app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    // Verify token
      const decoded = jwt.verify(token, "Namaste@369");
      const userId = decoded.userId;  // Get userId from decoded token
      const user = await User.findById(userId); // Fetch user details excluding password
      if (!user) {
        return res.status(404).send("User not found");
      } else {
        res.send(user);
      }
    }
    catch (err) {
      res.status(500).send("ERROR fetching profile" + err.message);
    } });
// Fetch all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find(); // ✅ fetch all users
    res.send(users); // ✅ send users as JSON response
  } catch (err) {
    res.status(500).send("ERROR fetching users" + err.message);
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
    res.status(500).send("ERROR fetching user" + err.message);
  }
});

// Delete user by userId
app.delete("/user", async (req, res) => {
  const userId = req.body.userId; // ✅ get userId from request body
  try {
    await User.findByIdAndDelete(userId); // ✅ delete user by userId
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("ERROR deleting user" + err.message);
  }
});
// Update user by userId
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId; // ✅ get userId from request body
  const updateData = req.body; // ✅ get update data from request body
  const ALLOWED_UPDATES = ["name", "age", "skills", "location"]; // ✅ define allowed fields to update
  try {
    const isValidOperation = Object.keys(updateData).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isValidOperation) {
      return res.status(400).send("Invalid updates!");
    }
    if (updateData.skills > 10) {
      return res.status(400).send("Skills should be less than 10");
    }
    await User.findByIdAndUpdate(userId, updateData); // ✅ update user by userId
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("ERROR updating user" + err.message);
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
