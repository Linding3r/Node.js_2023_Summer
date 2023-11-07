import bcrypt from "bcrypt"

const saltRounds = 14;

const plainTextPassword = "hunter123";
const hashedPasswordOutput = "$2b$14$EadHBUPqmjardFXLB1N0eej2iH5gjpr3qMkEbNNzE20uAyMh1IbYO"

// const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds)

const compareResult = await bcrypt.compare(plainTextPassword, hashedPasswordOutput)

console.log(compareResult)