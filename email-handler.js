import nodemailer from "nodemailer";
import * as helper from './helpers.js';
import * as configs from './configs.js';

export function prepareMailSender(){
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: configs.EMAIL,
        pass: configs.EMAIL_PASS
        }
    });
}
  
export function sendMail(transporter, subject, message){
    if (transporter == null){
        helper.log("Email not sent as transporter is null")
        return
    }
    
    const mailOptions = {
    from: configs.EMAIL,
    to: configs.EMAIL,
    subject: subject,
    text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        helper.log(error);
    } else {
        helper.log('Email sent: ' + info.response);
    }
    }); 
}
