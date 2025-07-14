const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    guests:String,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    }
})


module.exports = mongoose.model('Bookings',BookingSchema)
/*
date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: ''*/