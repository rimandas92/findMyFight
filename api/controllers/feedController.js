// IMPORTED ALL THE SCHEMA
const Newsfeed = require('../models/feedModel'),
      FeedLike = require('../models/feedLikeModel'),
      FeedComment = require('../models/feedCommentModel'),
      User = require('../models/userModel');
const { validationResult, matchedData } = require('express-validator'),
      bcrypt = require('bcrypt');
// const { populate } = require('../../models/usermodel/usertype');
    

// Create Newsfeed
exports.Newsfeed_POST = async (req, res, next) => {
  console.log("files", req.file);
  const errors = validationResult(req);
  const user = matchedData(req);
  if (!errors.isEmpty()) {
      return res.status(200).json({
          message: errors.array()[0].msg,
          status: false,
          result: user
      });
  } else {
    const newData = new Newsfeed({
        title: req.body.title,
        image: req.file ? req.file.filename : null,
        userId: req.user.id
    })

    try {
        newData.save((err, data) => {
            if(err) {
                throw new Error(err)
            }else{
                return res.status(200).json({
                    message: 'Your Newsfeed posted successfully',
                    status: true,
                    result: data
                })
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: "Bad Request",
            status: false,
            error: error
        })
    }
  }
}

// Get All Newsfeed
exports.AllNewsfeed_GET = async (req, res, next) => {
  try {
    await Newsfeed.find()
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
  } catch (error) {
    return res.status(400).json({
      message: "Bad Request",
      status: false,
      error: error
    })
  }
}


// Like and Dislike
exports.LikeNDisLike_POST = async (req, res, next) => {
  const feedId = req.body.feed_id;
  const userId = req.user.id;
  try {
    await User.findOne({_id: userId}).exec((err, result)=>{
        if(err) {
            throw new Error(err);
        }
        let name = `${result.firstName} ${result.lastName}`;
        const newData = new FeedLike({
          name : name,
          feed_id: feedId,
          userId: userId
        });
        
        FeedLike.findOne({feed_id: feedId, userId: userId})
        .exec((err, result) => {
            if(err) {
                throw new Error(err);
            }
            console.log(result)
            if(result){
              FeedLike.deleteOne({feed_id: feedId, userId: userId})
              .exec((err, result) => {
                  if(err) {
                    throw new Error(err);
                  }
                  return res.status(200).json({
                      message: "Like deleted successfully",
                      status: true
                  })
              })
            }else{
              newData.save((errLike, data) => {
                if(errLike) {
                    throw new Error(errLike)
                }else{
                    return res.status(200).json({
                      message: 'liked successfully',
                      status: true,
                      result: data
                    })
                }
              })
            }
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

//Total Likes 
exports.TotalFeedLikes_POST = async (req, res, next) => {
  const feedId = req.body.feed_id;
  try{
    await FeedLike.countDocuments({ feed_id: feedId })
    .exec((err, result)=>{
      if(err) {
        throw new Error(err);
      }
      return res.status(200).json({
        message: "Total number of likes for this post",
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

// Liker List By Feed Id
exports.LikerList_POST = async (req, res, next) => {
  const feedId = req.body.feed_id;
  try{
    await FeedLike.find({ feed_id: feedId })
    .populate('userId')
    .sort({ createdAt: -1 })
    .exec((err, result)=>{
      if(err) {
        throw new Error(err);
      }
      return res.status(200).json({
        message: "Total number of likes for this post",
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