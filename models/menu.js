const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    price: {
        type: 'number',
        required: true
    }
})

const menu = mongoose.model('Menu', menuSchema)
module.exports = menu



