import db from "./connection.js"

//await db.albums.updateOne({title: "The Wall"}, {$set: {score: 10}});
await db.albums.updateMany({}, {$set: {label: "EMI"}});