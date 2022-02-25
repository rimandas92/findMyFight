const express = require("express"),
    router = express.Router(),
    validateToken = require("../utils/token").validateToken; 

// CONTROLLERS
const feedController = require("../controllers/feedController");

// VALIDATOR
const {
    NewsfeedVal
} = require("../validator/commonValidator");

const {
    newsfeed_image
} = require('../utils/upload');


// ALL ROUTES ====================================================================================
router.post(
    "/newsfeed",
    validateToken,
    newsfeed_image,
    NewsfeedVal,
    feedController.Newsfeed_POST
);
router.get(
    "/allnewsfeed",
    validateToken,
    feedController.AllNewsfeed_GET
);


router.post(
    "/like-n-dislike",
    validateToken,
    feedController.LikeNDisLike_POST
);

router.post(
    "/total-like-by-feedId",
    validateToken,
    feedController.TotalFeedLikes_POST
);

router.post(
    "/liker-list-by-feedId",
    validateToken,
    feedController.LikerList_POST   
);
 

module.exports = router;
