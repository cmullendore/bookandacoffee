const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmailConfirmation = function (recipient, emailCode) {
    const msg = {
        to: recipient, // Change to your recipient
        from: 'chris@bookandacoffee.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>Please click this link: <a href="${emailCode}">Click Here</a></strong>`,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

}

module.exports = { sendEmailConfirmation }
