import { resolveContent } from "nodemailer/lib/shared";
import http from "../http-common";

class EmailService {

    sendEmail(emailContent){
        http.post('/send', emailContent)
    }

    async authenticateEmail(credentials){
        return await http.post('/authenticate', credentials)
    }
    // nodemailer = require("nodemailer");
    // transporter;
    // email;
    // constructor(){}

    // authenticateUser(user, password){
    //     this.email = user;
    //     this.transporter = this.nodemailer.createTransport({
    //         service: "Gmail",
    //         auth: {
    //             user: user,
    //             pass: password
    //         }
    //     });

    //     this.sendMessage('jane.doe@gmail.com', 'test', 'test');
    // }


    // async sendMessage(recipients, subject, text) {
    
    //   const mailOptions = {
    //       from: this.email,
    //       to: recipients,
    //       subject: subject,
    //       text: text
    //   }
    
    //   this.transporter.sendMail(mailOptions, function(error, info){
    //       if(error){
    //           console.log(error);
    //       }
    //       else{
    //           console.log("Email sent")
    //       }
    //   })
    // }
}
export default new EmailService;



