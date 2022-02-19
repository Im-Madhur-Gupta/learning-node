// Synchronous or Blocking Code - Will get executed line by line.
// In modules I wrote - let text = fs.readFileSync(dir,encoding); - is line ka ye matlab tha ki ap is line ke agge tab tak mat jana jab tak text variable me content store na ho gaya ho.


// Asynchronous or Non-Blocking Code - Line by line execution is not guaranted, callbacks will fire.
// for readFile() - it shows asynchronous behaviour and requires a 3rd arguement which is a callback function.
const fs = require("fs");
fs.readFile("./nodejs/read.txt","utf-8",(err,data)=>{
    // err stands for error and (err,data) are fixed arguements of callback function.
    console.log(data);
});
console.log("This is a message.");
// Yaha "This is a message" pehle print ho raha he phir file ka data print ho raha he, this is due to async behaviour of readFile() func. readFile() func file ko read karna chalu kardega jab uski line execute hogi par compiler won't wait until readFile() has completed reading read.txt, so wo next line pe chala jaega aur "This is a message" print ho jaega, phir jabhi kabhi readFile() read karna complete kar lega to phir apne callback function ko fire kar dega.

// node js works on Non-Blocking IO model, based on call backs.