/*
    JS is single-threaded (runs on a main thread)

    Asynchronous code is needen
    Over a network
    Buffers, Ex. Email (SMTP)
    Database
    CRON jobs
    Filesystem (files, folders)
    User input (mouse, keyboard, event handlers)

    Asynchronous code:

    Solution 1: Callback
    Cons: Callback hell

    Solution 2: Promises 
    States:
     - Pending
     - Fulfilled
        - Resolved
        - Rejected
    Cons: More chars, less readable, nesting leads to pyramid of doom

    Solution 3: Async/Await
    Syntactic sugar
    

*/

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('Promis worked out');
//         reject("Promise didn't work out.");
//     }, 3000);
// })
//     .then(succesMessage => console.log(succesMessage))
//     .catch(errorMessage => console.log(errorMessage));

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         try {
//             resolve('Promis worked out');
//         } catch {
//             reject("Promise didn't work out.");
//         }
//     }, 3000);
// })
//     .then(succesMessage => console.log(succesMessage))
//     .catch(errorMessage => console.log(errorMessage));

/* Task: Create a promisifed function that is, a function that returns a new promise
it should be called myPromise and it should either resolve as "Something Good"
or reject as "Something Bad" create a 2 second timeout to simulate asynchonous behaviour */

function myPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                throw 'Something Bad';
                resolve('Something Good');
            } catch (errorMessage) {
                reject(errorMessage);
            }
        }, 2000);
    });
}

myPromise()
    .then(message => console.log(message))
    .catch(message => console.log('Error Message:', message));

/* task: create a myFetch function that takes a certain amount of time it should return some response, be creative */

function myFetch(URL, options = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                json: () => new Promise((resolve, reject) => resolve({ data: 'Response' })),
            });
        }, 2000);
    });
}

// myFetch('URL')
//     .then(response => response.json())
//     .then(result => console.log(result));

// const response = await myFetch();
// const result = await response.json();

async function main() {
    const response = await myFetch();
    const result = await response.json();
    console.log(result);
}

// main();

//IIFE - immediately invoked function expression
(async function callMyPromise() {
    try {
        const result = await myPromise();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();

// callMyPromise();


async function handleAllPromises(){
    const results = await Promise.all([myFetch, myPromise]);
    console.log(results);
}

handleAllPromises();