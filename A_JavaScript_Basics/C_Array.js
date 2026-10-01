// Array : is Data structure which can store the multiple elemnts in single variables

//  Array  Declaration:

// Cannot re intialise/reassign value if declared with let const keyword

let arr = new Array(7); // here we are creating an array of size 7

var arr1 = new Array(20,30,40,50);

var array = [20,30,40,50]; // Declaration & Initialization in single variable of array using array literal
console.log(array);

array[2] = 80;  ;        // rainitialisation
console.log(array);      //[ 20, 30, 80, 50 ]
console.log(array[3]);   // 50

// Array Methods

//1. .length : returns the length of array
console.log("Length of array is = "+array.length)

//2. .push() : Adds the elements at the end
array.push(60);
console.log("Array after Push Opn=   "+array);      //[ 20, 30, 80, 50, 60 ]

//3. .pop() : Removes the last element from array
array.pop();
console.log("Array after Pop Opn=   "+array);      //[ 20, 30, 80, 50 ]

//4. .unshift() : adds the element at the start
array.unshift(77);
console.log("Array after unshift Opn=   "+array);      //[ 77, 20, 30, 80, 50 ]

//5. shift() : removes the first element of aarray
array.shift();
console.log("Array after shift Opn=   "+array);      //[ 20, 30, 80, 50 ]

//.indexOf() : returns the index of array elemnt
console.log("Index of 50 is = "+array.indexOf(50));           // 3

//6. .includes() : checks the specified elment present in array or not. returns true/false
console.log("100 is present in array = "+array.includes(100));  // false
console.log("80 is present in array = "+array.includes(80));    // true

//7. .slice() : divides the array into subarray and returns the new array
var ar = [1,2,3,4,5,6,7,8,9];
ar.slice(3,7);  // starting index included a ending index exclyded
console.log("Array after slice opn = "+ar.slice(3,7));      // [ 4, 5, 6, 7 ]

// 8. .splice() : removes the specified elments from array and returns new array
var ar1 = [1,2,3,4,5,6,7,8,9];
console.log("Array after splice opn = "+ ar1.splice(0,3)); 

//9. .sort() : sort the elments of array in ascending order
var ar2 = [1,5,3,4,2,6,9,8,7];
console.log("Array after sort opn = "+ ar2.sort());  // [1,2,3,4,5,6,7,8,9]

//10  .reverse() : reverse the elments of array
var ar3 = [1,5,3,4,2,6,9,8,7];
console.log(ar3.reverse());

//11  .join() : joins the elments of array and returns string
var ar4 = [1,5,3,4,2,6,9,8,7];
console.log("Array after join opn = "+ ar4.join(''));

//12. .concat() : joins the two array and returns new array
var ar5 = [5,6,7];
var ar6 = [8,9,10];
console.log(ar5.concat(ar6));

//13 .fill() : fills the array with specified value
var ar7 = [1,2,3,4,5];
console.log("Array after fill opn = "+ar7.fill(0));  // [0,0,0,0,0]

//14 .reverse() : reverses the array
var ar8 = [1,2,3,4,5];
console.log("Array after reverse opn = "+ar8.reverse());

// Print array using for loop
var ar9 = [10,20,30,40,50];
for(let i=0;i<ar9.length;i++){
    console.log(ar9[i])
}

// sum of Elment of array
var sum =0;
for(let i=0;i<ar9.length;i++){

    sum = sum +ar9[i];
}
console.log("Sum of Array Elements = "+sum);

// Sum of array using reduce Function
//Reduce: 

let SumOfElements = ar9.reduce((sum , currentValue) => sum+currentValue,0);
console.log("Sum of Array Elements (using reduce) = "+SumOfElements);


// Find Even values from arry an store in new array and print the new array

var arr10 = [11,23,13,14,15,16,17,18,19,20];
var evenValues =[];
console .log("Even values from arry an store in new array")
for(let i=0; i<arr10.length;i++){
    if(arr10[i] % 2 ==0){
       
       evenValues.push(arr10[i])
        
    }
}
console.log(evenValues);

// Filter Function - fiter the array and return new array on the basis of specified condition

//// Find Evn values using filter Function
console.log("Even values from array (using filter method): ")
let evenvalues = arr10.filter(value => value%2 ==0);
console.log(evenvalues);

//Map function: used to perform open on each element of array and returns new array
console.log("Array after map function = ")
let mapArray = evenvalues.map(value => value*3);
console.log(mapArray);  // [ 42, 48, 54, 60 ]

// sum using reduce function
console.log("Sum of Array Elements (using reduce)= ");
 var sum = mapArray.reduce((sum , currentValue) => sum+currentValue , 0);
console.log(sum);

// Find Even value from array multiply them by 3 and sum them

console.log("Sum of Even values multiplied by 3 = " );
var  arr11 = [11,23,13,14,15,16,17,18,19,20];
let sumOfEvenMultiplied = arr11.filter(value => value%2 ==0)
.map(value=> value*3).reduce((sum,initialValue) =>sum+initialValue,0);

console.log("Sum of Even values multiplied by 3 = " + sumOfEvenMultiplied);

// Array element sorting
console.log("Bubble sorting of array elements = ")
var ar12 = [15,33,004,28,22,11];   // 11,15,22,28,33,4  - herr its failing so use buble sorting
console.log("Array after sorting = " + ar12.sort());

ar12.sort((a,b) => a-b);  // Ascending order
console.log("Array after Bubble sorting = " + ar12);  // [1,2,3,4,5,8]

ar12.sort((a,b) => b-a) // sorting in descending order
console.log("Array after Bubblesorting in descending order = " + ar12);  // [8,5,4,3,2,1] 