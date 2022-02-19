// Fact - 200 is the standard status code for successful http requests.
// 404 is for page not found.
// 400 is for bad syntax/bad request.

const express = require("express"); // importing the express module
const app = express(); // Creates an express application
// express ka app banane ke liye ye dono step must he


// Serving static files from our server - 
// Static files wo files hoti he jo mai kisiko bhi use/download karne ke liye allow karta hu bina login etc kuch kare.
app.use("/static",express.static("static")); // "/static" is the url at which static files will be served, 2nd static likha he wo local directory he jaha pe meri static files jo mai share karna chahta hu wo stored he.
// Manlo maine koi .js file as a static file share kari to wo .js file execute ni hogi request milne par wo sirf view hogi.



const path = require("path"); // ek module import kar liya jisko mai strings ko join karne ke liye use karunga. 
// Setting the template engine as pug -
app.set("view engine","pug");

// Setting the views directory -
app.set("views",path.join(__dirname,"views"));
// __dirname is the current local directory, here directory in which app.js is stored.
// views is the name of the folder in the local directory in which I will store .pug files.

// Our pug demo endpoint - basically banai hui .pug file ko render karwa raha hu using a get request, post me bhi ho jaega obv. A .pug file is a html template, ab is html template me jo bhi variables dale he unki value mai .render() ko as a 2nd arguement dunga phir wo template fill karke render kar dega.
app.get("/demo",(req,res)=>{
    res.status(200).render("demo.pug",{title:"Hey!", hdin:"Hello World!",sub_hdin:"madhur"});
}); // demo.pug is my .pug file which I want to render as a result of this get request.



// yaha pe maine ye bataya ki agr koi mere app ke "/" directory pe GET request dega to given call back function chala dena
app.get("/",(req,res)=>{
    // res.send("This is my first server made using express. GET REQUEST"); Ab manlo status code bhi bhejna he
    res.status(200).send("This is my first server made using express. GET REQUEST");
})
app.get("/about",(req,res)=>{
    res.send("This is the about page of my first server made using express. GET REQUEST");
})
app.get("/contactus",(req,res)=>{
    res.send("This is the contact us page of my first server made using express. GET REQUEST");
})

// yaha pe maine ye bataya ki agr koi mere app ke "/" directory pe POST request dega to given call back function chala dena
app.post("/",(req,res)=>{
    res.send("This is the Home page of my first server made using express. POST REQUEST");
})
app.post("/about",(req,res)=>{
    res.status(404).send("404 Page not found. POST REQUEST");
})

// ye localhost (127.0.0.1) ke port 80 pe listen karna chalu karega.
app.listen(80,()=>{console.log("Server has started...........");})

// Note - GET, POST request ke callback function me jo manchahe wo karwa sakte he.
// Tip - using nodemon I don't have to reapeatedly stop/start the server to see the changes.