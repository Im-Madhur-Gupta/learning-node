const http = require("http");

// do note that this is the old way of importing, bcz new way doesnt work in node.
const routes = require("./routes");

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);
