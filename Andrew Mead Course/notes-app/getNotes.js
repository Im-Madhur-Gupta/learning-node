const { notes } = require("./notes/notes.json");

const getNotes = () => {
  return notes;
};

const printNotes = () => {
  for (let [index, note] of notes.entries()) {
    console.log("index -", index, "|", "note -", note);
  }
};

module.exports = { getNotes, printNotes };
