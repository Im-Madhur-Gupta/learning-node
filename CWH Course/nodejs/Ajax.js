// AJAX - Asynchronous Javascript and XML
// But we don't use XML anymore we use JSON (JavaScript Object Notation).
// API - Aplication Programming Interface - Somewhere to request data from.

// Ajax se mai bina webpage refresh kare new content server se bula sakta hu.

const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const dog_img = document.querySelector("img");

const promise = fetch(DOG_URL); // fetch request mari maine api pe, fetch request is async so it will return a promise.

// .then() - Ye "promise" jab fulfil ho jae to ye piece of code run karo.
promise.then((response)=>{
    const json = response.json(); // ye bhi async command he to iske liye ek aur .then() lagaya
    return json;
}).then((json)=>{
    console.log(json);
    dog_img.src = json.message;
    dog_img.alt = "Dog";
});

console.log("I'll run 1st."); // kyoki upar ka async code he to ye wala log pehle chl jaega aur phir jab upar ka promise resolve hoga to phir upar ka chalega.