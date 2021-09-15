const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "7a9017ac820489", // generated ethereal user
        pass: "0fb225e89b10df", // generated ethereal password
    },
});