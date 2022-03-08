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
  // req is an object genereated by Node corresponding to the incoming request it recieves.
  // headers are metadata attached to respsonse or request.
  // following are some imp. keys of the req object -
  // console.log(req.url, req.method, req.headers);

  // -----------------------------------------------------------------

  // res object ko mai fill karta hu with the data I want to send as a respsonse to a request -

  // setting header of response -
  res.setHeader("Content-Type", "text/html"); // content jo response me milega wo html page hoga

  // content type html diya he to ab html content response mai "write" karta hu -
  // basically jo html page mai bhejunga wo likh raha hu res object mai
  // below is the noob way -
  // line by line html code likha using write() method.
  res.write("<html>");
  res.write("<head><title>Nodejs server</title></head>");
  res.write("<body><h1>Nodejs server</h1></body>");
  res.write("</html>");

  // node ko ye batane ke liye ki maine response pura complete kar diya he and wo ab response ko send kar sakta he, mai end() method use karta hu -
  res.end();
});

// adding a listner to a server
// listen(port, hostname)
// default value of port is 80
// default value of hostname is localhost
server.listen(3000);
