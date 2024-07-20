const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    freelancerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Freelancer',
        required:true
    },
    status:{
        type:String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    userDetails:{
        name:String,
        district:String,
        contact:String
    },
    freelancerDetails:{
        name:String,
        job:String,
        contact:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;