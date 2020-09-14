const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const postController = require("../controllers/postController");
const requireLogin = require("../middleware/requireLogin");

Router.post("/createpost", requireLogin, postController.createPost_post);
Router.get("/allposts", postController.allPosts_get);
Router.get("/myposts", requireLogin, postController.myPosts_get);

module.exports = Router;
