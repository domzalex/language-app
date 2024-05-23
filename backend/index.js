const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const env = require('dotenv')
env.config()
const multer = require('multer')
const sharp = require('sharp')
const sqlite3 = require('sqlite3').verbose()
const deepl = require("deepl-node")
const { v4: uuidv4 } = require('uuid')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3000
const authKey = process.env.DEEPL_API_KEY
const jwtSecretKey = process.env.SECURE_KEY
const translator = new deepl.Translator(authKey) 

// Middleware
app.use(cors())
app.use('/profilePictures', express.static(path.join(__dirname, 'profilePictures')))
app.use('/messageAttachments', express.static(path.join(__dirname, 'messageAttachments')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const conditionalUpload = (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
        upload.single('attachment')(req, res, next);
    } else {
        next();
    }
}


// Routes
app.get('/', (req, res) => {
    //
})
app.post('/', async (req, res) => {
    const { textToTranslate, targetLanguage } = req.body
    const translatedText = await DeepLTranslator(textToTranslate, targetLanguage)
    res.json(translatedText.text)
})
app.post('/create_user_profile', async (req, res) => {

    try {
        //Extracts contents of fetch request into variables
        let { email, username, password, birthdate, nativeLanguage } = req.body;

        //Hashes password for MAXIMUM SECURITY (I hope)
        password = await hashPassword(password)

        //Created userID for DB
        const id = uuidv4()
        req.body.id = id

        //Generates JWT for user session token
        const token = jwt.sign({
                          exp: Math.floor(Date.now() / 1000) + (60 * 60)
                      }, jwtSecretKey);

        //For adding new user to DB. **ADD CHECK FOR IF USER ALREADY EXISTS**
        const query = 'INSERT INTO users (id, email, username, password, birthdate, nativeLanguage) VALUES (?, ?, ?, ?, ?, ?)'
        db.run(query, [id, email, username, password, birthdate, nativeLanguage], function(err) {
            if (err) {
                console.error('Database error: ', err)
                return res.status(500).json({ error: 'Internal server error.' })
            }

        })
        let user
        let userMessages

        user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                if (err) {
                    console.error('Database error: ', err)
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
        userMessages = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM messages WHERE sender_id = ? OR recipient_id = ?", [id, id], (err, data) => {
                if (err) {
                    console.error('Database error: ', err)
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

        res.json({ message: 'User registered successfully.', user: user, token: token, userMessages: userMessages });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error...'})
    }

})
app.post('/login', async (req, res) => {
    try {

        //Extracts contents of fetch request into variables
        const username = req.body.user
        let password = req.body.pass

        //Runs DB function to check if user exists by username, returns user info or null
        const usern = await checkForUser(username)

        //If user exists, check for password match and then hash password and DO MORE
        if (usern) {
            //Checks for password match
            const userMatch = await verifyPassword(usern.password, password)
            
            if (userMatch) {

                //Hashes password for MAXIMUM SECURITY (I hope)
                password = await hashPassword(password)

                id = usern.id

                //Generates JWT for user session token
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                }, jwtSecretKey);

                let user
                let userMessages

                user = await new Promise((resolve, reject) => {
                    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                        if (err) {
                            console.error('Database error: ', err)
                            reject(err)
                        } else {
                            resolve(row)
                        }
                    })
                })
                userMessages = await new Promise((resolve, reject) => {
                    db.all("SELECT * FROM messages WHERE (sender_id = ? OR recipient_id = ?) AND sender_id IS NOT NULL AND recipient_id IS NOT NULL", [id, id], (err, data) => {
                        if (err) {
                            console.error('Database error: ', err)
                            reject(err)
                        } else {
                            console.log("Result of get user Messages: ", data)
                            resolve(data)
                        }
                    })
                })

                //Sends userToken as response for the login
                res.json({ message: 'User registered successfully.', token: token, user: user, userMessages: userMessages })
            } else {
                //Implement modal/UI notif for if passwords don't match
                res.json({ message: "Passwords don't match" })
            }

        } else {
            //Implement modal/client notif for if the user is not found
            res.json({ message: "User not found" })
        }
    } catch (error) {
        console.error("Error logging in from DB: ", error.message)
    }
})

app.put('/edit_profile', upload.single('profilePicture'), async (req, res) => {
    try {
        let filename
        // Compress and save the image if it exists
        if (req.file) {
            filename = `${Date.now()}_${req.file.originalname}`
            newProfilePicPath = path.join('profilePictures/', filename)

            try {
            await sharp(req.file.buffer)
                .resize(300, 300)
                .jpeg({ quality: 80 })
                .toFile(newProfilePicPath)
            } catch (error) {
            return res.status(500).send({ message: 'Failed to process the image' })
            }
        }
        const userData = JSON.parse(req.body.userData)

        let query = 'UPDATE users SET name = ?, country = ?, bio = ?, learningLanguage = ?, langProf = ?, profilePicture = ?, hobbies = ?, places = ?, isCompleted = ? WHERE id = ?'

        db.run(query, [userData.name, userData.country, userData.bio, userData.learningLanguage, userData.langProf, filename, JSON.stringify(userData.hobbies), JSON.stringify(userData.places), 1, userData.id], (error) => {
            if (error) {
                return console.error("Error updating user profile: ", error.message)
            }
            console.log("User: ", userData.id, " profile has been updated.")
            db.get('SELECT * FROM users WHERE id = ?', [userData.id], (error, data) => {
                if (error) {
                    console.error("Error getting user data AFTER updating user data: ", error.message)
                }
                res.json({ user: data })
            })
        })
    } catch (error) {
        console.error("Error updating profile: ", error.message)
    }
})

app.put('/enable_profile_edit', async (req, res) => {
    try {
        db.run('UPDATE users SET isCompleted = ? WHERE id = ?', [0, req.body.id], (error) => {
            if (error) {
                return console.error("Error getting user to update: ", error.message)
            }
            db.get('SELECT * FROM users WHERE id = ?', [req.body.id], (error, data) => {
                if (error) {
                    console.error("Error getting user data AFTER updating user data: ", error.message)
                }
                res.json({ user: data })
            })
        })
    } catch (error) {
        console.error("Error enabling profile editor: ", error.message)
    }
})

app.get('/getUsers', async (req, res) => {
    try {
        db.all('SELECT * FROM users', (error, users) => {
            if (error) {
                throw error
            }
            res.json({ users: users })
        })
    } catch (error) {
        console.error("Cannot get users from backend: ", error.message)
    }
})

app.post('/sendMessage', conditionalUpload, async (req, res) => {
    try {

        const messageData = JSON.parse(req.body.messageData)
        console.log(messageData.text)

        let filename
        let newAttachmentPath
        if (req.file) {
            filename = `${Date.now()}_${req.file.originalname}`
            newAttachmentPath = path.join('messageAttachments/', filename)
    adomza
            try {
            await sharp(req.file.buffer)
                .jpeg({ quality: 50 })
                .toFile(newAttachmentPath)
            } catch (error) {
            return res.status(500).send({ message: 'Failed to process the image' })
            }
        }
        db.run('INSERT INTO messages (sender_id, recipient_id, message_text, attachment) VALUES (?, ?, ?, ?)', [messageData.senderID, messageData.recipientID, messageData.text, filename])
    } catch (error) {
        console.log("Error pushing message to database: ", error.message)
    }
})




// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})




//Establish location of .db file
const dbPath = path.join(__dirname, 'database.db')



//Establish connection to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message)
    } else {
        console.log('Connected to the SQLite database.')
    }
})



//Makes DeepL API request to translate text content
async function DeepLTranslator(textToTranslate, targetLanguage) {
    const result = await translator.translateText(textToTranslate, null, targetLanguage)
    return result
}



// For hashing password and checking password against DB hash -> verifyPassword()
async function hashPassword(password) {
    try {
        const hashedPassword = await argon2.hash(password)
        return hashedPassword
    } catch (error) {
        console.error('Error hashing password:', error)
        throw error;
    }
}

async function verifyPassword(hashedDBPassword, providedPassword) {
    try {
        const match = await argon2.verify(hashedDBPassword, providedPassword);
        return match
    } catch (error) {
        console.error('Error verifying password:', error)
        throw error
    }
}

const checkForUser = async (username) => {
    try {
        const user = await new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE username = ?',
                [username],
                (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row)
                    }
                }
            )
        })
        return user
    } catch (error) {
        console.error("Error checking for user: ", error)
        throw error
    }
}

const getAllUserInfo = () => {

    

    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        userInfo.user = row
    })
    db.get("SELECT * FROM learning_languages WHERE user_id = ?", [id], (err, row) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        userInfo.languages = row
    })
    db.get("SELECT * FROM hobbies WHERE user_id = ?", [id], (err, row) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        userInfo.hobbies = row
    })
    db.get("SELECT * FROM places_want_to_visit WHERE user_id = ?", [id], (err, row) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        userInfo.places = row
    })
}