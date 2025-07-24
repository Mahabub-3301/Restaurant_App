const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const { authenticate } = require('../middleware/authMiddleware');

router.post('/bookings', authenticate, async (req, res) => {
  const { date, time, guests, name, email, phone } = req.body;
  const userId = req.user?._id; // pulled from JWT middleware

  if (!date || !time || !guests || !name || !email || !phone) {
    return res.status(400).json({ message: "Enter the Required fields!!" });
  }

  const newBooking = new Booking({
    user: userId, // link to User model
    date,
    time,
    guests,
    name,
    email,
    phone
  });

  await newBooking.save();
  res.status(201).json({ message: "Booking Created" });
});




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