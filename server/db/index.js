const mongoose = require('mongoose');



const userSchema = new mongoose.Schema(
    {
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
    }
  );

  const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    
  }
  );
  

  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean

  })

  const paymentSchema = new mongoose.Schema({
   razorpay_order_id: {
    type: String,
    required: true,
   },
   razorpay_payment_id : {
    
      type: String,
      required: true,
     },
   
   razorpay_signature:  
   {
    type: String,
    required: true,
   }
  
  })

  const Admin = mongoose.model('Admin',adminSchema)
  const  User = mongoose.model('User', userSchema)
  const Course = mongoose.model('Course', courseSchema)
  const payment = mongoose.model('payment',paymentSchema)


  module.exports = {
    Admin,
    User,
    Course,
    payment
  }