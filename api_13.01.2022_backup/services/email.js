const nodeMailer = require('nodemailer');

// Creating Transporter for sending OTP in the email. 
// module.exports = nodeMailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.GMAIL,
//         pass: process.env.GMAIL_PASSWORD
//     }
// });

module.exports = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    debug: true,
      tls:{
        rejectUnauthorized:false
      },
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});
