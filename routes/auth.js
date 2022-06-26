var express = require("express");
var router = express.Router();
var firebaseAdmin = require("../connection/firebase-admin");
var firebase = require("../connection/firebase-connect");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/singin", function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log(user);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      req.flash("info", errorMessage);
      res.redirect("/login/");
    });
});

router.get("/signup", function (req, res, next) {
  console.log(firebasebase.ref());
  res.render("signup", {
    csrfToken: req.csrfToken(),
    title: "註冊帳號",
  });
});

router.post("/signup", function (req, res, next) {
  console.log(req.body);
  res.render("signup", { title: "註冊帳號" });
});

module.exports = router;
