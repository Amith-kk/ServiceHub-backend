
const users = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const freelancers = require('../Model/freelancerModel');
const saltRounds = 10;
const Booking = require('../Model/bookingModel')
// client register

exports.register= async(req,res)=>{
    const {username,email,password}=req.body
    // console.log('inside register user controller ');
    try {
        const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("user already exist! please login..")
    }else{
        const hashedPassword =await bcrypt.hash(password, saltRounds)
        const newUser = users({
            username,email,password:hashedPassword,contact:"",location:"",address:""
        })
        
        await newUser.save()
        res.status(200).json(newUser)
    }
    } catch (err) {
        return res.status(500).json({ error: err.message });
 
    }
}

// client login

exports.login = async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingUser = await users.findOne({email})
        if(!existingUser){
            return res.status(401).json({message:"Invalid email or password"})
        }
        const isPasswordValid = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordValid) {
            return res.status(401).json({message:"Invalid email or password"})
        }
        // generate token
        const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET)
        res.status(200).json({existingUser,token})
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
// client profile

exports.clientProfile = async (req, res) => {
    const  userId = req.payload;
    // console.log(userId);
    try {
        const user = await users.findById(userId);
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
            res.status(200).json(user)
        
    } catch (err) {
        res.status(500).json(err)
    }
}

// client profile update

exports.updateClientProfile = async(req,res)=>{
    const {username,email,contact,location,address,}=req.body
    
    const  userId = req.payload
    // console.log(req.file);
    // console.log(userId);
    // console.log(email,username,contact);

    try {
        const updateProfile = await users.findByIdAndUpdate(
            userId,
            {username,email,contact,location,address},
            {new:true});
            if(!updateProfile){
                return res.status(400).json({message:'user not found'})
            }
            // console.log(updateProfile);
            res.status(200).json(updateProfile)
    } catch (err) {
        res.status(401).json(err)
    }
 
}


// client freelancer get

 exports.getAllFreelancer = async(req,res)=>{
    const searchKey = req.query.search
    // console.log(searchKey);
    const query = {
        status: "approved",
        job:{$regex:searchKey,$options:"i"}
    }
    try {
        const allFreelancers = await freelancers.find(query);
        if(!allFreelancers){
            return res.status(400).json({message:'Freelancer not found'})
        }
            res.status(200).json(allFreelancers)
        
    } catch (err) {
        res.status(500).json(err)
    }
 }

 // get booking

exports.getAllBooking = async(req,res)=>{
    const userId = req.payload
    try {
        const booking = await Booking.find({userId});
        if(!booking){
            return res.status(400).json({message:'No booking'})
        }
            res.status(200).json(booking)
        
    } catch (err) {
        res.status(500).json(err)
    }
 }





