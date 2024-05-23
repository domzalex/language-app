const sqlite3 = require('sqlite3').verbose()
const path = require('path')

//Establish location of .db file
const dbPath = path.join(__dirname, 'database.db')

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
})

// db.run(`CREATE TABLE IF NOT EXISTS users (
//     id TEXT,
//     email TEXT,
//     username TEXT,
//     password TEXT,
//     name TEXT,
//     birthdate DATE,
//     country TEXT,
//     profilePicture TEXT,
//     bio TEXT,
//     nativeLanguage TEXT,
//     hobbies TEXT,
//     places TEXT,
//     learningLanguage TEXT,
//     langProf INTEGER,
//     isCompleted INTEGER
// )`, (err) => {
//     if (err) {
//         console.log("Error creating table: ", err.message)
//     } else {
//         console.log("Table 'users' created successfully.")
//     }
// })

db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id TEXT,
    recipient_id TEXT,
    message_text TEXT,
    attachment TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.log("Error creating table: ", err.message)
    } else {
        console.log("Table 'messages' created successfully.")
    }
})

// db.run('DROP TABLE IF EXISTS messages')