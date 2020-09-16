const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const userController = require("../controllers/userController.js");
const requireLogin = require("../middleware/requireLogin");

Router.get("/user/:id", requireLogin, userController.showUser_get);

module.exports = Router;
