import db from "./connection.js"

const allAlbums = await db.albums.find().toArray();

const favoriteAlbuym = await db.albums.find({title: "The Wall"}).toArray();

console.log(allAlbums);