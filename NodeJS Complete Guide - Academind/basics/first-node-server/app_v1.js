const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    // form element ka action attribute specifies the endpoint we want to hit with the forms data
    // method mai ye batata ki konse HTTP method ka use karna he iss data ko bhejne ke liye.
    // input field ke "name" attribute ko jo value dete he wo form ki bheji hui post request ke data mai ussi name se accessible hota he.
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='messagetext'><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
    // ab sirf res.end() karne se ni chalega mujhe return bhi karna padega function ko taki agge ka code execute na ho. Bcz agr ye if statement aya he to mai iske agge ni jana chahta.
  }

  if (url === "/message" && method === "POST") {
    const body = []; // to store my data

    // on() method se event listner banta he req object pe.

    // abhi jo event listner banaya he wo "data" ke corresponding he.
    // jab req ke data ka ek "chunk" milega to ye event listner fire ho jaega.
    req.on("data", (chunk) => {
      // ye event listner function recieves a chunk of data as argument.
      console.log(chunk);
      body.push(chunk); // storing my chunk in a array
    });

    // ek event listner aur banana he
    // jo us event ("end" event) ko listen karega jab mai incoming data/body ke sare chunks recieve kar chuka hu.
    req.on("end", () => {
      // ab mere pass sare chunks aa chuke he
      // ab mai un sare chunks ko combine karke string mai convert kar dunga
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("./basics/first-node-server/message.txt", message);
    });

    // now setting up the response -
    res.statusCode = 302;
    res.setHeader("Location", "/"); // used to redirect the user once it recieves the response. So, location "/" kardena.
    return res.end();
  }

  res.write("<html>");
  res.write("<head><title>Nodejs server</title></head>");
  res.write("<body><h1>Nodejs server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
