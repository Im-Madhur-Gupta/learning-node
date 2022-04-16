const fs = require("fs");

const requestHandler = (req, res) => {
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

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[0];
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
};

// export default requestHandler; ye naya wala tareeka export karne ka node mai ni chalta, same for new way to import.

// old way of exporting -
// module.exports ko jo bhi doge ek particular file mai wo sara kuch import ke time pe waise ka waisa mill jaega.

// module.exports = requestHandler;

// OR

// multiple cheeze export karne ke liye -
module.exports = {
  handler: requestHandler,
  someText: "some text",
};
