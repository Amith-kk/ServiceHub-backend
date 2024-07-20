const freelancers = require('../Model/freelancerModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// freelancer register

exports.freelancerRegister = async(req,res)=>{
    const {username,email,password,contact,district}=req.body
    try {
        const existingFreelancer = await freelancers.findOne({email})
        if(existingFreelancer){
            res.status(406).json("user already exist! please login..")
        }else{
            const hashedPassword =await bcrypt.hash(password, saltRounds)
            const newFreelancer = freelancers({
                username,email,password:hashedPassword,contact,district,wage:"",address:"",profile:"",job:""
            })
            await newFreelancer.save()
            res.status(200).json(newFreelancer)
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// freelancer login
exports.freelancerLogin = async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingFreelancer = await freelancers.findOne({email})
        if(!existingFreelancer){
            return res.status(401).json({message:"Invalid email or password"})
            
        }
        const isPasswordValid = await bcrypt.compare(password,existingFreelancer.password)
        if(!isPasswordValid) {
            return res.status(401).json({message:"Invalid email or password"})
        }
        const token = jwt.sign({freelancerId:existingFreelancer._id},process.env.JWT_SECRET)
            res.status(200).json({existingFreelancer,token})
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// freelancer get profile

exports.getFreelancerProfile = async (req, res) => {
    const  freelancerId = req.payload;
    try {
        const freelancer = await freelancers.findById(freelancerId);
        if(!freelancer){
            return res.status(400).json({message:'Freelancer not found'})
        }
            res.status(200).json(freelancer)
        
    } catch (err) {
        res.status(500).json(err)
    }
}

// freelancer profile update

exports.freelancerProfile = async(req,res)=>{
    const {username,email,contact,district,wage,address,job,profile}=req.body
    const uploadImage = req.file?req.file.filename:profile
    const  freelancerId = req.payload
    // console.log(req.file);

    try {
        const updateProfile = await freelancers.findByIdAndUpdate(
            freelancerId,{username,email,contact,district,wage,address,job,profile:uploadImage},{new:true})
            await updateProfile.save()
            res.status(200).json(updateProfile)
    } catch (err) {
        res.status(401).json(err)
    }
 
}

// get status
exports.getFreelancerStatus = async (req, res) => {
    const freelancerId = req.payload;
    // console.log(freelancerId); 
    try {
        const freelancer = await freelancers.findById(freelancerId, 'status');
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.status(200).json({ status: freelancer.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// resend status
exports.resubmitApprovalRequest = async (req, res) => {
    const freelancerId = req.payload; 
    console.log(freelancerId);

    try {

        const freelancer = await freelancers.findById(freelancerId);
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        if (freelancer.status !== 'rejected') {
            return res.status(400).json({ message: 'Only rejected freelancers can resubmit an approval request' });
        }
        freelancer.status = 'pending';
        await freelancer.save();
        res.status(200).json({ message: 'Approval request resubmitted', freelancer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};