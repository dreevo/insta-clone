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

module.exports.followUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: {
        followers: req.user._id,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            following: req.body.followId,
          },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(422).json({ error: err });
        });
    }
  );
};

module.exports.unfollowUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true, useFindAndModify: false }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};
