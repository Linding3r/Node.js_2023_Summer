//Use const whenever possible
const scheduledBreakTime = "11:00";
let consoleLogCounter = 0;

//Use comma in console log, so you won't deal with type coercion
console.log("Let's take a break:", scheduledBreakTime);
consoleLogCounter++;

//String , Number, Boolean, BigInterger, undefines, null, Object, Symbol
//Object: Object, Array, Date

//type coercion

//How to make Strings

//can have single quotes in it
console.log("This is the first '''''' way");

//can have double quotes in it
console.log('This is the second """""" way');

//can have both in it and have js expressions in it
console.log(`This is the third """" '''''''${2+1}.`); 

consoleLogCounter += 3;

console.log(consoleLogCounter);

