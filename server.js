const express = require("express");
const app = express();
const db = require("./db");
const menu = require('./models/menu')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const passport = require('./auth')


const bodyParser = require("body-parser");
app.use(bodyParser.json());


const logRequest = (req, res, next) => {
  //console.log(`[${new Date().toLocaleString()}] Reqest made to: ${req.originalUrl}`)
  next()
}
app.use(logRequest)

app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local', {session:false})

const personRoutes = require('./routes/personRoutes')
app.use('/person',localAuthMiddleware, personRoutes)

const menuRoutes = require("./routes/menuRoutes");
const Person = require("./models/person");
app.use('/menu', menuRoutes)

app.get("/", (req, res) => {
  res.send("Hi I am Ashish");
});

// listening on port
app.listen(PORT, () => console.log("server listening on port 3000"));
