const {validationResult, matchedData } = require('express-validator'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      transporter = require('../../services/email');

//Databases
const User = require('../../models/usermodel/user');
var logoURL = process.env.baseURL + 'image/logo.png';


//Landlord Login
exports.Login_POST = async (req, res, next) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    } else {
        try {
            const userData = await User.findOne({
                email: req.body.email
            }).select('_id password userType userTypeCode email userName firstName lastName')
            if(!userData) {
                return res.status(200).json({
                    message: "Please login with your registered email",
                    status: false
                });
            }
    
            const checkPassword = await bcrypt.compare(
                req.body.password,
                userData.password
            );
            if (!checkPassword) {
                return res.status(200).json({
                    message: "That’s not the right password",
                    status: false
                });
            } else {
                const token = jwt.sign({
                    email: userData.email,
                    id: userData._id
                },
                process.env.JWT_KEY
                );
    
                return res.status(200).json({
                    message: "Login Successful",
                    status: true,
                    result: userData,
                    token: token
                });
            }    
        } catch (error) {
            return res.status(400).json({
                message: "Bad Request",
                status: false,
                error: error
            });
        }   
    }
}

// Landlord Register
exports.Register_POST = async (req, res, next) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    } else {
        const userData = await User.findOne({
            email: req.body.email
        })

        if(userData) {
            return res.status(200).json({
                message: 'Email is already registered',
                status: false
            })
        }

        const userData1 = await User.findOne({
            userName: req.body.userName
        })

        if(userData1) {
            return res.status(200).json({
                message: 'UserName is already registered',
                status: false
            })
        }

        //const RAND = Math.floor(100000 + Math.random() * 900000);
        const hash = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            userType: "6144a5c6ba020d9576d5ec44",
            userTypeCode: "U",
            password: hash
        })

        try {
            newUser.save((err, data) => {
                if(err) {
                    throw new Error(err)
                }else{
                    return res.status(200).json({
                        message: 'You have successfully registered, please login',
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

// Verify OTP
exports.Verify_POST = async (req, res, next) => { 

    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    } else {
        const userData = await User.findOne({
            username: req.body.username
        });

        if(!userData) {
            return res.status(200).json({
                message: "Email is not registred",
                status: false
            });
        }

        if(!(userData.OTP === req.body.OTP)) {
            return res.status(200).json({
                message: 'OTP is not correct',
                status: false
            })
        }

        const token = jwt.sign({
            username: userData.username,
            id: userData._id
        }, process.env.JWT_KEY);

        try {
            await User.updateOne(
                { username: userData.username },
                { $set: {isVerified: true} }
            ).exec(() => {
                return res.status(200).json({
                    message: 'User Verified',
                    status: true,
                    token: token
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

// FORGET PASSWORD (Username)
exports.Forget_POST = async (req, res, next) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {

        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    } else {
        const userData = await User.findOne({
            email: req.body.email
        });
       // return res.send(userData);
        if(!userData) {
            return res.status(200).json({
                message: "Email is not registered",
                status: false
            });
        }
        
        
        // const hash = bcrypt.hash(RAND, 10);
        // const updateOtp = {
        //     password: RAND
        // }

        // for(const field in Object.keys(updateOtp)) {
        //     updateOtp[field.propName] = field.value
        // }
        //const RAND = Math.floor(100000 + Math.random() * 900000);
        var randomChar = Math.random().toString(36).substr(2, 5);
        let name = userData.firstName+" "+userData.lastName
        const mailOptions = {
            from: "Find My Fight <noreply.en2ourage@gmail.com>",
            to : userData.email,
            subject : "Reset Password - Find My Fight",
            html: '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body bgcolor="#ededed"><table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ededed" ><tr><td><table width="60%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" align="center" style="border:1px solid #ededed; box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25); margin: auto;"><tr><td valign="top" align="center" style="padding: 15px"></td></tr><tr><td valign="top" style="padding: 40px;" height="200">Hello ' + name +',<br><br>Welcome to Find My Fight App,<br><br>Your account password reset successfully. Please login your account using the code:<br><br><span style="text-align: center; font-size: 24px"> '+ randomChar +'</span <br><br>Please login to the App to check for more details.<br><br> Thank you<br>Find My Fight</td></tr><tr><td style="padding: 15px" align="center" bgcolor="#FFF"><p style="font-family: Ebrima; font-size: 14px">106, CMH, Tezpur University<br>Assam, INDIA - 784028</p></td></tr></table></td></tr></table></body></html>'  
        }

        try {
            //return res.send(userData);
            await transporter.sendMail(mailOptions);
            let hash = await bcrypt.hash(randomChar, 10);
            //return res.send({hashh: hash});
            let updateData = await User.findByIdAndUpdate(userData._id, {password: hash}, {new: true});
            return res.status(200).json({
                message: "You have received an email to your registered EmailId",
                status: true,
                result: updateData
            })
        } catch (error) {
            return res.status(400).json({
                message: "Bad request",
                status: false,
                errors: error
            })
        }
    }
}

// RESET PASSWORD
exports.Forget_Reset_POST = async (req, res, next) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if(!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        })
    } else {
        let result;
        if (req.body.token) {
            const token = req.body.token
            try {
                result = await jwt.verify(token, process.env.JWT_KEY);
                req.user = result;

                const userData = await User.findOne({
                    username: req.user.username
                })

                if(!userData) {
                    return res.status(200).json({
                        message: "Username is not registred",
                        status: false
                    });
                }

                if(!(userData.isVerified)) {
                    return res.status(200).json({
                        message: "Please verify your email id with OTP",
                        status: false
                    })
                }

                const hash = await bcrypt.hash(req.body.newPassword, 10);

                await User.updateOne(
                    { username: req.user.username },
                    {$set: {password: hash}}
                ).exec((err) => {
                    if(err) {
                        throw new Error(err)
                    }
                    return res.status(200).json({
                        message: 'Password has been updated successfully',
                        status: true
                    }) 
                })
            } catch (err) {
                return res.status(400).json({
                    message: 'Bad Request',
                    status: false,
                    errors: err
                })
            }
        } else {
            return res.status(200).json({
                message: "Token is required",
                status: false
            })
        }
    }
}

        