
function ValidateEmail(inputText)  
{  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
    if(inputText.value.match(mailformat)){  
        return true;  
    }  
    else {  
        return false;  
    }  
}
//Use this function to check for email validation. check later. 

$(document).ready(function(){
     $('form').submit(function(event) {

        var email = $('input[name=email]').val().trim()

        var formData = {
            'serialNumber'      : $('input[name=serialNumber]').val().trim(),
            'email'             : $('input[name=email]').val().trim(),
        };

        var serialnumber = $('input[name=serialNumber]').val().trim();

        var confirmEmail = $('input[name=emailConfirm]').val().trim();


        if(email == ""){
            $('#email-group').addClass('has-error'); 
            $('.email-block-error').show();
            return false
        }
        if(serialnumber == ""){
            $('#name-group').addClass('has-error'); 
            $('.help-block').show();
        }
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (pattern.test(email) == false){
            $('#email-group').addClass('has-error'); 
            $('.email-block-error').show();
            return false
        }

        if(email != confirmEmail){
            $('#emailconfirm-group').addClass('has-error'); 
            $('.email-confirm-block-error').show();
            return false
        }
        
        $.ajax({
            type        : 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://0.0.0.0:3000/api/SurveyTakers/insertemail', // the url where we want to POST
            dataType    :  'json',
            data        : formData,    
            dataType    : 'json', // what type of data do we expect back from the server
                         encode          : true
        })
            // using the done promise callback
            .done(function(data, status) {
            });

        $.ajax({
            type        : 'GET', // define the type of HTTP verb we want to use 
            url         : 'http://0.0.0.0:3000/api/SurveyTakers/getemail', 
            data        : {serialNumber: serialnumber},    
            dataType    : 'json', // what type of data do we expect back from the server
            encode          : true
        })
            // using the done promise callback
            .done(function(data, status) {
                if(data.email.response != 200){
                    $('#name-group').addClass('has-error'); 
                    $('.help-block').show();
                }
                else{
                        $.ajax({
                            type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
                            url         : 'http://0.0.0.0:3000/api/SurveyTakers/surveystarted', // the url where we want to POST
                            data        : {serialNumber: serialnumber},    
                            dataType    : 'json', // what type of data do we expect back from the server
                                        encode          : true
                        })
                        .done(function(data, status) {
                            console.log("SENT")
                        });

                        $.ajax({
                            type        : 'GET', 
                            url         : 'http://0.0.0.0:3000/SurveyTakers/emailadmin', // the url where we want to POST
                            data        : {serialNumber: serialnumber},    
                            dataType    : 'json', // what type of data do we expect back from the server
                                        encode          : true
                        })
                        .done(function(data, status) {
                            console.log(data);
                            console.log("SENT")
                        });
                    window.location.href = "https://signsurvey.urmc.rochester.edu/survey.html?surveyID=217&Preview=1";



                    // $('#myModal').modal('show'); 

                    // var test = $("div.modal-content").find("a");
                    // test.click(function(e){
                    //     $.ajax({
                    //         type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
                    //         url         : 'http://0.0.0.0:3000/api/SurveyTakers/surveystarted', // the url where we want to POST
                    //         data        : {serialNumber: serialnumber},    
                    //         dataType    : 'json', // what type of data do we expect back from the server
                    //                     encode          : true
                    //     })
                    //     .done(function(data, status) {
                    //     });

                    //     $.ajax({
                    //         type        : 'GET', 
                    //         url         : 'http://0.0.0.0:3000/SurveyTakers/emailadmin', // the url where we want to POST
                    //         data        : {serialNumber: serialnumber},    
                    //         dataType    : 'json', // what type of data do we expect back from the server
                    //                     encode          : true
                    //     })
                    //     .done(function(data, status) {
                    //         console.log("yaaah i reached here");
                    //         console.log(data);
                    //         location.reload(true);
                    //     });
                    // });
                }
            });
        

        event.preventDefault();
    });
});