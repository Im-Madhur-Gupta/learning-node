// Step 1 - Import module filesystem "fs"
const fs = require("fs");
// Step 2 - Reading the file
let text = fs.readFileSync("./nodejs/read.txt","utf-8");
console.log(text);

// IMP - upar wali directory me ./ ke bad nodejs fir txt file ka name dalna pada kyoki ./ wo wali directory kholta he jaha maine terminal me jakar node script_name.js; wala command dalke run karwaya tha, aur ye terminal ka command VS code ne Web-Development wala folder me khola tha to mujhe ./ ko batana pada ki Web-Developemnt wale me ni he uske andar nodejs folder me jao waha he.

// readFileSync() will read our file synchronously, readFile() asynchronously read karta he.

text = text.concat("\n\t\t\t\t\t\t-Lucifer");
// I have changed the text variable not read.txt.

// Now writing our text variable to a new file write.txt synchronously
fs.writeFileSync("./nodejs/write.txt",text); //  agr file ni hogi to usse create kar dega
