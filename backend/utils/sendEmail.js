const nodeMailer = require('nodemailer')

const sendEmail = async (options) => {

    // const transporter = nodeMailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 456,  /*(correction -> 465)*/
    //     service: 'gmail',
    //     auth: {
    //         user: 'upworkharsh1@gmail.com',
    //         pass: 'wYsLyFgUyFv8CTMd@',
    //     },
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: true,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },

    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail;