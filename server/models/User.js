const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { ObjectId } = mongoose.Schema.Types;

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
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
