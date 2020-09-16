const express = require("express");
const { DB_URI } = require("./keys");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Mongoose
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongoose");
});
mongoose.connection.on("error", (err) => {
  console.log("Error while trying to connect to mongoose");
});

//Listening
app.listen(4000, () => {
  console.log("Listening on port 4000");
});

//Routes
app.use("/", authRoute);
app.use("/", postRoute);
app.use("/", userRoute);
