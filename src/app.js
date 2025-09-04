const express = require("express");
const app = express();

app.use("/dashboard", (req, resp) => {
  resp.send("<h1>Hello from Express dashboard</h1>");
});
app.use("/menu", (req, resp) => {
  resp.send("<h1>Hello from Express Menu</h1>");
});

app.use("/user", (req, resp) => {
  resp.send({
    name: "Anil Misal",
    age: 24,
    city: "Pune",
  });
});

app.use((req, resp) => {
  resp.send("<h1>Hello from Express</h1>");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
