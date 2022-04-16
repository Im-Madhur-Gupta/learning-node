const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='messagetext'><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // app_v1.js se ismai change ye hua he ki order of execution of code thik ho gaya he, remember ye event listners sare asynchronous hote he.
    // ab mai is event listner ke function ke andar res.end() return kar raha hu
    // to ye return event listner wale func ka he, lekin return to mujhe outer function karna he to maine req.on() ko hi return karwa diya.
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      // writeFileSync ko writeFile se replace kar dete he, taki agge ka code block na ho, writeFile 3rd arg leta he which is a callback function which is executed once the file writing is completed.
      fs.writeFile("./basics/first-node-server/message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // default response
  res.write("<html>");
  res.write("<head><title>Nodejs server</title></head>");
  res.write("<body><h1>Nodejs server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
