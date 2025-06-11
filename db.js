const mongoose = require('mongoose') 
require('dotenv').config()

//const mongoURL = "mongodb://127.0.0.1:27017/hotels"
const mongoURL = process.env.DB_URL

mongoose.connect(mongoURL)

const db = mongoose.connection

db.on('connected', ()=> {
    console.log('connected to mongodb server')
})

db.on('error', ()=> {
    console.log('error')
})

db.on('disconnected', ()=> {
    console.log('disconnected to mongodb server')
})

module.exports = db