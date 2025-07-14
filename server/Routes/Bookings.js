const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')

router.post('/bookings',async (req,res)=>{
    
    console.log(req.body);

    const {date,time, guests ,name, email,phone} = req.body

    if(!date || !time || !name || !guests || !email || !phone){
        return res.status(400).json({message:"Enter the Required fields!!"})
    }

    const newBooking = new Booking({date,time,guests,name,email,phone})
    await newBooking.save()


    res.status(201).json({message:"Booking Created"})


})

module.exports=router

/*
date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: ''*/