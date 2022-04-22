const { MongoClient, ObjectId } = require("mongodb");

// local mongodb chal raha he to uska url dal dunga
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// creating a BSON MongoDB id which it creates for every new document
const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp()); // ye id kab generate kari thi
// ab jab mai koi document kisi collection mai insert karwa raha honga tab mai usko "_id" provide kar sakta hu.

// connecting to the database
// useNewUrlParser -> old url parser has been depricated so we have to tell connect to use the new url parser
// callback gets executed once we get connected to the DB, ie. connect is async.
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  // successfully connected to mongo

  // connecting to the db
  // Note - If the db didnt exist then the following command will create it, if its already present then it will just connect to it.
  const db = client.db(databaseName);

  // inserting into a colection
  // Note - Bilkul upar jaise hi agr collection ni hogi to create ho jaegi
  // Imp - insertOne is async. 2nd argument of insertOne can be a callback jo insert karne ke baad (pass ya fail) pe chalega.
  db.collection("users").insertOne(
    {
      email: "madleads2001@gmail.com",
      password: "1234",
    },
    (err, result) => {
      if (err) return console.log(err);
      // to know the "_id" value of the document you just inserted we can access result.insertedId
      console.log(result.insertedId);
    }
  );

  db.collection("users").insertMany(
    [
      { email: "jay@gmail.com", password: "12345" },
      { email: "apple@gmail.com", password: "123456" },
    ],
    (err, result) => {
      if (err) return console.log(err);
      console.log(result.insertedIds);
    }
  );

  // inserting to tasks collection
  db.collection("tasks").insertMany(
    [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
      { description: "Task 3", completed: true },
    ],
    (err, result) => {
      if (err) return console.log(err);
      console.log(result.insertedIds);
    }
  );
});
