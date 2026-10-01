/*************Variable  and its declaration *****************

Run Code by cmd -----> node A_JavaScript_Basics\JSBasics.js

# In JS no need to declare the datatype 
# use let , var const keyword to variable declaration\
#  we cannot redeclare variable with let but we can reassign the value 
# With Var keyword its Possible to reassign and Redeclare variable
# With const keyword we cannot reassign and redeclare the variable 

Types of variable in JS
1.Number
2. String
3. Boolean
4. Null
5. Undefined
6. Object
7. Symbol

*/
let a =10;     
let s='HEllow Javascript'
let b= 46.987;        // decimals also trated as number data type
let bool = true;
console.log(a, ":" + typeof(a))
console.log(s ,":"+ typeof(s))

console.log(b , ":"+ typeof(b))

console.log(bool ,":"+ typeof(bool)) //true
console.log(!bool)                  // ! sign act as not operator and it will reverse the value of boolean variable

let c=67;

//let c= a+b; ---> its not work beacause we cannot redeclare variable with let keyword but Possible with var keyword
c=a+b;        // Reassign wil be possible

 var v=a+b;
 var v=a+b;  // redeclare is possible with var keyword

console.log(v, ":" + typeof(v));
