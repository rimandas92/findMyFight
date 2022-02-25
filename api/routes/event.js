const express = require("express"),
    router = express.Router(),
    validateToken = require("../utils/token").validateToken; 

// CONTROLLERS
const eventController = require("../controllers/eventController");

// VALIDATOR
const {
    eventVal
} = require("../validator/commonValidator");

const {
    event_image
} = require('../utils/upload');





// ALL ROUTES ====================================================================================

// Get All Event
router.get(
    "/allevent",
    // validateToken,
    eventController.AllEvent_GET
);

// Get Events By User
router.get(
    "/get-listevent-by-user",
    validateToken,
    eventController.EventByUserId_GET
);

// Create Event
router.post(
    "/event-post",
    validateToken,
    event_image,
    eventVal,
    eventController.Event_POST
);

//Get Event Details
router.post(
    "/get-event-by-id",
    validateToken,
    eventController.EventById_POST
);

// Update Event
router.post(
    "/update-event",
    validateToken,
    event_image,
    eventVal,
    eventController.UpdateEvent_POST
);

// Delete Event
router.post(
    "/delete-event",
    validateToken,
    eventController.DeleteEvent_POST
);

// Search Event
router.post(
    "/search-event",
    // validateToken,
    eventController.SearchEvent_POST
);

module.exports = router;