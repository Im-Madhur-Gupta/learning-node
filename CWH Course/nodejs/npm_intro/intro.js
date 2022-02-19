console.log("This is a intro file of npm.");

// mai npm init command se kisi project (.js files wali directory) ka ek package (.json file) bana sakta hu, here, the name of the package is package.json.

// ab agar mai is directory me node ke koi aur packages ko "node install ___" command se install karta hu to wo is .js file ke corresponding .json me as dependencies dikhne lagega. Aur in dependencies ke corresponding jo modules chahiye wo node_modules ke andar store hote jaenge. By chance node_modules wala folder delete ho gaya to mai issi directory me akar sirf npm install run karunga to node_modules firse ban jaega.

// Kisi package ka koi specific version dalne/install karne ke liye package_name@version
// any package's version number is - major.minor.batch
// major is for major release
// minor for certain features added
// batch is for bug fixes

// Ab mera package jin packages pe depend kar raha he ho sakta he wo khud age kinhi packages pe depend kar rahe ho. To locally mai sari fiels store karunga including dependencies ki dependencies.

// Dev Dependencies - ie the packages we require only during development and not during production. Ex - nodemon (server ko apne app restart karne ki functionality deta he jab bhi usse changes mile to)
// can be installed npm install _____ --save-dev

// Important - To install a package globally - npm install _____ --global

// Tip - pura npm install ____ lihne ki jagah npm i ____ bhi likh sakte he.

// "dependencies": {
//     "slugify": "^1.6.0"
//   }
// ^ --> means exactly yahi version chahiye
// ~ --> iske agge ka koi minor update bhi chalega, ~1.2.0 means 1.3.0, 1.2.1 will work but 2.0.0 wont
// > --> means major update bhi jo latest ho wo chalega. 