console.log("This is index.js");

// importing average function as module from module.js
const mod = require("./module");
console.log(mod.average1([1,2,3]));
console.log(mod.sum([1,2,3]));
console.log(mod.tempvar1);
console.log(mod.tempvar2);
console.log(mod.tempvar3);
console.log(mod.tempvar4);

const mod1 = require("./module1");
console.log("\n\n"+mod1.average2([1,2,3]));
console.log(mod1.sum2([1,2,3]));
console.log(mod1.var1);
console.log(mod1.var2);
console.log(mod1.var3);
console.log(mod1.var4);
