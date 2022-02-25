const express = require('express'),
      router = express.Router(),
      validateToken = require('../utils/token').validateToken,
      { Invester_Profile } = require('../utils/upload');


// IMPORTED ALL THE SCHEMA
const UserInvester = require('../models/invester/user');

// CONTROLLERS
const authController = require('../controllers/invester/auth'),
      indexController = require('../controllers/invester/index'),
      featuresController = require('../controllers/invester/features');

//VALIDATOR
const { RegisterVal,
        LoginVal,
        ProfileVal, 
        VerifyVal, 
        ForgetVal, 
        ForgetResetVal, 
        ChangePasswordVal 
    } = require('../validator/invester');

// ALL ROUTES ======================================================================================
// Booking
router.get(
    '/booking',
    validateToken,
    featuresController.Booking_Invester_GET
)

// membership
router.get(
    '/membership',
    validateToken,
    indexController.Membership_GET
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
);
router.put(
    '/profile', 
    validateToken, 
    Invester_Profile, 
    ProfileVal, 
    indexController.Profile_PUT
);
router.post(
    '/change', 
    validateToken, 
    ChangePasswordVal, 
    indexController.Change_Password_POST
);

router.post(
    '/register', 
    Invester_Profile, 
    RegisterVal, 
    authController.Register_POST
);
router.post(
    ['/verify', '/forget/otp'], 
    VerifyVal, 
    authController.Verify_POST
);

router.post(
    '/login', 
    LoginVal, 
    authController.Login_POST
);
router.post(
    '/forget', 
    ForgetVal, 
    authController.Forget_POST
);
router.post(
    "/forget/reset", 
    ForgetResetVal, 
    authController.Forget_Reset_POST
)
// END Of ALL ROUTES ==============================================================================

//JUST FOR TESTING
router.get('/all', (req, res, next) => {
    UserInvester.find().then(result => {
    const count = result.length;
    res.status(200).json({
      message: "List of All Invester",
      count: count,
      result: result,
      errors: ''
    })
  })
})

router.delete('/delete/:id', (req, res, next) => {
    UserInvester.deleteOne({
        _id: req.params.id
    }).then((err, result) => {
        if(err) {
            res.status(400).json({
                message: err,
                result: result
            })
        } else {
            res.status(200).json({
                message: "Deleted",
                result: result,
                errors: ''
            })
        }
    })
})


module.exports = router;