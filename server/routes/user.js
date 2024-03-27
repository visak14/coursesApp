const express = require('express')
var bodyparser = require('body-parser')
const {Admin, Course, User, payment}  = require('../db/index')
const router = express.Router()
router.use(bodyparser.json())
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");
const  crypto = require('crypto')
const { z } = require('zod');

const Razorpay = require('razorpay')

let usernameInputProps = z.object({
    username: z.string().min(1).email(),
    password: z.string().min(1)
})
router.post('/signup', (req, res)  =>{
    const parsedInput = usernameInputProps.safeParse(req.body)
    if(!parsedInput.success) {
        return res.status(411).json({
            msg: parsedInput.error
        })
        return;
    }
    let username = parsedInput.data.username;
    let password = parsedInput.data.password
    
    function callback(user){
        if(user){
            res.status(403).json({message: 'user already exist'})
        }
        else {
            const obj  = {username: username, password: password}
            const newUser  =  new User(obj)
             newUser.save()
             const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
             res.json({message:'User created successfully', token})

        }   
        
    }

    User.findOne({username}).maxTimeMS(20000).then(callback)
})

router.get("/u", authenticateJwt, async (req, res) => {
  const user= await User.findOne({ username: req.user.username });
  if (!user) {
    res.status(403).json({msg: "User doesnt exist"})
    return
  }
  res.json({
      username: user.username
  })
});

// router.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (user) {
//       res.status(403).json({ message: 'User already exists' });
//     } else {
//       const newUser = new User({ username, password });
//       await newUser.save();
//       const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//       res.json({ message: 'User created successfully', token });
//     }
//   });

  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });


  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });
  
  router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });


  router.post('/checkout', async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET
      });
     // const pay_amount =  Number(req.body.price);
      const options = {
       
        amount: Number(req.body.amount*100),
        currency: "INR",
      };
  
      const order = await instance.orders.create(options);
  
      console.log(order);
      
      res.status(200).json({
        success: true,
        order: order
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create order"
      });
    }
  });


router.post('/checkout/paymentverification' , async (req, res) =>{

  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  
  const  expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
       .update(body.toString())
       .digest('hex');
       console.log('sig received' , razorpay_signature)
       console.log('sig generated' , expectedSignature)
      
        const isAuth = expectedSignature === razorpay_signature
        
        if(isAuth) {

           payment.create({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature

           })
             
          res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
        }
        else {
          res.status(400).json({
            success: false
          })
        }
})

router.get('/checkout/getkey', (req, res ) =>[
  res.status(200).json({key : process.env.RAZORPAY_API_KEY})
])


module.exports =  router

