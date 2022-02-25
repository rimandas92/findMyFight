const express = require("express"),
    router = express.Router(),
    validateToken = require("../utils/token").validateToken; 

// CONTROLLERS
const authController = require("../controllers/authController"),
    userController = require("../controllers/userController");

// VALIDATOR
const {
    RegisterVal,
    LoginVal,
    ProfileVal,
    VerifyVal,
    ForgetVal,
    ForgetResetVal,
    NewsfeedVal
} = require("../validator/commonValidator");

const {
    Contractor_Profile,
    upload_Profile_image,
    Forum_Image,
    Property_Image,
    newsfeed_image
} = require('../utils/upload');
// ALL ROUTES ====================================================================================



// Register, Verify, Forget, Login, and Reset API
router.post(
    "/register",
    RegisterVal,
    authController.Register_POST
);
router.get(
    "/allusertype",
    authController.AllUserType_GET
);
router.post(
    ["/verify", "/forget/otp"],
    VerifyVal,
    authController.Verify_POST
);
router.post(
    "/login",
    LoginVal,
    authController.Login_POST
);
router.post(
    "/forget",
    ForgetVal,
    authController.Forget_POST
);
router.post(
    "/forget/reset",
    ForgetResetVal,
    authController.Forget_Reset_POST
);

router.get(
    "/getprofiledetail",
    validateToken,
    userController.Getprofiledetail_GET
);
router.post(
    "/updateProfile",
    validateToken,
    upload_Profile_image,
    userController.UpdateProfile_POST
);

 
module.exports = router;
