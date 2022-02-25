const express = require("express"),
    router = express.Router(),
    validateToken = require("../utils/token").validateToken; 

// CONTROLLERS
const forumController = require("../controllers/forumController");

// VALIDATOR
const {
    forumVal
} = require("../validator/commonValidator");

// const {
//     newsfeed_image
// } = require('../utils/upload');


// ALL ROUTES ====================================================================================
router.post(
    "/addforum",
    validateToken,
    forumVal,
    forumController.addForum_POST
);
router.get(
    "/allforum",
    validateToken,
    forumController.AllForum_GET
);
router.get(
    "/forumByUserId",
    validateToken,
    forumController.ForumByUserId_GET
);

router.post(
    "/editForum",
    validateToken,
    forumVal,
    forumController.EditForum_POST
);

router.post(
    "/deleteForum",
    validateToken,
    forumController.DeleteForum_POST
);
 

module.exports = router;
