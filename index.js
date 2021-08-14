if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const errorHandler = require("./handlers/error");
const authRoute = require("./routes/authRoute");
const messagesRoutes = require("./routes/messagesRoute");
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8081;
const IP = process.env.IP;

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// passport for User authentication
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users/:id/messages", messagesRoutes);

// 404 for routes not found
app.use( (req, res, next) => {
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
});

// error handler middleware to print out error message
app.use(errorHandler);

app.listen( PORT, () => {
    console.log(`Server started and listening on PORT: ${PORT} and IP: ${IP}`)
});

