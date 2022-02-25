// IMPORTED ALL THE SCHEMA
const Story = require('../models/storyModel');
const { validationResult, matchedData } = require('express-validator'),
      bcrypt = require('bcrypt');




// Create Story
exports.Story_POST = async (req, res, next) => {
    //console.log(req.files)
    const errors = validationResult(req);
    const user = matchedData(req);
    let currentDate = new Date();
    let addOneDay = currentDate.setDate(currentDate.getDate() + 1);
    let finalDay = addOneDay.toString();

    if(!errors.isEmpty()){
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    }else{
        if(Boolean(req.files.length)){
            let postData = [];
            for(let i = 0; i < req.files.length; i++){
                let data = new Story({
                    text: req.body.text,
                    media:req.files[0].filename,
                    userId: req.user.id,
                    storyExpiredAt: finalDay
                });
                postData.push(data);
            }
            const result = await Story.insertMany(postData);

            if(result.length > 0){
                return res.status(200).json({
                    message: 'Your story saved successfully',
                    status: true,
                    result: result
                })
            }else{
                return res.status(200).json({
                    message: 'Media invalid',
                    status: false,
                    result: result
                })
            }
        }else{
            try{
                const newData = new Story({
                    text: req.body.text,
                    userId: req.user.id,
                    storyExpiredAt: finalDay
                })
                newData.save((err, data) => {
                    if(err) {
                        throw new Error(err)
                    }else{
                        return res.status(200).json({
                            message: 'Your story saved successfully',
                            status: true,
                            result: data
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
}


// Get Story By User
exports.StoryByUserId_GET = async(req, res, next) => {
    try {
        await Story.find({userId: req.user.id})
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


// Delete Story
exports.DeleteStory_POST = async (req, res, next) => {
    try {
        const storyId = req.body.story_id;
        const userId = req.user.id;
        await Story.deleteOne({_id: storyId, userId: userId})
        .exec((err, result) => {
            if(err) {
                throw new Error(err);
            }
            return res.status(200).json({
                message: "Story deleted successfully",
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


// Get All Story
exports.AllStory_GET =  async(req, res, next) => {
    try {
        await Story.find()
        .populate('userId')
        .sort({ createdAt: -1 })
        .exec((err, result) => {
            if(err) {
                throw new Error(err);
            }

            if(result.length > 0) {
                let allStories = [];
                let presentUserIds = [];
                for(let i = 0; i < result.length; i++) {
                    let {userId} = result[i];
                    if(!presentUserIds.includes(userId.id)){
                        let userStories = {};
                        userStories.firstName = userId.firstName;
                        userStories.lastName = userId.lastName
                        userStories.email = userId.email 
                        userStories.userName = userId.userName 
                        userStories.userType = userId.userType 
                        userStories.userTypeId = userId.userTypeId
                        userStories.id = userId.id
                        userStories.stories = [];
                        for(let j = 0; j < result.length; j++){
                            if(userId.id === result[j].userId.id){
                                let toDate = new Date();
                                //console.log(result[j].storyExpiredAt > toDate);
                                if(result[j].storyExpiredAt > toDate){
                                    let mediaData = {};
                                    mediaData.id = result[j].id;
                                    mediaData.text = result[j].text;
                                    mediaData.media = result[j].media;
                                    mediaData.expDate = result[j].storyExpiredAt;
                                    userStories.stories.push(mediaData);
                                }
                            }
                        }
                        allStories.push(userStories);
                        presentUserIds.push(userId.id);
                    }
                }
                return res.status(200).json({
                    message: "All stories",
                    status: true,
                    result: allStories
                })
            }else{
                return res.status(200).json({
                    message: "There are no date",
                    status: false,
                    result: []
                })
            }
    
            // return res.status(200).json({
            //     message: "success",
            //     status: true,
            //     result: result
            // })
        })
    }catch (error) {
        return res.status(400).json({
          message: "Bad Request",
          status: false,
          error: error
        })
    }
} 