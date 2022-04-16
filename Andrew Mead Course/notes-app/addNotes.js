const fs = require("fs");
const path = require("path");
const validator = require("validator");
const { notes } = require("./notes/notes.json");

const addNote = (note) => {
  if (validator.isEmail(note)) {
    console.log("given note is an email");
  }
  notes.push(note);
  const filePath = path.join(
    path.dirname(require.main.filename),
    "notes",
    "notes.json"
  );
  fs.writeFileSync(filePath, JSON.stringify({ notes: notes }));
};

module.exports = addNote;
