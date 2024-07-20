const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const freelancerController = require('../Controller/freelancerController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const adminController = require('../Controller/adminController')
const bookingController = require('../Controller/bookingController')

// admin register

// router.post('/adminlogin',adminController.register)

// admin login

router.post('/adminlogin', adminController.login)

// get allFreelancer for admin

router.get('/adminhome',jwtMiddleware,adminController.getPendingFreelancer)

// approve freelancer

router.patch('/adminhome/approve', jwtMiddleware, adminController.approveFreelancer);

//  reject freelancer

router.patch('/adminhome/reject',jwtMiddleware, adminController.rejectFreelancer)

// client register

router.post('/clientregister',userController.register)

// client login

router.post('/clientlogin',userController.login)

// get client

router.get('/clientprofile',jwtMiddleware,userController.clientProfile)

// update client

router.put('/clientprofile/profile',jwtMiddleware,userController.updateClientProfile)

// get allFreelancer

router.get('/clienthome',jwtMiddleware,userController.getAllFreelancer)

// get allbooking

router.get('/clientprofile/booking',jwtMiddleware,userController.getAllBooking)



// freelancer register

router.post('/freelancerregister',freelancerController.freelancerRegister)

// freelancer login

router.post('/freelancerlogin', freelancerController.freelancerLogin)

// get freelancer

router.get('/freelancerprofile',jwtMiddleware,freelancerController.getFreelancerProfile)

// freelancer profile

router.patch('/freelancerprofile',jwtMiddleware,multerConfig.single('profile'),freelancerController.freelancerProfile)

// get freelancer status

router.get('/freelancerhome',jwtMiddleware,freelancerController.getFreelancerStatus)

// resubmit status

router.put(`/freelancerhome/resubmit`,jwtMiddleware,freelancerController.resubmitApprovalRequest)


// create a new booking
router.post('/clienthome/booking',jwtMiddleware, bookingController.createBooking)

// get booking for freelancer

router.get('/freelancerrequest/request',jwtMiddleware,bookingController.getPendingBooking)


// approve booking

router.patch('/freelancerrequest/approve', jwtMiddleware, bookingController.approveBooking);

// reject booking

router.patch('/freelancerrequest/reject', jwtMiddleware, bookingController.rejectBooking);

// get approved booking

router.get('/freelancerbooking',jwtMiddleware,bookingController.getApprovedBooking)

//deleteBooking

router.delete('/clientprofile/remove/:bid',jwtMiddleware,bookingController.deleteBooking)



module.exports=router 