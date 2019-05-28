// const express = require("express");
// const session = require("express-session");
// const app = express();
// app.use(express.json());

module.exports = function(req, res, next) {
  const { session } = req;
  if (!session.user) {
    session.user = { username: "", cart: [], total: 0 };
  }
  next();
};
