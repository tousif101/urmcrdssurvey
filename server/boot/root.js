'use strict';
module.exports = function(app) {
  const uuidV1 = require('uuid/v1');
  const nodemailer = require('nodemailer');


  var router = app.loopback.Router();

  var Surveytaker = app.models.SurveyTaker;


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rdsprojecttest@gmail.com',
        pass: 'rdsproject'
    }
});


  router.get('/SurveyTakers/emailadmin', function(req, res) {
    
    var serialNumber = req.query.serialNumber;
    console.log("Admin Serial Number is " + serialNumber)
     Surveytaker.find({where: {'serialNumber': serialNumber}}, function(err, instance){
            if(err){
                var response = "Sorry serial number not in database"
                console.log(response);
                res.send("Hello");
            }
            if(instance.length == 0){
                var response = {
                    "email" : "Could not find",
                    "response": 401
                }
                res.send(response);
                console.log(response);
            }
            else{
                var userEmail = (instance[0]).email
                var userSerialNumber = (instance[0]).serialNumber
                var mailOptions = {
                  from: '"RDS" <foo@rdsprojecttest@gmail.com>', // sender address
                  to: 'vjsncr@rit.edu', // list of receivers
                  subject: 'Survey Started', // Subject line
                  text: userSerialNumber + " started survey. Email is " + userEmail   // plain text body
                  //html: '<b>Hello world ?</b>' // html body
              };
                var response = {
                    "email" : "Email Sent to Admin",
                    "response": 200
                }

                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message %s sent: %s', info.messageId, info.response);
                });
                res.send(response);
                console.log(response);
            }
        });
  });

  app.use(router);
}
