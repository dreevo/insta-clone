const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
