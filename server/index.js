const express = require('express')
const massive = require('massive')
const session = require('express-session')
require('dotenv/config')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING }=process.env
const authCtrl = require('../controllers/authController')
const treasureCtrl = require('../controllers/treasureController')
const auth = require('./middleware/authMiddleWare')

const app = express()
app.listen(SERVER_PORT, () => console.log('Welcome to port', SERVER_PORT))
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 30000000
    }
}))

//endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)

massive(CONNECTION_STRING).then((db) => {app.set('db', db)
    console.log('connected to db')
})