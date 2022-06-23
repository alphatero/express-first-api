var express = require("express");
var router = express.Router();

const firebaseAdmin = require("../db");

// point url
const wordsRef = firebaseAdmin.ref("note/words");

router.post("/", (req, res) => {
  const { data } = req.body;

  const wordRef = wordsRef.push();

  data.id = wordRef.key;
  wordRef.set(data).then(() => {
    res.send({
      status: true,
      data,
    });
  });
});

router.get("/words", function (req, res, next) {
  const words = [];
  wordsRef
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((item) => {
        words.push(item.val());
      });
    })
    .then(() => {
      res.send({
        status: true,
        words,
      });
    });
});

module.exports = router;
