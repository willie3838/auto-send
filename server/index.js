const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const allowedOrigins=['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};

app.use(cors(options));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
app.get('/', (req, res) => {    
    res.send("hello");
});

app.post('/send', (req, res) => {
    console.log(req.body);
});

app.post('/authenticate', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: req.body.email,
            pass: req.body.password
        }
    });

    const mailOptions = {
          from: req.body.email,
          to: "willie3838league@gmail.com",
          subject: "test",
          text: "test"
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.send(false);
        }
        else{
            res.send(true);
        }
    });
});

app.listen(5000, () => {
    console.log('Server started...');
});