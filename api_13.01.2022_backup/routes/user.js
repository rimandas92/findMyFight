const express = require("express"),
    router = express.Router(),
    validateToken = require("../utils/token").validateToken;

// CONTROLLERS
const authController = require("../controllers/user/auth"),
    indexController = require("../controllers/user/index");

// VALIDATOR
const {
    RegisterVal,
    LoginVal,
    ProfileVal,
    VerifyVal,
    ForgetVal,
    ForgetResetVal,
    NewsfeedVal
} = require("../validator/user");

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
    //Landlord_Profile,
    RegisterVal,
    authController.Register_POST
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
    indexController.Getprofiledetail_GET
);
router.post(
    "/updateProfile",
    validateToken,
    upload_Profile_image,
    indexController.UpdateProfile_POST
);
router.post(
    "/newsfeed",
    validateToken,
    newsfeed_image,
    NewsfeedVal,
    indexController.Newsfeed_POST
);
router.get(
    "/allnewsfeed",
    validateToken,
    indexController.AllNewsfeed_GET
);
 
// ==============================================================================================

// IMPORTED ALL THE SCHEMA
const UserLandlord = require("../models/usermodel/user");

router.get("/all", (req, res, next) => {
    UserLandlord.find().select('_id username firstName lastName OTP isVerified isActive password image')
        .then((result) => {
            const count = result.length;
            res.status(200).json({
                message: "List of all landlords",
                count: count,
                result: result,
            });
        });
});

router.delete("/delete", (req, res, next) => {
    UserLandlord.deleteMany().then((result) => {
        res.status(200).json({
            message: "All data Deleted",
        });
    });
});


module.exports = router;
