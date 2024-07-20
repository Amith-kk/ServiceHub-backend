const mongoose = require('mongoose')

const freelancerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
        
    },
    district:{
        type:String,
        required:true
    },
    wage:{
        type:String
    },
    address:{
        type:String
    },
    profile:{
        type:String
    },
    job:{
        type:String
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const Freelancer = mongoose.model("freelancers",freelancerSchema)

module.exports = Freelancer