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

// IMPORTANT - module.exports is the object that's actually returned as the result of a require call.
module.exports = {
    average2:average,
    sum2:sum,
    var1:1,
    var2:[1,2,3,4],
    var3:{k2:"v2"},
    var4:"temp"
};