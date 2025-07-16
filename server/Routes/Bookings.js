const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')

router.post('/bookings',async (req,res)=>{
    const {date,time, guests ,name, email,phone} = req.body

    if(!date || !time || !name || !guests || !email || !phone){
        return res.status(400).json({message:"Enter the Required fields!!"})
    }

    const newBooking = new Booking({date,time,guests,name,email,phone})
    await newBooking.save()


    res.status(201).json({message:"Booking Created"})


})



router.get('/bookings',async(req,res)=>{
    try{
        const Bookings = await Booking.find();
        res.status(200).json(Bookings);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Failed to fetch Bookings'});
    }
})


module.exports=router

/*
date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: ''*/