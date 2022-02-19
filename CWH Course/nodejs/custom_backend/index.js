const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 80;
const home = fs.readFileSync("./nodejs/custom_backend/home.html","utf-8");
const about = fs.readFileSync("./nodejs/custom_backend/about.html","utf-8");
const services = fs.readFileSync("./nodejs/custom_backend/services.html","utf-8");
const contact = fs.readFileSync("./nodejs/custom_backend/contact.html","utf-8");
const error = fs.readFileSync("./nodejs/custom_backend/error.html","utf-8");

const server = http.createServer((req,res)=>{
    console.log(req.url);
    // IMP - req.url basically ye batata he ki user ne kya type/hit kiya address bar me hostname:port ke baad.

    res.statusCode = 200;
    res.setHeader("Content-type","text/html");
    // For now setHeader() is similar to writeHead(), there is a syntax difference between them and writeHead() also takes statusCode as an arguement as well but content type wali cheez to dono me atti he.  
    if(req.url=="/"){
        res.end(home);
    }
    else if(req.url=="/about"){
        res.end(about)
    }
    else if(req.url=="/services"){
        res.end(services);
    }
    else if(req.url=="/contact"){
        res.end(contact);
    }
    else{
        res.statusCode = 404;
        res.end(error);
    }
});

server.listen(port,hostname,()=>{
    console.log(`Server started at http://${hostname}:${port}/`);
});