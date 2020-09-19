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
    .populate("postedBy", "_id name pic")
    .populate("comments.commentedBy", "_id name")
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

module.exports.likePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("comments.commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

module.exports.unlikePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("comments.commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

module.exports.comment = (req, res) => {
  const comment = {
    text: req.body.text,
    commentedBy: req.user,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("comments.commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

module.exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
};

module.exports.deleteComment = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: { comments: { _id: req.params.commentId } },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("comments.commentedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err || !result) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

module.exports.allSubscribePosts_get = (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name pic")
    .populate("comments.commentedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.updatePost = (req, res) => {
  const { title, body } = req.body;
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $set: { title, body },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, result) => {
      if (err) {
        res.status(422).json({ error: "Error updating the post" });
      } else {
        res.json(result);
      }
    }
  );
};
