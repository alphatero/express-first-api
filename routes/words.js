const express = require("express");
const router = express.Router();
const firebasedb = require("../connection/firebase-admin");

// point url

router.post("/create", (req, res, next) => {
  console.log(req.body);

  const reqData = req.body.data || {};

  const wordsRef = firebasedb.ref("note/words");
  const wordRef = wordsRef.push();

  reqData.id = wordRef.key;

  wordRef.set(reqData).then(() => {
    res.send({
      status: true,
    });
  });
});

// router.get("/all", function (req, res, next) {
//   const words = [];
//   wordsRef
//     .once("value")
//     .then((snapshot) => {
//       snapshot.forEach((item) => {
//         words.push(item.val());
//       });
//     })
//     .then(() => {
//       res.send({
//         status: true,
//         words,
//       });
//     });
// });

module.exports = router;
