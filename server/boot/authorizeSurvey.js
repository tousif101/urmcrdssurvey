'use strict';
module.exports = function(app) {
  var uuid = require('node-uuid');
  const nodemailer = require('nodemailer');
  var randomstring = require('randomstring');
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

function checkDataBase(id){
     Surveytaker.find({where: {'serialNumber': id}}, function(err, instance){
            if(instance == null){
                return false
            }
            else{
                return true
            }
     });
}

function createSerialNumber()
{
    var serial1 = randomstring.generate(5);
    var serialIds = [];
    if(!checkDataBase(serial1))
    {
        serialIds.push(serial1)
    }else if (checkDataBase(serial1))
    {
        serial1 = randomstring.generate(5)
        if(!checkDataBase(serial1))
        {
            serialIds.push(serial1)
        }
    }else
    {
        serial1 = serial1 + "1"
        serialIds.push(serial1)
    }
    return serialIds[0];
}

function createThreeSerialNumbers(){
    var serial1 = randomstring.generate(5);
    var serial2 = randomstring.generate(5);
    var serial3 = randomstring.generate(5);

    var serialIds = [];
    if(!checkDataBase(serial1))
    {
        serialIds.push(serial1)
    }else if (checkDataBase(serial1))
    {
        serial1 = randomstring.generate(5)
        if(!checkDataBase(serial1))
        {
            serialIds.push(serial1)
        }
    }else
    {
        serial1 = serial1 + "1"
        serialIds.push(serial1)
    }

    if(!checkDataBase(serial2))
    {
        serialIds.push(serial2)
    }else if (checkDataBase(serial2))
    {
        serial2 = randomstring.generate(5)
        if(!checkDataBase(serial2))
        {
            serialIds.push(serial2)
        }
    }else
    {
        serial2 = serial2 + "1"
        serialIds.push(serial2)
    }

    if(!checkDataBase(serial3))
    {
        serialIds.push(serial3)
    }else if (checkDataBase(serial3))
    {
        serial3 = randomstring.generate(5)
        if(!checkDataBase(serial3))
        {
            serialIds.push(serial3)
        }
    }else
    {
        serial3 = serial3 + "1"
        serialIds.push(serial3)
    }
    return serialIds;

    // var serialToAdd1 = serialIds[0];
    // var serialToAdd2 = serialIds[1];
    // var serialToAdd3 = serialIds[2]; 

}  

function createNewSeed(uuid){
      var friend = {
                    email: "",
                    serialNumber: uuid,
                    isSeed: true,
                    surveyCompleted: false,
                    fromPerson: "",
                    friends: [],
                    surveyStarted: false
                }
    return friend; 
  }


router.get('/SurveyTakers/createSeed',function(req,res){
    var id = createSerialNumber();
    var user = createNewSeed(id);
    Surveytaker.create(user, function(err, object){
        console.log(object);
        var response = {
            "message" : "New Seed Made " + object.serialNumber,
            "serialNumber": object.serialNumber,
            "response": 200,
        }     
        console.log(response);
        res.send(response);       
    }); 
});


  function createNewUsers(serialNumber,uuid){
      var friend = {
                    email: "",
                    serialNumber: uuid,
                    isSeed: false,
                    surveyCompleted: false,
                    fromPerson: serialNumber,
                    friends: [],
                    surveyStarted: false
                }
    return friend; 
  }

  router.get('/SurveyTakers/createnewfriends', function(req, res) {
    var serialNumber = req.query.serialNumber;

    var serialList = createThreeSerialNumbers();
    var serialToAdd1 = serialList[0];
    var serialToAdd2 = serialList[1];
    var serialToAdd3 = serialList[2];
    
    var user; 
    Surveytaker.find({where: {'serialNumber': serialNumber}}, function(err, instance){
            if(instance.length == 0){
                var response = {
                    "message" : "Could not find",
                    "response": 401
                }
                res.send(response);
            }
            else{
              

                user = (instance[0])
                var newUuid = user.friends[0]

                user.friends.push(serialToAdd1);
                user.friends.push(serialToAdd2);
                user.friends.push(serialToAdd3);
                user.save(function(err, object){
                    if(err){
                            console.log(err);
                    }else{
                        console.log(object);
                    }
                });
           
                var user1 = createNewUsers(serialNumber,serialToAdd1)
                var user2 = createNewUsers(serialNumber,serialToAdd2)
                var user3 = createNewUsers(serialNumber,serialToAdd3)

                console.log(user.friends[0])
                console.log(serialToAdd1)
                console.log(user.friends[1])
                console.log(serialToAdd2)
                console.log(user.friends[2])
                console.log(serialToAdd3)


                Surveytaker.create(user1, function(err, object){
                    console.log(object);
                }); 
                Surveytaker.create(user2, function(err, object){
                    console.log(object);
                }); 

                Surveytaker.create(user3, function(err, object){
                    console.log(object);
                }); 

                var email = user.email;
                console.log("The users email is "+email)

                var codeList = [serialToAdd1,serialToAdd2,serialToAdd3]
                console.log(codeList)
                for(var i = 0; i< codeList.length; i++){
                    var uuid = codeList[i];
                    
                    var mailOptions = {
                        from: '"RDS" <foo@rdsprojecttest@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject: 'Please Send Code to a Friend', // Subject line
                        text: "Invitation to take New York State Deaf Health Survey. Please code:  " + uuid +  "."
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                }

                var response = {
                    "message" : "Added friends into DB" ,
                    "response": 200
                }

                res.send(response);
            }
        });
  });

 

app.use(router);
}
