const dotenv = require("dotenv").config();
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const funcs = require("./utils/funcs");

const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");
const authRouter = require("./routes/authRoute");

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

app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));
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
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use(funcs.checkAuthenticated);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
