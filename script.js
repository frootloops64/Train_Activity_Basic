$(document).readd(function() {

    var firebaseConfig = {



    };

    firebase.initialiseApp(firebaseConfig);
    var database = firebase.database();

    $('button').on('click', function (event) {
        event.preventDefault();
        var trainName = 
        var trainDestination = 
        var firstTrainTime = 
        var trainFrequency = 

        var con = database.ref('/train').push({
            trainName: trainName,
            
        });


    });

















});