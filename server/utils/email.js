const sgMail = require('@sendgrid/mail')
const fs = require("fs");
const utf8 = require ('utf8');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmailConfirmation = function (email, username, confirmUrl) {
    console.log("building email");
    const msg = {
        to: email, // Change to your recipient
        from: 'noreply@bookandacoffee.com', // Change to your verified sender
        subject: 'Welcome to Book and a Coffee',
        text: 'Your browser does not support advanced content',
        html: getConfirmationTemplate(confirmUrl, username)
    }
    console.log("sending email");
    
    
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
            return {success: false, message: error}
        });
        
    console.log("done sending email");

    return {success: true, message: 'Email sent'}

}

function getConfirmationTemplate (emailConfirmationCode, username) {
  
  let html = fs.readFileSync("./server/utils/email_templates/confirm_email.html").toString();
  html = html.replace("${username}", username).replace("${emailConfirmationCode}", emailConfirmationCode);
  return html;
}

module.exports = sendEmailConfirmation 
