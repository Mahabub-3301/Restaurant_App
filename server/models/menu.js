const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    category: String,
    name: String,
    description: String,
    price: String,
})

module.exports = mongoose.model('menuItems',menuSchema);