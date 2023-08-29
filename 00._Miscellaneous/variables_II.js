"use strict"; 

// strict mode, needs to be on the top of the file. 
// Makes sure you have a strict stucture of code like you can't use variable names as argument, public etc.

// totalGlobalVariable = "Never ever do this!!!";

// var is only used in legacy systems, try only and use const and let, var is a global variable.
var globalVariable = "Also Never ever do this!!!";

// const arguments = 123;

// cannot declare a const without a value
// const isThisConstant;

// cannot do this either;
// const isThisConstant = 123;
// isThisConstant = 456;

// can change objects and arrays but not 
const isThisConstant = [];
isThisConstant.push(1, 2, 3);
console.log(isThisConstant);

const anotherConstant = {};
anotherConstant.valueChange = true;
console.log(anotherConstant);

// let is in the same scope as const but you can redeclare it and declare it without instantiating it.




function anotherScope(){
    // function scope

}

{
    // Block scope
    console.log("Hello I am in a block scope");
}

{
    // why we don't use var
    var someVaribale = true;
    {
        var someVaribale = false;
    }
    console.log(someVaribale);
    // false
}

{
    let someVaribale = true;
    {
        let someVaribale = false;
    }
    console.log(someVaribale);
    // true
}

// will print out 6 times 6 after 1 sec
/*for (var index = 0; index <= 5; index++) {
    setTimeout(() => {
        console.log(index);
    }, 1000)
}*/

// will print 0 to 5 after 1 sec
/*for (let index = 0; index <= 5; index++) {
    setTimeout(() => {
        console.log(index);
    }, 1000)
}*/