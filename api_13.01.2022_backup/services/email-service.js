var nunjucks = require('nunjucks');
var mailTransporter = require('nodemailer').createTransport({
    host: "smtp.zoho.in",
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

const skipMail = false;//if true mail body will be consoled

// const url = config.url;

mailTransporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Mail server is ready to take our messages");
    }
});

var sendEmail = exports.sendEmail = (to, subject, html, from = process.env.GMAIL, attachments = []) => {
    if (skipMail) return html;
    return mailTransporter.sendMail({
        from: `Landlord Admin <${from}>`,
        to: to,
        subject: subject,
        html: html,
        attachments: attachments
    })
}



exports.sendDocumentInEmail = async (to, link, filename) => {
    // let template = await common_provider.getEmailTemplateByName(EMAIL_TEMPLATE.template.forgot_password);
    return new Promise((resolve, reject) => {
        nunjucks.renderString(`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </head>
        <body bgcolor="#ededed">Please find the attachment</body></html>`,
            {link: link}, (err, str) => {
            if (err) reject(err);
            else resolve(sendEmail(to, 'Document ' + filename, str, process.env.GMAIL, [
                {   // use URL as an attachment
                    filename: filename+'.xlsx',
                    path: link
                },
            ]))
        })
    })
}


exports.renderFile = (file, ctx) => {
    return new Promise((res, rej) => {
        nunjucks.render(file, {siteurl: global.config.url, ...ctx}, (err, result) => {
            if (err) rej(err);
            res(result);
        })
    })
}
