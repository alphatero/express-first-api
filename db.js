var admin = require("firebase-admin");

var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://notes-totest-default-rtdb.asia-southeast1.firebasedatabase.app",
});
// const config = require("./config");
// const admin = require("firebase-admin");
// admin.initializeApp(config.firebaseConfig);
const db = admin.database();

module.exports = db;
