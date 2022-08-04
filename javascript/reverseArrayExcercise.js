/**
 * Coding excercise from "Eloquent Javascript" book.
 * Take an array and reverse it, even though javascript really does have
 * a "reverse" method for arrays -
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
 * Hence the code below is just for practice (reinvents the wheel eh?)
 * ReverseArrayInPlace shows that array type stays same, 
 * but an object passed by reference can be modified "in place".
 * https://flexiple.com/javascript-pass-by-reference-or-value/
 */ 
function reverseArray(arr) {
  let iterations  = (arr.length - 1);
  let rev_arr     = [];
  for (i = iterations; i >= 0; i--) {
    rev_arr.push(arr[i]);
  }
  return rev_arr;
}

function reverseArrayInPlace(arrObj) {
  arrObj.arr = reverseArray(arrObj.arr);
}

let myArr2 = { arr: [89, 90, 91] };
console.log("before reversal");
console.log(myArr2.arr);

reverseArrayInPlace(myArr2);
console.log("after reversal");
console.log(myArr2.arr);
