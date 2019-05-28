require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;
const checkForSession = require("./middlewares/checkForSession");
const { read } = require("./controllers/swagController");

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSession);

app.get("/api/swag", read);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
