const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const BookingRoute = require('./Routes/Bookings')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(morgan('dev'))

app.use('/api',BookingRoute)

const port = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URL
mongoose.connect(MONGO_URI
).then(()=>{
    app.listen(port,()=>{
        console.log(`app listening at http://localhost:${port}`)
    })
}).catch((err)=>{
    console.log(err)
})
