const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const port = process.env.PORT || 8000;
const app = express();

const allowedOrigins=['http://localhost:3005'];
const options = {
    origin: allowedOrigins
};

app.use(cors(options));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.post('/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: req.body.email,
            pass: req.body.password
        }
    });

    let recipients = req.body.recipients.split(",");
    let names = req.body.names.split(",");
    let positions = req.body.positions.split(",");


    for(let i = 0; i < recipients.length; i++){
        let message = req.body.message.replace("{name}", names[i])
                                      .replace("{position}", positions[i]);

        const mailOptions = {
            from: req.body.email,
            to: recipients[i],
            subject: req.body.subject,
            cc: req.body.cc,
            bcc: req.body.bcc,
            text: message,
        }

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.send(false);
                console.log(error);
            }
            else{
                res.send(true);
            }
        });
    }
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

app.listen(port, () => {
    console.log('Server started...');
});