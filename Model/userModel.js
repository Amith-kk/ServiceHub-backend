const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true
    },
    contact:{
        type:String,
    },
    location:{
        type:String,
    },
    address:{
        type:String,
    }

})

 const User = mongoose.model('users',userSchema)

 module.exports= User
