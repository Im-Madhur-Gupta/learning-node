const { printNotes } = require("./getNotes");
const addNote = require("./addNotes");

const newNote = process.argv[2] ? process.argv[2] : "default";

addNote(newNote);
addNote("madleads2001@gmail.com");
printNotes();
