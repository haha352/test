const express = require("express");
const authController = require("../controller/authController");
const authRouter = express.Router();
const Course = require('../models/courses')
const auth = require("../middleware/auth");
// authRouter
//   .route("/register")
//   .get(authController.index)
//   .post(authController.register);

authRouter
  .route("/login")
  .post(authController.handleLogin);

 

  
module.exports = authRouter;
