const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')



const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT;
const uri = process.env.URI
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const allowedOrigins = ['https://courses-app-frontend.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/admin', adminRouter)
app.use('/user',userRouter)






mongoose.connect(uri, { dbName: "course"})

app.listen(port, ()=> {console.log(`server running on ${port}`)})
