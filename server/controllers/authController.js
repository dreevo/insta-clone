const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const nodemailer = require("nodemailer");
const { NODEMAILER_API } = require("../keys");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const transport = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: NODEMAILER_API,
    },
  })
);

module.exports.resetPassword_post = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res.status(422).json({ error: "User doesnt exsit" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transport.sendMail({
          to: user.email,
          from: "sidedark85@gmail.com",
          subject: "Password reset",
          html: `
            <p> You requested for a password reset</p>
            <h5> Click on this <a href="http://localhost:3000/passwordReset/${token}">link</a> to reset your password</h5>
          `,
        });
        res.json({ message: "Check your email to reset your password" });
      });
    });
  });
};

module.exports.newPassword_post = (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Try again , the session has expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user
          .save()
          .then((savedUser) => {
            res.json({ message: "Password update successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.signup_post = (req, res) => {
  const { name, email, password, pic } = req.body;
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
                pic,
              });
              user
                .save()
                .then((user) => {
                  transport.sendMail({
                    to: user.email,
                    from: "sidedark85@gmail.com",
                    subject: "Sign up success",
                    html: "<h1>Welcome to Our Insta Clone </h1>",
                  });
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
          const { _id, name, email, followers, following, pic } = savedUser;
          res.json({
            token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
