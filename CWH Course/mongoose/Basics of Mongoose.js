const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/maddyKart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// Below command tab chal jaega jab maene successfully db se connect karliya ho, so its optional.
// db.once('open', function () {
//   console.log("We have established a connection to maddyKart.");
// }); 
// Above is an asynchronous command.

// Defining Schema -
// Schema basically ye batata he ki mai apne database me kis type ke data ko dalunga, yani kya fields/columns ka name and type hoga, so, basically it acts as a validator of data. Ex - kittySchema me name field he aur wo String hi hoga
const kittySchema = new mongoose.Schema({
  name: String
});

// Adding methods to a schema which can be used by documents that are created using the Model compiled from this schema -
// name of our method is speak() and it will just print the name (String) value stored in the document. 
kittySchema.methods.speak = function (){
  console.log("My name is "+this.name+", meoooowwwwwwwwwww.");
}

// Compiling our Schema into a Model -
// basically schema se model banana yani apne schema to confirm/lock/fix kar diya.
const Kitten = mongoose.model('Kitten',kittySchema);
// A Model is a class with which we construct Documents (model class ke objects). In this case, each document will be a kitten with properties and behaviors as declared in our schema.

// Creating a document (object) of Kitten Model (class) -
const soft_kitty = new Kitten({ name: 'Soft Kitty' });
const soft_kitty2 = new Kitten({ name: 'Soft Kitty2' });
const soft_kitty3 = new Kitten({ name: 'Soft Kitty3' });
// console.log(soft_kitty.name);
// soft_kitty.speak();

// Obviously ye data abhi database me nhi jaega

// IMP and COOL Thing - jab mai kisi document ko save karne ki koshish karunga using save() method to wo jis Model se bana he uske 1st argument (here, Kitten Model's 1st argument was "Kitten") ke corresponding plural name ("kittens" capitalization hat jaega) ki Collection me store ho jaega.
// save() method 1 function lega jo 2 arguments lega (error, jo document save karna he).
soft_kitty.save(function (err,soft_kitty){
  if(err) return console.error(err);
  soft_kitty.speak();
});
soft_kitty2.save(function (err,soft_kitty2){
  if(err) return console.error(err);
  soft_kitty2.speak();
});


// Now say we want to find some/all documents stored in the "kittens" (here) collection in our DB -
// model_name.find() - takes 2 arguemnets 1st filter object, 2nd is callback function which in turn takes 2 arguements 1st error and 2nd an array of found matching documents. Agr ek model se db me store kare sare docs chahiye to find() ka 1st agruement mat do

// with filter obj -
// Kitten.find({name:"Soft Kitty"},function (err,arr_docs){
//   if(err) return console.error(err);
//   console.log(arr_docs);
// });

// without filter obj -
Kitten.find(function (err,arr_docs){
  if(err) return console.error(err);
  console.log(arr_docs);
});