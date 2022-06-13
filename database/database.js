var sqlite3 = require('sqlite3').verbose()
// const getHashedPassword = require("./auth.js").getHashedPassword

const DBSOURCE = "./database/db.sqlite"


const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE, 
            password text, 
            CONSTRAINT username_unique UNIQUE (username)
            )`, (err) => {console.log("Error creating table users: " + err)});
    }
});

module.exports = db