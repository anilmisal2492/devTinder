const adminAuth = (req, res, next) => {
  const token = "secure";
  console.log("Admin Auth Middleware Executed");
  if (token !== "secure") {
    return res.status(401).send("Admin Not Authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Auth Middleware Executed");
  const token = "user";
  if (token !== "user") {
    return res.status(401).send("User Not Authorized");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
