// Async code ko handle karne ke 3 ways he -
// 1. callbacks
// 2. promise handling .then() .catch()
// 3. async-await

// **************************************************************

// Code using nested callbacks -
// const fetchData = (callback) => {
//   setTimeout(() => {
//     callback("Inner Function");
//   }, 1500);
// };
// setTimeout(() => {
//   console.log("Outer Function");
//   fetchData((text) => {
//     console.log(text);
//   });
// }, 2000);

// console.log("bahar");

// Same code as above but using promises -
const fetchData = () => {
  // Here I am creating a promise
  // this is something that we don't do while writing production JS
  // As the packages we use already make promises for us that we just have to handle.
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Inner Function");
    }, 1500);
  });
  // then I return this promise
  return promise;
};
setTimeout(() => {
  console.log("Outer Function");
  // pehle maine promise returning function ko call kiya
  // phir uss promise ko handle kiya using .then()
  // The then() method takes UP TO 2 arguments: callback functions for the success (resolve func) and failure (reject func) cases of the Promise.
  // then() method returns a Promise.
  // Agr then() ko sirf ek arg doge to simply wo resolve wala function ho jaega. 
  fetchData().then((text) => {
    console.log(text);
  });
}, 2000);

console.log("bahar");
