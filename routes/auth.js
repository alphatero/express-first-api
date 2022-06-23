var express = require("express");
var router = express.Router();

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

module.exports = router;
