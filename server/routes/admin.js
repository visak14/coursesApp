const express = require('express')
var bodyparser = require('body-parser')
const {Admin, Course}  = require('../db/index')
const router = express.Router()
router.use(bodyparser.json())
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");


const { z } = require('zod');

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
    
    function callback(admin) {
      if (admin) {
          res.status(403).json({ message: 'Admin already exists' });
      } else {
          const obj = { username: username, password: password };
          const newAdmin = new Admin(obj);
          newAdmin.save();
          const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
          res.json({ message: 'Admin created successfully', token });
      }
  }
  
        

    Admin.findOne({username}).then(callback)
})

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({msg: "Admin doesnt exist"})
    return
  }
  res.json({
      username: admin.username
  })
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;  // Change to body
  const user = await User.findOne({ username });
  if (user && user.password === password) {  // Simplified for demonstration; use hashed comparison
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
  } else {
      res.status(403).json({ message: 'Invalid username or password' });
  }
});



 
router.post('/courses', authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});


router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});








module.exports =  router

