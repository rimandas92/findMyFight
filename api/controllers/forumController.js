// IMPORTED ALL THE SCHEMA
const Forum = require('../models/forumModel');
const { validationResult, matchedData } = require('express-validator'),
      bcrypt = require('bcrypt');
// const { populate } = require('../../models/usermodel/usertype');
    

// Create Newsfeed
exports.addForum_POST = async (req, res, next) => {
//   console.log("files", req.file);
  const errors = validationResult(req);
  const forumcheck = matchedData(req);
  if (!errors.isEmpty()) {
      return res.status(200).json({
          message: errors.array()[0].msg,
          status: false,
          result: forumcheck
      });
  } else {
    const newData = new Forum({
        topic: req.body.topic,
        content: req.body.content,
        userId: req.user.id
    })

    try {
        newData.save((err, data) => {
            if(err) {
                throw new Error(err)
            }else{
                return res.status(200).json({
                    message: 'Your forum saved successfully',
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

// Get All Forum
exports.AllForum_GET = async (req, res, next) => {
  try {
    await Forum.find()
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
  } catch (error) {
    return res.status(400).json({
      message: "Bad Request",
      status: false,
      error: error
    })
  }
}

// Get Forum By User Id
exports.ForumByUserId_GET = async (req, res, next) => {
    try {
      await Forum.find({userId: req.user.id})
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
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
        status: false,
        error: error
      })
    }
  }

// Update Forum
  exports.EditForum_POST = async (req, res, next) => {
    const errors = validationResult(req);
    const forumcheck = matchedData(req);
    if(!errors.isEmpty()) {
      return res.status(200).json({
        message: errors.array()[0].msg,
        status: false,
        result: forumcheck
      })
    } else {
      const id = req.user.id;
      const forumId = req.body.forum_id;
  
      const UpdateField = {
        topic: req.body.topic,
        content: req.body.content
      }
  
      for(const field in Object.keys(UpdateField)) {
        UpdateField[field.propName] = field.value
      }
  
      try {
        await Forum.updateOne({
        _id: forumId
        }, {$set: UpdateField})
        .exec((err) => {
          if(err) {
            throw new Error(err)
          }
  
          return res.status(200).json({
            message: 'Forum has been updated successfully',
            status: true,
            _id: forumId
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
  }

  exports.DeleteForum_POST = async (req, res, next) => {
    try {
      const forumId = req.body.forum_id;
      const userId = req.user.id;
      await Forum.deleteOne({_id: forumId, userId: userId})
      .exec((err, result) => {
        if(err) {
          throw new Error(err);
        }
  
        return res.status(200).json({
          message: "Forum deleted successfully",
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