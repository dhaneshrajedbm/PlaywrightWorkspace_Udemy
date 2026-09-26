/*
# Basically TS is similar to JS just it contains some additional features
TS = JS + Additinal features
# In TS syntax there is  addition of type annotations of data  and some aaditional
features which enhance code quality, readability and maintainability .
# Js is run directly on node. for eg - node demo.js
# But Ts cannot be run on node directly. first we need to convert it to js and then run on node
   TS -> JS ->node
   demo.ts -> tsc.demo.ts -> demo.js   (tsc is ts compiler to convert ts to js)

# To install Ts run cmd ->  npm install --save-dev typescript


*/

// VArialble Declarations - In Ts its mandatory to define type of the property while variable declaration and intializatons
/*
JS dynamically understand the what type of info/data is assigned to variable and define the datatype automatically
for TS we nned to define type explicitly. 
In TS if we declare any variable with for.eg srting datatype then we cannot reassign it with 
another datype value. it showing error
but it can be pssible for JS
*/

let message: string = "Hello Typescript";   // TS
let message11 = "Hellow Javascript";         //Js

// message =90; //Type 'number' is not assignable to type 'string'.ts(2322)
message = "Hellow";
console.log(message);

let no : number= 70;
//no ="hellos"   // Type 'string' is not assignable to type 'number'.ts(2322)
console.log(no)

let arr : number[] = [1,2,3,4];    // TS Array declaration
let arr11          = [1,2,3,4]     // JS

// If we define variable with "any" then we can reassign with any type of data
let data : any = "Any Type of Data";
data = 70;

console.log(data);

//npx tsc A_BasicDiff_JSAndTS.ts   -> to convert TS to JS file
// node A_BasicDiff_JSAndTS.js     -> run converted js file

//function 

function add(a:number,b:number) : number    //TS :  function declared with dattype and return type
{
   return a+b;
}
add(6,7);
//add(9,"abc");// Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)

//js
function add11(b,c)   // JS
{
   return b+c;
}
add11(9,8);
add11(6,"abc") // 6abc


//object 

let obj : {name:String , lastname:String, age:number} = {name:"Dhanesh",lastname:"Machale" , age:30}

//obj.location="pune";    //Property 'location' does not exist on type '{ name: String; lastname: String; age: number; }'.ts(2339)

// let obj : {name:"Dhanesh" ,lastname:"Machale"};    //JS
// obj.location = "Pune";
