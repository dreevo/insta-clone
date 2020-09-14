const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

module.exports.signup_post = (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ error: "Please provide all fields" });
  } else {
    User.findOne({ email })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({ error: "User already exists" });
        } else {
          bcrypt
            .hash(password, 12)
            .then((hashedPassword) => {
              const user = new User({
                email,
                password: hashedPassword,
                name,
              });
              user
                .save()
                .then((user) => {
                  res.status(200).json({ message: "user saved successfully" });
                })
                .catch((err) => {
                  if (err.message.includes("please enter a valid email")) {
                    return res
                      .status(422)
                      .json({ error: "Please provide a valid email" });
                  }
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports.signin_post = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide all fields" });
  }
  User.findOne({ email }).then((savedUser) => {
    if (!savedUser) {
      res.status(422).json({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email } = savedUser;
          res.json({ token, user: { _id, name, email } });
        } else {
          res.status(422).json("Invalid email or password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports.protected = (req, res) => {
  res.send("Hello user");
};
