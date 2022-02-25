const express = require('express'),
      router = express.Router(),
      validateToken = require('../utils/token').validateToken,
      { Contractor_Profile } = require('../utils/upload');

// IMPORTED ALL THE SCHEMA
const UserContractor = require('../models/contractor/user');

// CONTROLLERS
const authController = require('../controllers/contractor/auth'),
      indexController = require('../controllers/contractor/index'),
      featuresController = require('../controllers/contractor/features'),
      paymentController = require('../controllers/contractor/payment');

//VALIDATOR
const { 
  RegisterVal, 
  LoginVal, 
  ProfileVal, 
  VerifyVal, 
  ForgetVal, 
  ForgetResetVal, 
  ChangePasswordVal 
} = require('../validator/contractor');

// ALL ROUTES =====================================================================================

// Booking
router.get(
  '/booking',
  validateToken,
  featuresController.Booking_Contractor_GET
)

//membership
router.get(
  '/membership',
  indexController.Membership_GET
)

// payment
router.get(
  '/payment',
  paymentController.payment_GET
)

// specialty 
router.get(
  '/specialty',
  indexController.Speciality_GET
)

router.get(
  '/profile', 
  validateToken, 
  indexController.Profile_GET
)
router.put(
  '/profile', 
  validateToken, 
  Contractor_Profile, 
  ProfileVal, 
  indexController.Profile_PUT
)
router.post(
  '/change', 
  validateToken, 
  ChangePasswordVal, 
  indexController.Change_Password_POST
);

router.post(
  '/login', 
  LoginVal , 
  authController.Login_POST
);
router.post(
  '/forget', 
  ForgetVal, 
  authController.Forget_POST
);
router.post(
  '/forget/reset', 
  ForgetResetVal, 
  authController.Forget_Reset_POST
);

router.post(
  '/register', 
  Contractor_Profile, 
  RegisterVal, 
  authController.Register_POST
);
router.post(
  ['/verify', '/forget/otp'], 
  VerifyVal, 
  authController.Verify_POST
);
// END Of ALL ROUTES ==============================================================================

//JUST FOR TESTING
router.get('/all', (req, res, next) => {
  UserContractor.find().then(result => {
    const count = result.length;
    res.status(200).json({
      message: "List of all Contractors",
      count: count,
      result: result
    })
  })
})

router.delete('/delete', (req, res, next) => {
  UserContractor.deleteMany().then(result => {
    res.status(200).json({
      message: "All data Deleted"
    })
  })
})


module.exports = router;