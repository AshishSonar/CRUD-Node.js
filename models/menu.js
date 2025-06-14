const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    price: {
        type: 'number',
        required: true
    },
    photo: {
        type: 'string' // store base 64 encoded data
    }
})

const menu = mongoose.model('Menu', menuSchema)
module.exports = menu



