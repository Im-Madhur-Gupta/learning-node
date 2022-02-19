const http = require("http");
const fs = require("fs");
const fileContent = fs.readFileSync("./nodejs/readHTML.html","utf-8");

// Creating a server to display our HTML -
const server = http.createServer((req,res)=>{ 
    // req is request, res is response, (req,res) arguements are fixed for creating a server.
    
    res.writeHead(200,{"Content-type":"text/html"}); // is line me 200 is status code, content-type : text/html karne se maine ye bataya ki mai html doc ko write karna chahta hu.

    res.end(fileContent); // finally writting the file content
});

// Adding listener for server request -
server.listen(800,"127.0.0.1",()=>{
    // 800 is the port number and 127.0.0.1 is the IP on which I want to host my server, last arguement is a call back function which gets triggered upon a request.
    // 80 is the default port so I dont have to pecify with a :port_number.
    // 127.0.0.1 is the local host.
    console.log("Listening to the server request.");
});