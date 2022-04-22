// updateOne, UpdateMany

const { MongoClient } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// MongoClient.connect(connectionURL, { useNewUrlParser: true })
//   .then((client) => {
//     const db = client.db(databaseName);
//     // findOne(queryDoc, updatedDoc)
//     return db.collection("users").updateOne(
//       { email: "madleads2001@gmail.com" },
//       {
//         // $set operator se given field update ho jati he object mai baki sab same rehta he.
//         // $set is an update operator
//         $set: {
//           password: "changed",
//         },
//       }
//     );
//   })
//   .then((info) => {
//     // info about the matched document
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

MongoClient.connect(connectionURL, { useNewUrlParser: true })
  .then((client) => {
    const db = client.db(databaseName);
    return db.collection("users").updateMany(
      { email: "madleads2001@gmail.com" },
      {
        $set: {
          password: "changed1",
        },
      }
    );
  })
  .then((info) => {
    console.log(info);
  });
