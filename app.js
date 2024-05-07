const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// middleware
// app.use((req, res, next) => {
//   //   let { query } = req.query;
//   //   console.log(query);
//   console.log("Hi, I am middleware");
//   //   res.send("middleware finished");
//   return next();
// });

// app.use((req, res, next) => {
//   console.log("Hi, I am 2nd middleware");
//   next();
//   //   console.log("this is after next");bad way
// });

// app.use((req, res, next) => {
//   req.time = Date.now();
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });
const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  }
  throw new ExpressError(401, "Access Denied");
};

app.get("/api", (req, res) => {
  res.send("data");
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
app.get("/random", (req, res) => {
  res.send("this is a random page");
});
app.get("/err", (req, res) => {
  abcd = abcd;
});

app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is  Forbidden");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).send(message);
});

// app.use((err, req, res, next) => {
//   console.log("-----------ERROR------------");
//   res.send(err);
// });

app.listen(8080, () => {
  console.log("server listening to port 8080");
});
