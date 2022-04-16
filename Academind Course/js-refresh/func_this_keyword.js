// Arrow Function ka "this" waha se atta he jaha pe arrow function defined hota he.
// Normal function ka "this" waha se atta he jaha pe iss function ko call kiya tha.

const person = {
  name: "Madhur",
  age: 21,

  // yaha pe jo "this" refer hoga wo "globalThis" hoga.
  // NOT what we want.
  greet1: () => {
    console.log("this of greet1", this);
  },

  // yaha pe jo "this" refer hoga wo func. call ki jagah se ayega
  // iss hisab se "person" object hoga
  // what we want but NOT the best syntax.
  greet2: function () {
    console.log("this of greet2", this);
  },

  // yaha pe jo "this" refer hoga wo seedha "person" hoga
  // what we want AND the best syntax.
  // yahi follow karenge jab bhi object ke andar function dalne ho.
  greet3() {
    console.log("this of greet3", this);
  },
};

person.greet1();
person.greet2();
person.greet3();

// Somethings about globalThis and the global object -
// "globalThis" basically refers to the global object, ab ye global object kya hoga wo depend karta he ki app kaha JS code run kar wa rahe ho, ex - Node mai, browser mai.
// "A global object is an object that always exists in the global scope."
// https://developer.mozilla.org/en-US/docs/Glossary/Global_object
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
