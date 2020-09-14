const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const authController = require("../controllers/authController");
const requireLogin = require("../middleware/requireLogin");

Router.post("/signup", authController.signup_post);
Router.post("/signin", authController.signin_post);
Router.get("/protected", requireLogin, authController.protected);

module.exports = Router;
