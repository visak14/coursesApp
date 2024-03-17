const express = require('express')
const cors = require('cors');
const mongoosse = require('mongoose')

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const uri =  process.env.URI
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const app = express()
app.use(cors())
app.use('/admin', adminRouter)
app.use('/user',userRouter)

mongoosse.connect(uri,{ dbName:'courses' } )

app.listen(port, ()=> {console.log(`server running on ${port}`)})