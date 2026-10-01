// Object : It is a collection of properties, where each property is stored in  key-value pair. 
// Objects are used to store and organize data in JavaScript. 
// They can contain various data types, including numbers, strings, arrays, and even other objects.

let obj = {

    name : 'Dhanesh',
    Lastname: "Kumar",

    fullname : function(){        //defining function inside object

        console.log(this.name+this.Lastname);
    }
}
console.log(obj.name);
obj.age = 30;   // Adding new property to object
console.log(obj)

console.log(obj.fullname());  // calling function



obj.gender = 'male';
obj.city = "Pune";
console.log(obj);

delete obj.age;   // DElete the propertyof object
console.log(obj);

// print the values of obj
for(let values in obj){
    console.log(obj[values]);
}


