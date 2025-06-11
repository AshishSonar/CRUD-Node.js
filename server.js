const express = require("express");
const app = express();
const db = require("./db");
const menu = require('./models/menu')
require('dotenv').config()
const PORT = process.env.PORT || 3000


const bodyParser = require("body-parser");
app.use(bodyParser.json());


const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const menuRoutes = require("./routes/menuRoutes")
app.use('/menu', menuRoutes)

app.get("/", (req, res) => {
  res.send("Hi I am Ashish");
});

// listening on port
app.listen(PORT, () => console.log("server listening on port 3000"));
