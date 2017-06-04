$(document).ready(function(){
    function loadUsers(){
           $.ajax({
                type        : 'GET', 
                url         : 'http://0.0.0.0:3000/api/SurveyTakers',
                dataType    : 'json', 
                encode      : true
            })
            .done(function(data, status) {
                console.log(data);

            var bookmarksResults = document.getElementById('bookmarksResults');
            bookmarksResults.innerHTML = '';

            for(var i =0; i<data.length;i++){
                var email = data[i].email;
                var friendsList = data[i].friends;
                var fromPerson = data[i].fromPerson;
                var personId = data[i].id;
                var isSeed = data[i].isSeed;
                var serialNumber = data[i].serialNumber;

                bookmarksResults.innerHTML += '<div class = "well">'  +
                                            '<h3>' + serialNumber + 

                                            ' <button id="'+personId+'" class="btn btn-danger deleteButton" href="#">Delete</button> '                  
                                            
                                            '</h3>'+'</div>';

            }
           
             
        });

    }
  
    function deleteUser(userId){
            console.log("Hello delete");      
           $.ajax({
                type        : 'DELETE', 
                url         : 'http://0.0.0.0:3000/api/SurveyTakers/'+userId,
                dataType    : 'json', 
                encode      : true
            })
            .done(function(data, status) {
                console.log(data);
        });
        

    }

    loadUsers();
    $("#bookmarksResults").on("click",".deleteButton",function(){
             var id = $(this).attr('id'); 
             deleteUser(id);
             location.reload();   
    });

    var createSeedButton = document.getElementById('createSeedButton').addEventListener('click', createSeed);
    function createSeed(){
        $.ajax({
            type        : 'GET', 
            url         : 'http://0.0.0.0:3000/SurveyTakers/createSeed',     
            dataType    : 'json', 
            encode      : true
        })
 
        .done(function(data, status) {
            console.log(data);

        });
        location.reload(); 
        
    }
 



    $('#authorize').submit(function(event) {
        console.log("I made it here");
        var serialNumber = $('input[name=serialNumber]').val().trim(); 

        // $.ajax({
        //     type        : 'GET', 
        //     url         : 'http://0.0.0.0:3000/SurveyTakers/addfriends', 
        //     data        : {serialNumber: serialNumber},    
        //     dataType    : 'json', 
        //     encode          : true
        // })
        
        // .done(function(data, status) {
        //     console.log(data);
        // });
                  
        $.ajax({
            type        : 'GET', 
            url         : 'http://0.0.0.0:3000/SurveyTakers/createnewfriends', 
            data        : {serialNumber: serialNumber},    
            dataType    : 'json', 
            encode      : true
        })
 
        .done(function(data, status) {
            console.log(data);
        });

        //  $.ajax({
        //     type        : 'GET', 
        //     url         : 'http://0.0.0.0:3000/SurveyTakers/sendemail', 
        //     data        : {serialNumber: serialNumber},    
        //     dataType    : 'json', 
        //     encode      : true
        // })
        
        // .done(function(data, status) {
        //     //$("#divdeps").dialog('open');
        //     //http://stackoverflow.com/questions/29102747/ajax-request-passing-dynamic-content-to-modal
        //     //use that link to open up the module with notifcation when user created, 
        //     //when emails are sent
        //     //http://stackoverflow.com/questions/21192763/how-to-dynamically-add-list-items-in-jquery
        //     //http://stackoverflow.com/questions/6322696/deleting-items-from-a-dynamically-generated-list-with-jquery
        //     console.log(data);
        // });

        // $.ajax({
        //     type        : 'GET', 
        //     url         : 'http://0.0.0.0:3000/SurveyTakers/createSeed',     
        //     dataType    : 'json', 
        //     encode      : true
        // })
 
        // .done(function(data, status) {
        //     console.log(data);
        // });
     

        

    });

});


    
