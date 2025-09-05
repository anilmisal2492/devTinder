const express = require("express");
const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/user", (req, res) => {
  console.log("User Page Accessed");
  res.send("User Page Accessed");
});
app.get("/admin", (req, res) => {
  console.log("Admin Page Accessed");
  res.send("Admin Page Accessed");
});

app.post("/login", (req, res) => {
  console.log("Login Page Accessed");
  res.send("Login Page Accessed");
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
