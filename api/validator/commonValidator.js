const { body } = require('express-validator');

exports.RegisterVal = [
  body('firstName').not().isEmpty().withMessage('First name should not be empty').isLength({min: 2, max: 12}).withMessage('First name must have greater then 2 and less then 12 chars long').trim(),
  body('lastName').isLength({ min: 2, max: 18}).withMessage('Last name must have greater then 2 and less then 18 chars long').trim(),
  body('email').not().isEmpty().withMessage('Email should not be empty').isEmail().withMessage('Email must be follow the proper format').isLength({min: 5, max: 45}).withMessage('Email must have greater then 5 and less then 45 chars long'),
  body('userName').not().isEmpty().withMessage('Username should not be empty').isLength({min: 5, max: 15}).withMessage('Username must have greater then 5 and less then 15 chars long'),
  body('password').not().isEmpty().isLength({min: 4, max: 18}).trim().withMessage('Password must have greater then 4 and less then 18 chars long').matches(/\d/).withMessage('Password must contain a number'),    
  body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password does not match');
      }
      return true
  })
]

exports.LoginVal = [
    body('email').not().isEmpty().withMessage('Email should not be empty').isEmail().withMessage('Email must be follow the proper format').isLength({min: 5, max: 45}).withMessage('Email must have greater then 5 and less then 45 chars long').trim(),
    body('password').not().isEmpty().isLength({min: 4, max: 18}).trim().withMessage('Password must have greater then 4 and less then 18 chars long').matches(/\d/).withMessage('Password must contain a number'),    
]

exports.ProfileVal = [
  body('firstName').not().isEmpty().withMessage('First name should not be empty').isLength({min: 2, max: 12}).withMessage('First name must have greater then 2 and less then 12 chars long').trim()
]

exports.VerifyVal = [
  body('username').not().isEmpty().withMessage('Username should not be empty').isEmail().withMessage('Username must be follow the email formet').isLength({min: 5, max: 45}).withMessage('Username must have greater then 5 and less then 45 chars long').trim(),
  body('OTP').not().isEmpty().withMessage('Please enter your OTP').isLength({min: 4, max: 7}).withMessage("OTP should be 4 to 7 interger long").matches(/\d/).withMessage('OTP must be integer').trim()
]

exports.ForgetVal = [
  body('email').not().isEmpty().withMessage('Email should not be empty').isEmail().withMessage('Email must be follow the proper format').isLength({min: 5, max: 45}).withMessage('Email must have greater then 5 and less then 45 chars long').trim()
] 

exports.ForgetResetVal = [
  // body('username').not().isEmpty().withMessage('Username should not be empty').isEmail().withMessage('Username must be follow the email formet').isLength({min: 5, max: 45}).withMessage('Username must have greater then 5 and less then 45 chars long'),
  body('newPassword').not().isEmpty().isLength({min: 4, max: 18}).trim().withMessage('Password must have greater then 4 and less then 18 chars long').matches(/\d/).withMessage('Password must contain a number'),    
  body('newConfirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true
  })
]

exports.ChangePasswordVal = [
  body('newPassword').not().isEmpty().isLength({min: 4, max: 18}).trim().withMessage('Password must have greater then 4 and less then 18 chars long').matches(/\d/).withMessage('Password must contain a number'),    
  body('newConfirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true
  })
]

exports.NewsfeedVal = [
  body('title').not().isEmpty().withMessage('Title name should not be empty')
]

exports.forumVal = [
  body('topic').not().isEmpty().withMessage('Topic can not be empty'),
  body('content').not().isEmpty().withMessage('Content can not be empty')
]


exports.eventVal = [
  body('title').not().isEmpty().withMessage('Title can not be empty'),
  body('venue').not().isEmpty().withMessage('Venue can not be empty'),
  body('eventDate').not().isEmpty().withMessage('Event Date can not be empty')
]


exports.storyVal = [
  body('text').custom((value, { req }) => {
    if (value !== req.body.text && (!req.files)) {
      throw new Error('Either post Text or Media');
    }
    return true
  }),
]
