const path = require("path");

const rootDir = path.dirname(require.main.filename);
// app.js mai jo module maine create kiya tha -> basically the entry point of my node application -> usse refer karne ke liye require.main use karte he aur iske .filename se entry point ka file name mil jata he.
// Ofc. path.dirname() usko directory name mai convert kar dega.
// Note - process.mainModule is deprecated uski jagah require.main use karte he. 

module.exports = rootDir;
