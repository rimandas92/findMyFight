// IMPORTED ALL THE SCHEMA
const Event = require('../models/eventModel'),
      User = require('../models/userModel');
const { validationResult, matchedData } = require('express-validator'),
      bcrypt = require('bcrypt');


// Get All Event
exports.AllEvent_GET =  async(req, res, next) => {
    try {
        await Event.find()
        .populate('userId')
        .sort({ createdAt: -1 })
        .exec((err, result) => {
            if(err) {
                throw new Error(err);
            }
    
            return res.status(200).json({
                message: "success",
                status: true,
                result: result
            })
        })
    }catch (error) {
        return res.status(400).json({
          message: "Bad Request",
          status: false,
          error: error
        })
    }
}     

// Get Events By User
exports.EventByUserId_GET = async(req, res, next) => {
    try {
        await Event.find({userId: req.user.id})
        // .populate('userId')
        // .sort({ createdAt: -1 })
        .exec((err, result) => {
            if(err) {
                throw new Error(err);
            }
            return res.status(200).json({
                message: "success",
                status: true,
                result: result
            })
        })
    }catch (error) {
        return res.status(400).json({
          message: "Bad Request",
          status: false,
          error: error
        })
    }
}

// Create Event
exports.Event_POST = async (req, res, next) => {
    //console.log("files", req.file);
    const errors = validationResult(req);
    const user = matchedData(req);
    //console.log("errors", errors);
    //console.log(req.user.id)

    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    } else {
        try{
            const newData = new Event({
                title: req.body.title,
                venue: req.body.venue,
                description: req.body.description,
                eventDate: req.body.eventDate,
                image: req.file ? req.file.filename : null,
                userId: req.user.id
            })
            await User.findOne({_id: req.user.id}).exec((err, result)=>{
                if(err) {
                    throw new Error(err);
                }
                if(result.userType !== 'U'){
                    newData.save((err, data) => {
                        if(err) {
                            throw new Error(err)
                        }else{
                            return res.status(200).json({
                                message: 'Your event saved successfully',
                                status: true,
                                result: data
                            })
                        }
                    })
                }else{
                    return res.status(200).json({
                        message: "You have not permission to create event",
                        status: false,
                        result: ''
                    })
                }
            })
        }catch(error){
            return res.status(400).json({
                message: "Bad Request",
                status: false,
                error: error
            })
        }
    }
}


//Get Event Details
exports.EventById_POST = async (req, res, next) => {
    try {
        await Event.find({_id: req.body.event_id})
        .populate('userId')
        .sort({ createdAt: -1 })
        .exec((err, result) => {
            if(err) {
                throw new Error(err);
            }
    
            return res.status(200).json({
                message: "success",
                status: true,
                result: result
            })
        })
    }catch (error) {
        return res.status(400).json({
          message: "Bad Request",
          status: false,
          error: error
        })
    }
}


// Update Event
exports.UpdateEvent_POST = async (req, res, next) => {
    const errors = validationResult(req);
    const user = matchedData(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    }else{
        const id = req.user.id;
        const eventId = req.body.event_id;

        const UpdateField = {
            title: req.body.title,
            venue: req.body.venue,
            description: req.body.description,
            eventDate: req.body.eventDate,
            image: (req.file) ? req.file.filename : (req.body.pre_image)? req.body.pre_image : null,
        }
      
        for(const field in Object.keys(UpdateField)) {
            UpdateField[field.propName] = field.value
        }
      
        try {
            await Event.updateOne({
                _id: eventId
            },{$set: UpdateField})
            .exec((err) => {
                if(err) {
                    throw new Error(err)
                }
                return res.status(200).json({
                    message: 'Event has been updated successfully',
                    status: true,
                    _id: eventId
                })
            })
        }catch (error) {
            return res.status(400).json({
                message: "Bad Request",
                status: false,
                error: error
            })
        }
    }
}


// Delete Event
exports.DeleteEvent_POST = async (req, res, next) => {
    try {
        const eventId = req.body.event_id;
        const userId = req.user.id;
        await Event.deleteOne({_id: eventId, userId: userId})
        .exec((err, result) => {
            if(err) {
                throw new Error(err);
            }
            return res.status(200).json({
                message: "Event deleted successfully",
                status: true
            })
        })
    } catch (error) {
        return res.status(400).json({
          message: "Bad Request",
          status: false,
          error: error
        })
    }
}

// Search Event

exports.SearchEvent_POST = async (req, res, next) => {
    let search_data = {
        ...req.body
    }



    //console.log(Object.keys(search_data).length)

    if(Object.keys(search_data).length){
        for (let key in search_data) {
            if (search_data[key] === '' || search_data[key] === null || search_data[key] === undefined) {
                delete search_data[key];
            }
        }

        try {
            await Event.find(search_data)
            .populate('userId')
            .sort({ createdAt: -1 })
            .exec((err, result) => {
                if(err) {
                    throw new Error(err);
                }
        
                return res.status(200).json({
                    message: "success",
                    status: true,
                    result: result
                })
            })
        }catch (error) {
            return res.status(400).json({
                message: "Bad Request",
                status: false,
                error: error
            })
        }
    }else{
        return res.status(400).json({
            message: "Please enter correct value",
            status: false,
            error: ''
        })
    }
}