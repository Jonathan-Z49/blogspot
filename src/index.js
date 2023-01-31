const dotenv = require("dotenv").config();
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
//const passportAuth = require("./config/auth");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRouter = require("./routes/postRoute");

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "failed to connect"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//app.use(passportAuth.authenticate("session"));

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
