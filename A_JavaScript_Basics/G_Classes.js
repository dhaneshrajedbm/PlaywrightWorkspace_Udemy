
class demo {

     a = 20;
     b= 30;

     constructor(firstname, lastname){

        this.firstname= firstname;
        this.lastname = lastname;
     }

     get location(){     // getter method

        return 'India';
     }

      fullname(){       
        console.log(this.firstname+this.lastname)
      }
      
}

// let obj = new demo("Dhanesh" , "Kumar");  // creating obj of class outside of class
// let obj2 = new demo("Tom" ,"Bell")
// console.log(obj.a);
// console.log(obj.location);
// console.log(obj.fullname());    // printing the Object of class
// console.log(obj2.fullname());


module .exports = {demo};       // To extend the class to access in another class
