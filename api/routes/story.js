const express = require("express"),
    router = express.Router(),
    validateToken = require("../utils/token").validateToken; 

// CONTROLLERS
const storyController = require("../controllers/storyController");

// VALIDATOR
const {
    storyVal
} = require("../validator/commonValidator");

const {
    story_media
} = require('../utils/upload');


// ALL ROUTES ====================================================================================


// Create story
router.post(
    "/story-post",
    validateToken,
    story_media,
    storyVal,
    storyController.Story_POST
);

// Get story By User
router.get(
    "/get-story-by-user",
    validateToken,
    storyController.StoryByUserId_GET
);

// Delete Srory
router.post(
    "/delete-story",
    validateToken,
    storyController.DeleteStory_POST
);

// Get All Story
router.get(
    "/get-all-story",
    // validateToken,
    storyController.AllStory_GET
);

module.exports = router;