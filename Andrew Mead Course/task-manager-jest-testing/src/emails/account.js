const sgMail = require("@sendgrid/mail");

const sendGridAPIKey = process.env.SEND_GRID_API_KEY;

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "madhurgupta107@gmail.com",
    subject: "Welcome to task manager app",
    text: `Hope you have a great time using the task manager app, ${name}.`,
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "madhurgupta107@gmail.com",
    subject: "Sad seeing you go",
    text: `Bye bye, ${name}.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};
