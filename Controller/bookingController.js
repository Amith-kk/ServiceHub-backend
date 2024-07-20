const Booking = require('../Model/bookingModel')
const User = require('../Model/userModel')
const Freelancer = require('../Model/freelancerModel')

// create new booking

exports.createBooking = async(req,res) => {
    const { freelancerId } = req.body
    const userId = req.payload;
    console.log(userId);

    try{
    //  fetch user
       const user = await User.findById(userId)
    //    console.log(user);
       if(!user){
        return res.status(404).json({message: 'User not found'})
       }
       // fetch freelancer details

       const freelancer = await Freelancer.findById(freelancerId)
       if(!freelancer){
        return res.status(404).json({message: 'Freelancer not found'})
       }

       const userDetails ={
        name: user.username,
        district: user.location,
        contact: user.contact
       }

       const freelancerDetails ={
        name: freelancer.username,
        job: freelancer.job,
        contact: freelancer.contact
       }

        const newBooking = new Booking({
            userId,
            freelancerId,
            userDetails,
            freelancerDetails
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch(err){
        res.status(500).json({ error: err.message})
    
    }
}


// get booking request for freelancer
 

exports.getPendingBooking = async(req,res)=>{
    try {
        const pendingBooking = await Booking.find({ status: 'pending' });
        if(!pendingBooking){
            return res.status(400).json({message:'No pending booking'})
        }
            res.status(200).json(pendingBooking)
        
    } catch (err) {
        res.status(500).json(err)
    }
 }


  // approve freelancer

  exports.approveBooking = async (req, res) => {
    const { bookingId } = req.body;
    if (!bookingId) {
        return res.status(400).json({ message: 'booking ID is required' });
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, { status: "approved" }, { new: true });
        if (!booking) {
            return res.status(400).json({ message: 'booking not found' });
        }
        res.status(200).json({ message: 'booking approved successfully', booking });
    } catch (err) {
        res.status(500).json(err);
    }
};

// reject freelancer

exports.rejectBooking = async(req,res) => {
    const { bookingId } = req.body;
    if (!bookingId) {
        return res.status(400).json({ message: 'booking ID is required' });
        }
        try {
            const booking = await Booking.findByIdAndUpdate(bookingId, { status: "rejected"}, { new: true });
            if (!booking) {
                return res.status(400).json({ message: 'booking not found' });
                }
                res.status(200).json({ message: 'booking rejected successfully', booking });
        } catch (err){
            res.status(500).json(err);
        }
}

// get approved booking

exports.getApprovedBooking = async(req,res)=>{
    try {
        const approvedBooking = await Booking.find({ status: 'approved' });
        if(!approvedBooking){
            return res.status(400).json({message:'No pending booking'})
        }
            res.status(200).json(approvedBooking)
        
    } catch (err) {
        res.status(500).json(err)
    }
 }


   // delete booking 

   exports.deleteBooking = async (req,res)=>{
    const {bid} = req.params
    try{
        const deleteData = await Booking.findByIdAndDelete({_id:bid})
        res.status(200).json(deleteData)
    } catch(err){
        res.status(401).json(err)
    }
  }