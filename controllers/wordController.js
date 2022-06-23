"use strict";

const { router } = require("../app");
const firebase = require("../db");
const Word = require("../models/word");
const firestore = firebase.firestore();

exports.getAllWords = async function (req, res, next) {
  try {
    const words = await firestore.collection("words");
    const data = await words.get();
    const wordsArray = [];
    if (data.empty) {
      res.status(404).send("No word record found");
    } else {
      data.forEach((doc) => {
        const word = new Word(doc.id, doc.data().title, doc.data().describe);
        wordsArray.push(word);
      });
      res.send(wordsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

router.post("/", (req, res) => {
  const { data } = req.body;
  const productsRef = firebaseAdmin.ref("word");

  const productRef = productsRef.push();
  data.id = productRef.key;
  productsRef.set(data).then(() => {
    res.send({
      status: true,
      data,
    });
  });
});
