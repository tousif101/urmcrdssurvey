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
                                            '<h4>' + "<b><u>"+ "Serial: "+"</u></b>"  +serialNumber + "<br><b><u>"+" Friends: "+"</u></b>"+ friendsList + "<br><b><u>"+" From: "+"</u></b>" +fromPerson + "<br><b><u>"+" Seed: "+"</u></b>" + isSeed +
                                            "<br>"+"<br>"+
                                            ' <button id="'+personId+'" class="btn btn-danger deleteButton" href="#">Delete</button> '                  
                                            
                                            '</h4>'+'</div>';

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

    });

});


    
