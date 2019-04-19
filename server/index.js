require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const massive = require('massive');
const PORT = 4000;
const ac = require('./controllers/authController');
const treasureController = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

let { CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING)
    .then(db => {app.set('db', db);
    console.log("Database connected");})
    .catch(err => {
        console.log(err);
    });

    app.use(session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
       cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 }
    }));
        

app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.get('/auth/logout', ac.logout);
app.get('/api/treasure/dragon', treasureController.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureController.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureController.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureController.getAllTreasure);
// app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)


app.listen(PORT, () => console.log(`Listening on ${PORT}`));