require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = require('./Router/router')

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
require('./DB/connection')
app.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`server started listening at PORT ${PORT}`);
})


// app.get('/',(req,res)=>{res.send("hello w")})
// app.post('/',(req,res)=>{res.send('post request')})