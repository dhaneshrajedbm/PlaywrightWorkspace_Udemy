// Functions is a block of code  executed when it is called. It can take input parameters and return a value. Functions are used to organize code into reusable blocks, making it easier to read and maintain.
// main obe is reuse of code, define code once and reuse it many times

function add(a,b){
    return a+b;
}

var sum = add(5,7);
console.log("Sum of 5 and 7 = "+sum);


//Anyonymes Function: A function without name

var mul = function (a,b){      // return value stored in variable
    return a*b;
}

var mul = (a,b) => a*b;        // Arrow function: A function with arrow syntax
console.log("Multiply nos= "+mul(5,10));