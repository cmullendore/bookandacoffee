const sgMail = require('@sendgrid/mail')
const fs = require("fs");
const utf8 = require ('utf8');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmailConfirmation = function (email, username, confirmUrl) {

    const msg = {
        to: email, // Change to your recipient
        from: 'noreply@bookandacoffee.com', // Change to your verified sender
        subject: 'Welcome to Book and a Coffee',
        text: 'Your browser does not support advanced content',
        html: getConfirmationTemplate(confirmUrl, username)
    }

    
    
    sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
            return {success: false, message: error}
        });
        
    return {success: true, message: 'Email sent'}

}

function getConfirmationTemplate (emailConfirmationCode, username) {
  
  let html = fs.readFileSync("./server/utils/email_templates/confirm_email.html").toString();
  html = html.replace("${username}", username).replace("${emailConfirmationCode}", emailConfirmationCode);
  return html;
}

module.exports = sendEmailConfirmation 
