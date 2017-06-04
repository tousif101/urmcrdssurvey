'use strict';

var validator = require('validator');

module.exports = function(Surveytaker) {

    Surveytaker.getEmail = function(serialNumber,cb){
        Surveytaker.find({where: {'serialNumber': serialNumber}}, function(err, instance){
            if(err){
                var response = "Sorry serial number not in database"
                cb(null,response);
                console.log(response);
            }
            if(instance.length == 0){
                var response = {
                    "message" : "Could not find user",
                    "response": 401,
                    "serialNumber": serialNumber
                }
                cb(null,response);
                console.log(response);
            }
            else{
                var response = {
                    "email" : (instance[0]).email,
                    "response": 200
                }
                cb(null,response);
                console.log(response);
            }
        });
    }

    Surveytaker.remoteMethod(
        'getEmail',
        {
            http: {path: '/getemail', verb: 'get'},
            accepts: {arg: 'serialNumber', type: 'string', http: { source: 'query' } }, 
            returns: {arg:'email', type: 'object'}           
        }
    );

    Surveytaker.insertEmail = function(data,cb){
        var serialNumber = data.serialNumber;
        var email = data.email;

        Surveytaker.find({where: {'serialNumber': serialNumber}}, function(err, instance){
            if(err){
                var response = "Sorry serial number not in database"
                cb(null,response);
                console.log(response);
            }
            if(instance.length == 0){
                var response = {
                    "email" : "Could not find",
                    "response": 401,
                    "serialNumber": serialNumber
                }
                cb(null,response);
                console.log(response);
            }
            else{
                var user = (instance[0]);
                if(user.email == ''){
                    console.log(user.email);
                    user.email = email;
                    console.log(user.email)
                    console.log(user.id)
                    user.save(function(err, object){
                        console.log(object);
                    });

                    response = {
                        message:"Email Added",
                        code: 200
                    };
                    cb(null,response);
                }else {
                    response = {
                        message:"User Has Email",
                        code: 200
                    };
                    cb(null,response);
                }
            }
        });
    }
    Surveytaker.remoteMethod(
        'insertEmail',
        {
            http: {path: '/insertemail', verb: 'put', status:201},
            
            accepts: { arg: 'data', type: 'object', http: { source: 'body' } }, 
           returns: {type: 'object', root: true}           
        }
    );


    Surveytaker.getStartedUsers = function(cb){
        Surveytaker.find({where: {'surveyStarted': true}}, function(err, instance){
            if(err){
                var response = "Sorry serial number not in database"
                cb(null,response);
                console.log(response);
            }
            if(instance.length == 0){
                var response = {
                    "email" : "No users started",
                    "response": 401
                }
                cb(null,response);
                console.log(response);
            }
            else{
                var startedUser = [];
                for(var i = 0; i<instance.length; i++){
                    startedUser.push(instance[i])
                }
                var response = startedUser
                cb(null,response);
                console.log(response);
            }
        });
    }

    Surveytaker.remoteMethod(
        'getStartedUsers',
        {
            http: {path: '/getstarted', verb: 'get'},
           returns: {type: 'object', root: true}            
        }
    );



    Surveytaker.surveyStarted = function(serialNumber,cb){
        Surveytaker.find({where: {'serialNumber': serialNumber}}, function(err, instance){
            if(err){
                var response = "Sorry serial number not in database"
                cb(null,response);
                console.log(response);
            }
            if(instance.length == 0){
                var response = {
                    "email" : "No users started",
                    "response": 401
                }
                cb(null,response);
                console.log(response);
            }
            else{
                var user = (instance[0]);
                user.surveyStarted = true;
                user.save(function(err, object){
                         console.log(object);
                });
                var response = {
                    "message" : "User Started",
                    "response": 200
                }
                cb(null,response);
                console.log(response);
            }
        });
    }

    Surveytaker.remoteMethod(
        'surveyStarted',
        {
            
            http: {path: '/surveystarted', verb: 'get'},
            accepts: {arg: 'serialNumber', type: 'string', http: { source: 'query' } }, 
            returns: {type: 'object', root: true}              
        }
    );
























};  
