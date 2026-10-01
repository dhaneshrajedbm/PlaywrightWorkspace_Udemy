// InHeritance : It's a Imp oop's principle in which one class aquires the properties of anther class by extend keyword

const {demo} = require ('./G_Classes') // import the class demo

class child extends demo{      

    constructor(firstname,lastname){

       super(firstname,lastname);                    // calling parent class constructor
    }

    // get location(){
    //     return 'France'   
    // }

}

const childObj = new child('sam' ,'sung');
childObj.fullname();   // calling the method from parent class
console.log(childObj.location);   // child and parent have same method then prefferance will be for child class

console.log(childObj.a)
console.log(childObj.b)
