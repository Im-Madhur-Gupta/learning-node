const { MongoClient } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// MongoClient.connect(connectionURL, { useNewUrlParser: true })
//   .then((client) => {
//     const db = client.db(databaseName);
//     return db.collection("tasks").deleteOne({
//       completed: true,
//     });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

MongoClient.connect(connectionURL, { useNewUrlParser: true })
  .then((client) => {
    const db = client.db(databaseName);
    return db.collection("tasks").deleteMany({
      completed: true,
    });
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
