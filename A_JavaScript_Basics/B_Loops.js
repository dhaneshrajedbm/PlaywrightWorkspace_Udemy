const flag = true;

if(flag){
    console.log("Condition is satisfied")
}
else{
    console.log("Condition is not satisfied");
}

console.log("Reversing value of flag variable using not operator");

if(!flag){       // here Reversing the value of flag to false but still flag variable holds value as true
    console.log("Condition is satisfied")
}
else{
    console.log("Condition is not satisfied");
}

console.log("********************************************");




//Print the nos which are multiple of 2 and 5

for(let i=1; i<=100; i++){

    if(i%2 ==0  && i%5 ==0){
        console.log(i);
    }
}

// print only 5 value

//Print the nos which are multiple of 2 and 5

let n=0;
for(let j=1; j<=100; j++){

    
    if(j%2 ==0  && j%5 ==0){
        console.log(j);
        n++;
    }
    if(n==3){
        break;
    }
}