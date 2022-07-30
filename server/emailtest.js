
const { sendEmailConfirmation } = require("./utils/email")

console.log("Starting");

console.log("sending email");

sendEmailConfirmation('chris@vindage.com', 'code1234');