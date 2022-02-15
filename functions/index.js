const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();
const database = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.scheduledFunction = functions.region("asia-south1")
    .pubsub.schedule("*/15 * * * *")
    .onRun(() => {
      fetch("https://api.coinbase.com/v2/prices/spot?currency=USD")
          .then((res) => res.json())
          .then((res) => {
            const dandt = new Date();
            const currTime = dandt
                .toLocaleTimeString("en-US", {timeZone: "Asia/Kolkata"});
            const currDate = dandt
                .toLocaleDateString("en-US", {timeZone: "Asia/Kolkata"});
            database.doc("antler-task-db/btc-price")
                .update(
                    {
                      prices: FieldValue.arrayUnion({
                        val: res.data.amount,
                        date: currDate,
                        time: currTime,
                        curr: Date.now(),
                      }),
                    });
            return console.log("successful price update");
          })
          .catch((err) => {
            console.log(err);
          });
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
