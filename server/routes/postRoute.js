const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const postController = require("../controllers/postController");
const requireLogin = require("../middleware/requireLogin");

Router.post("/createpost", requireLogin, postController.createPost_post);
Router.get("/allposts", requireLogin, postController.allPosts_get);
Router.get("/myposts", requireLogin, postController.myPosts_get);
Router.put("/like", requireLogin, postController.likePost);
Router.put("/unlike", requireLogin, postController.unlikePost);
Router.put("/comment", requireLogin, postController.comment);
Router.delete("/deletepost/:postId", requireLogin, postController.deletePost);

module.exports = Router;
