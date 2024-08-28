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
  try {
    const { username, password } = req.body;
    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(403).json({ message: 'Admin not found' });
    }
    if (admin.password !== password) {
      return res.status(403).json({ message: 'Invalid password' });
    }
    // If the above checks pass, return a simple success message
    res.json({ message: 'Logged in successfully' });

  } catch (error) {
    console.error('Login error:', error);  // Log error for debugging
    res.status(500).json({ message: 'Internal server error' });
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

