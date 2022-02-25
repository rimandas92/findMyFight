// IMPORTED ALL THE SCHEMA
const User = require('../../models/usermodel/user');
const Newsfeed = require('../../models/usermodel/newsfeed');
const { validationResult, matchedData } = require('express-validator'),
      bcrypt = require('bcrypt');
    
exports.Getprofiledetail_GET = async (req, res, next) => { 
  //console.log("=====");
  try {
    await User.findOne({
      _id: req.user.id
    })
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

exports.UpdateProfile_POST = async (req, res, next) => {
  const errors = validationResult(req);
  const user = matchedData(req);
  if(!errors.isEmpty()) {
    return res.status(200).json({
      message: errors.array()[0].msg,
      status: false,
      result: user
    })
  } else {
    const id = req.user.id;

    const oldProfile = await User.findOne({
      _id: id
    })

    const UpdateField = {
      bio: req.body.bio,
      phoneNo: req.body.phoneNo,
      location: req.body.location,
      description_1: req.body.description_1,
      description_2: req.body.description_2,
      description_3: req.body.description_3,
      description_4: req.body.description_4,
      image: req.file ? req.file.filename : oldProfile.image,
    }

    for(const field in Object.keys(UpdateField)) {
      UpdateField[field.propName] = field.value
    }

    try {
      await User.updateOne({
      _id: id
      }, {$set: UpdateField})
      .exec((err) => {
        if(err) {
          throw new Error(err)
        }

        return res.status(200).json({
          message: 'Profile has been updated successfully',
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
}


//Change password
exports.Change_Password_POST = async (req, res, next) => {
  const errors = validationResult(req);
  const user = matchedData(req);
  if(!errors.isEmpty()) {
    return res.status(200).json({
      message: errors.array()[0].msg,
      status: false,
      result: user
    })
  } else {
    const id = req.user.id
    const userData = await User.findOne({
      _id: id
    });

    if(!userData) {
      return res.status(200).json({
        message: "Username is not registred",
        state: false
      })
    }

    const hash = await bcrypt.hash(req.body.newPassword, 10);
    try {
      await User.updateOne({
          _id: id
        }, {
          $set: {password: hash}
        })
        .exec((err) => {
          if(err) {
            throw new Error(err)
          }

         return res.status(200).json({
            message: 'Password has been updated successfully',
            status: true
          })
        })
    } catch (error) {
      return res.status(400).json({
        message: 'Bad request',
        status: false,
        error: error     
      })
    }
  }
}

// Create Newsfeed
exports.Newsfeed_POST = async (req, res, next) => {
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
        image: req.file.filename,
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