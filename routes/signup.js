var express = require("express");
var router = express.Router();

// router.post("/signup", function (req, res, next) {
//   res.render("signup", { title: "註冊帳號" });
// });
router.get("/", function (req, res, next) {
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
