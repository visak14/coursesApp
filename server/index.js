const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000; // Set a default port in case PORT is not defined
const uri = process.env.URI;
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://courses-app-frontend.vercel.app', // Only allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRouter);
app.use('/user', userRouter);

mongoose.connect(uri, { dbName: 'course' })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
