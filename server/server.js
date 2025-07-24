const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const BookingRoute = require('./Routes/Bookings')
const authRoutes = require('./Routes/authRoutes');
const paymentRoute = require('./Routes/paymentRoutes');
const bcrypt = require('bcryptjs')
const menuRoute = require('./Routes/menuRoute')
const {errorHandler} = require('./utils/errorHandler')

const allowed_origin = process.env.link;

const allowedOrigins = [
  "https://restaurant-app-163i.onrender.com",
  allowed_origin
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'dist')));


app.use(morgan('dev'))

app.use('/api',paymentRoute)
app.use('/api/auth',authRoutes)
app.use('/api',BookingRoute)
app.use('/api',menuRoute)

app.get('/test-error', (req, res, next) => {
  // This will automatically be caught by error middleware
  const error = new Error('This is a test internal error!');
  error.statusCode = 500; // optional, defaults to 500
  next(error);
});

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});




app.use(errorHandler)

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
