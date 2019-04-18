require('dotenv').config();
const express = require('express');
const session = require('express-session');
// const bcrypt = require('bcryptjs');
const massive = require('massive');
const PORT = 4000;

const app = express();

app.use(express.json());

let { CONNECTION_STRING, SESSION_SECRET } = process.env;




app.listen(PORT, () => console.log(`Listening on ${PORT}`));