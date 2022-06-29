const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const csurf = require("csurf");
const logger = require("morgan");

const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
const wordsRouter = require("./routes/words");
// const authRouter = require("./routes/auth");

const csrfProtection = csurf({ cookie: true });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", csrfProtection, usersRouter);
app.use("/words", wordsRouter);
app.use("/login", csrfProtection, authRouter);
// app.use("/signup", csrfProtection, signupRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
