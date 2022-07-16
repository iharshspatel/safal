const nodeMailer = require('nodemailer')

const sendEmail = async (options)=>{
   
    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:456,
        service:'gmail',
        auth:{
            user:'upworkharsh1@gmail.com',
            pass:'wYsLyFgUyFv8CTMd@',
        }

    })

    const mailOptions = {
        from:'upworkharsh1@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail;