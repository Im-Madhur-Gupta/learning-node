// Node mai modules import karne ke liye "require" keyword use karte he.
// Node mai "import" keyword wala syntax doesn't work.

const http = require("http");
// local module import karne ke liye require ko path dete he - "./_____" or "/______"
// global modules ko import karne ke liye require ko seedha unka name de dete he.

// creating a request listner func. that will execute for all the incoming requests on a server/
// request listner func 2 args leta he request, response
function reqListner(req, res) {}

// creating a server
// http.createServer(reqListner)
// OR
// http.createServer(function (req, res) {});
// OR
const server = http.createServer((req, res) => {
  console.log(req);
});

// adding a listner to a server
// listen(port, hostname)
// default value of port is 80
// default value of hostname is localhost
server.listen(3000);
