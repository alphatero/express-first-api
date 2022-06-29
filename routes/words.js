const express = require("express");
const router = express.Router();
const firebasedb = require("../connection/firebase-admin");

// point url

const wordsRef = firebasedb.ref("note/words");
router.post("/create", (req, res, next) => {
  const reqData = req.body.data || {};

  const wordRef = wordsRef.push();

  reqData.id = wordRef.key;

  wordRef.set(reqData).then(() => {
    res.send({
      status: true,
      reqData,
    });
  });
});

router.get("/", function (req, res, next) {
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
