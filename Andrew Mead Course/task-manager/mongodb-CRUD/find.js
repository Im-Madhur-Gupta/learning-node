const { MongoClient } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// callback based connection
// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   async (err, client) => {
//     if (err) return console.log(err);

//     const db = client.db(databaseName);

//     // querying a user from a collection of a db
//     db.collection("users").findOne(
//       { email: "madleads2001@gmail.com" },
//       (err, document) => {
//         if (err) return console.log(err);
//         // Note - If no document is found upon running the query then its not an error, simply the "document" would be null. Err tab atta he jab connection ni ban paya, collection not found type of stuff.
//         // IMP - "_id" se query karna he to new ObjectId("<str obj id>") use karna padega.
//         console.log(document);
//       }
//     );
//     // IMP - findOne() data return karta he cursor ni.

//     const cursor = db
//       .collection("users")
//       .find({ email: "madleads2001@gmail.com" });
//     // IMP - find() cursor return karta he.
//     // Cursor se data access karne ke kai tareke he, mai forEach() wala use karunga
//     await cursor.forEach((doc) => {
//       console.log(doc);
//     });
//   }
// );

// --------------------------------------------------------------------------------------------------

// Promise based connection
// 1. findOne()
MongoClient.connect(connectionURL, { useNewUrlParser: true })
  .then((client) => {
    const db = client.db(databaseName);
    // querying a user from a collection of a db
    db.collection("users").findOne(
      { email: "madleads2001@gmail.com" },
      (err, document) => {
        if (err) return console.log(err);
        // Note - If no document is found upon running the query then its not an error, simply the "document" would be null. Err tab atta he jab connection ni ban paya, collection not found type of stuff.
        // IMP - "_id" se query karna he to new ObjectId("<str obj id>") use karna padega.
        console.log(document);
      }
    );
    // IMP - findOne() data return karta he cursor ni.
  })
  .catch((err) => {
    console.log(err);
  });

// 2. find()
MongoClient.connect(connectionURL, { useNewUrlParser: true })
  .then((client) => {
    const db = client.db(databaseName);
    return db.collection("users").find({ email: "madleads2001@gmail.com" });
    // IMP - find() Promise return karta he which resolves to a cursor object.
    // Cursor se data access karne ke kai tareke he, mai forEach() wala use karunga and this is an async operation
  })
  .then((cursor) => {
    cursor.forEach((doc) => {
      console.log(doc);
    });
  })
  .catch((err) => {
    console.log(err);
  });
