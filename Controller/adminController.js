const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const admin = require("../Model/adminModel");
const freelancers = require('../Model/freelancerModel');

// // admin register

// exports.register= async(req,res)=>{
//     const {email,password}=req.body
//     // console.log('inside register user controller ');
//     try {
//         const existingAdmin = await admin.findOne({email})
//     if(existingAdmin){
//         res.status(406).json("user already exist! please login..")
//     }else{
//         const hashedPassword =await bcrypt.hash(password, saltRounds)
//         const newAdmin = admin({
//             email,password:hashedPassword
//         })
        
//         await newAdmin.save()
//         res.status(200).json(newAdmin)
//     }
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
 
//     }
// }

// admin login

exports.login = async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingAdmin = await admin.findOne({email})
        if(!existingAdmin){
            return res.status(401).json({message:"Invalid email or password"})
        }
        const isPasswordValid = await bcrypt.compare(password,existingAdmin.password)
        if(!isPasswordValid) {
            return res.status(401).json({message:"Invalid email or password"})
        }
        // generate token
        const token = jwt.sign({adminId:existingAdmin._id},process.env.JWT_SECRET)
        res.status(200).json({existingAdmin,token})
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// get admin freelancer 

exports.getPendingFreelancer = async(req,res)=>{
    try {
        const pendingFreelancers = await freelancers.find({ status: 'pending' });
        if(!pendingFreelancers){
            return res.status(400).json({message:'Freelancer not found'})
        }
            res.status(200).json(pendingFreelancers)
        
    } catch (err) {
        res.status(500).json(err)
    }
 }

 // approve freelancer

 exports.approveFreelancer = async (req, res) => {
    const { freelancerId } = req.body;
    if (!freelancerId) {
        return res.status(400).json({ message: 'Freelancer ID is required' });
    }
    try {
        const freelancer = await freelancers.findByIdAndUpdate(freelancerId, { status: "approved" }, { new: true });
        if (!freelancer) {
            return res.status(400).json({ message: 'Freelancer not found' });
        }
        res.status(200).json({ message: 'Freelancer approved successfully', freelancer });
    } catch (err) {
        res.status(500).json(err);
    }
};

// reject freelancer

exports.rejectFreelancer = async(req,res) => {
    const { freelancerId } = req.body;
    if (!freelancerId) {
        return res.status(400).json({ message: 'Freelancer ID is required' });
        }
        try {
            const freelancer = await freelancers.findByIdAndUpdate(freelancerId, { status: "rejected"}, { new: true });
            if (!freelancer) {
                return res.status(400).json({ message: 'Freelancer not found' });
                }
                res.status(200).json({ message: 'Freelancer rejected successfully', freelancer });
        } catch (err){
            res.status(500).json(err);
        }
}


