console.log("This is module.js");
function average(arr){
    let sum = 0;
    for(let element of arr){
        sum += element;
    }
    return sum/arr.length;
}
function sum(arr){
    let sum = 0;
    for(let element of arr){
        sum += element;
    }
    return sum;
}

// Ab mai inn functions ko index.js me use karna chahta hu to mujhe inhe export karna padega
module.exports.average1 = average;
// jaha par bhi mai module.js ko require() karunga waha average function ab average1 ke name se milega.
module.exports.sum = sum;
// Note - module.exports.___ likhne ki jagah exports.___ bhi likh sakte he, there is a difference between them but for now we can ignore it. 

// IMPORTANT - module.exports is the object that's actually returned as the result of a require call.

// I can export a simple variable as well -
module.exports.tempvar1 = "This is an exported temporary variable.";
module.exports.tempvar2 = 1;
module.exports.tempvar3 = [1,2,3,4];
module.exports.tempvar4 = {1:"v1",2:"v2"};

// basically upar wale sare module.exports.____ me mai require() call pe return hone wale object ke keys/values ko define kar raha hu. ex - module.exports.key = value;

// A simpler/better way to export multiple functions/objects etc - go to module2.js