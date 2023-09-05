// loop methodes: They are all metods that help loop over a list
// forEch, map, filter, find, sort, reduce

// forEach iterates through a list where map iterates and returns a new list

//currying (functional programming) s the technique of translating the evaluation
//of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument
// Keep variables in a function and make sure we have no side effects aka no smelly code

const trolls = [
    { name: 'anonymous', trollLevel: 8 },
    { name: 'kroolleboolle', trollLevel: 22 },
    { name: 'Jonathan', trollLevel: 69 },
    { name: 'krolleline', trollLevel: 26 },
];

// task 1: add 5 troll level to all the trolls

// trolls.map((element, index, array) => console.log());

// When using map then you do not wish to use the previous list. In this case we will never use trolls again as we have manipulated
// it and made a new list called upgradedTrolls. trolls list is now garbage.

const upgradedTrolls = trolls.map(troll => {
    troll.trollLevel += 5;
    return troll;
});

// does the same thing as above but in a one liner
//const upgradedTrolls = trolls.map(troll => ((troll.trollLevel += 5), troll));

console.log(upgradedTrolls);

// here with another paranthases we can define that the thing we return in the map is an object and not a function
const doubleUpgradedTrolls = trolls.map(troll => ({
    name: troll.name,
    trollLevel: troll.trollLevel + 5,
}));

console.log(doubleUpgradedTrolls);

// task 2: Create a list of trolls where the troll level is an odd number

/*const oddNumberTrolls = doubleUpgradedTrolls.filter(troll => {
    if (troll.trollLevel % 2 !== 0) return troll;
});*/
// Oneliner instead of the one above. does the same
const oddNumberTrolls = doubleUpgradedTrolls.filter((troll) => troll.trollLevel % 2 !== 0);

console.log(oddNumberTrolls);
