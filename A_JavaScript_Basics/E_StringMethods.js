// String : is a used to store the collection of characters

let str = "Hellow JAvascript ";

//1. .lenghth : returns the length of string
console.log("Length of string is = "+str.length);

// .trim() : remove the white spaces from start and end of string
console.log("String after trimming = "+str.trim());

//3 .slice() : Returns the substring
console.log("Substring = "+str.slice(0,6));

// split() : split the string into diff parts and return the string array
let str1 = "Hellow JAvascript World";
let str2 = str1.split(" ");
console.log("String after Split= "+str2);

// .parseInt() : convert string into integer
let date1 = '30'
let date2 = '20'
console.log("Sum of strings before parseInt ="+date1+date2); //3020

let datesum = parseInt(date1) + parseInt(date2);
console.log("Sum of parseInt date1 and date2 = "+datesum);  //50

// .toString() : convert Integer into string
console.log("Sum of date1 and date2 as string = "+datesum.toString());


var s = "today is friday and tomorrow is saturday and day after it sunday";

var count = s.split("day").length-1;
console.log("Number of 'day' occurrences = "+count);



