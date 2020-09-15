const Post = require("../models/Post");

module.exports.createPost_post = (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    res.status(422).json({ error: "Please add the required fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    pic,
    postedBy: req.user,
  });

  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.allPosts_get = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.myPosts_get = (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myPosts) => {
      res.json({ myPosts });
    })
    .catch((err) => {
      console.log(err);
    });
};
