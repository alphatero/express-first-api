const express = require("express");
const router = express.Router();
const firebase = require("../connection/firebase-connect");
const { check, validationResult } = require("express-validator");

const validate = [
  check("email").isEmail().withMessage("Email is required"),
  check("password").isLength({ min: 6 }).withMessage("Password is required"),
  check("username").isLength({ min: 2 }).withMessage("Username is required"),
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  const uid = req.session.uid;
  const displayName = req.session.displayName;
  res.render("users", { title: "登入成功", uid, displayName });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", {
    csrfToken: req.csrfToken(),
    title: "註冊帳號",
  });
});

router.post("/signup", validate, function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("info", errors.array());
    return res.redirect("users/signup");
  }

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCredentials) {
      userCredentials.user.updateProfile({ displayName: username });

      const saveUser = {
        email: email,
        username: username,
        uid: userCredentials.user.uid,
      };

      firebase
        .database()
        .ref("users/" + userCredentials.user.uid)
        .set(saveUser);
      req.flash("info", "註冊成功");
      res.redirect("/users/signup");
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      req.flash("info", errorMessage);
      res.redirect("/users/signup");
    });
});

router.get("/signin", function (req, res, next) {
  res.render("signin", {
    csrfToken: req.csrfToken(),
    title: "登入畫面",
  });
});

router.post("/signin", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      req.session.uid = user.user.uid;
      req.session.displayName = user.user.displayName;
      res.redirect("/users");
    })
    .catch(function (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;

      req.flash("info", errorMessage);
      res.redirect("/users/signin");
    });
});

module.exports = router;
