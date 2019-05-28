require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;
const checkForSession = require("./middlewares/checkForSession");
const { read } = require("./controllers/swagController");
const {
  getUser,
  login,
  register,
  signout
} = require("./controllers/authController");
const cartController = require("./controllers/cartController");

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSession);

app.get("/api/user", getUser);
app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/signout", signout);
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);

app.get("/api/swag", read);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
