// Array ke through iterate karne ke liye - 
// 1. normal for, while, do-while loops
// 2. forEach, for-of loops

// JS Object ke through iterate karne ke liye we use for-in loop.

// ---------------------------------------------------------------------

// Array is a reference type
// To arr vale variable mai ek refernce/address store hua he mem location ka
const arr = [1,2,3,4];
// Aisa karne se "arr" wale mem location ka address change ni kara he balki uss memory location pe jo data he wo change hua he.
arr.push(5);
// Isliye arr is a const as the address of mem location didn't change.