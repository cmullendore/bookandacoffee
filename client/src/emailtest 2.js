const fs = require("fs");

//const { sendEmailConfirmation } = require("utils/email")
console.log(fs.realpathSync("."));
console.log("Starting");

console.log("sending email");
console.log(fs.realpathSync("utils/email"));
//sendEmailConfirmation('chris@vindage.com', 'code1234', 'Steve');