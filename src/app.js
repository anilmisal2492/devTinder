const express = require("express");
const app = express();

app.use("/user", (req, resp, next) => {
  console.log("user api called");
  // resp.send("user api response");
  next();
});
app.use("/user", (req, resp, next) => {
  console.log("admin api called");
  // resp.send("admin api response");
  next();
});
app.use("/user", (req, resp, next) => {
  console.log("guest api called");
  // resp.send("guest api response");
  next();
});
app.use((req, resp, next) => {
  console.log("all api called");
  resp.send("all api response");
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
