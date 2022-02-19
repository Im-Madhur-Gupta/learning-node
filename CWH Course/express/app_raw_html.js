// EXPRESS
const express = require("express");
const fs = require("fs");
const app = express();
app.use("/static",express.static("static"));
app.use(express.urlencoded()); // To take data from the HTML form that I created inside index.pug and bring it to express

// PUG
const path = require("path");
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));


// ENDPOINTS
app.get("/",(req,res)=>{
    const params = {"heading":"MAD","content":"Get this Membership Today"}
    res.status(200).render("index.pug",params)
    // Pug template (as we saw before) can be used to make a html template but you can also make html templates using plain HTML in pug.
});
app.post("/",(req,res)=>{
    // req.body ek js object he jo pura entered data store karke rakhta he.
    let form_data = req.body;
    console.log(form_data);
    // Now storing this entered data locally / on the server inside a simple txt file -
    fs.writeFileSync("stored_data/output.txt",`${form_data.name}, ${form_data.age}, ${form_data.gender}, ${form_data.about}, ${form_data.addrs}\n`);
    const params = {"heading":"MAD","content":"Get this Membership Today"}
    res.status(200).render("index.pug",params);
});

// START THE SERVER
app.listen(80,()=>{console.log("Server has started...........");})
