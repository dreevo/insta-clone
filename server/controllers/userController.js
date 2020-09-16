const Post = require("../models/Post");
const User = require("../models/User");

module.exports.showUser_get = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, post) => {
          if (err) {
            console.log(err);
            return res.status(422).json({ error: err });
          }
          res.json({ user, post });
        });
    })
    .catch((err) => {
      res.status(404).json({ error: "User not found" });
    });
};
