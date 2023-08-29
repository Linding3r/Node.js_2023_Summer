// hoisting, functions are ran at the start of running the rest of the file
//console.log(getRandomInt());

/*function getRandomInt(min, max){
    return 5;
}*/

//console.log(getRandomInt); // returns the function reference aka just the function name

//console.log(getRandomInt()); // returns 5, calls the function


function getRandomInt(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

const getRandomIntAnonymousFunction = function(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

const getRandomIntArrowFunction = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

const getRandomIntArrowFunctionWithoutReturn = (min, max) => 
    Math.floor(Math.random() * (max + 1 - min) + min);


// Callback is any reference to executable code that is passed as an argument to another piece of code;
// that code is expected to call back the callback function as part of its job


function genereicActionperformer(genericAction, name){
    // do things....
    return genericAction(name);

}

// Jump is a function
const jump = (name) => `${name} is jumping`;
// Desired result: Lasse is jumping

// jump is used as a callback function in this line
console.log(genereicActionperformer(jump, "Lasse"));


//const run = (name) => `${name} is running`;
// Desired result: "Jonathan is running"

/* const run = function (name) {
   return name + "is running";
}*/

function run(name){
    return `${name} is runnning`;
}

console.log(genereicActionperformer(run, "Jonathan"));

// Desired result: "Daniel is sleeping"
// Create a sleep callback and get the desired result
// in a single statement!!

console.log(genereicActionperformer((name) => `${name} is sleeping`, "Daniel"));