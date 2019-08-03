var firebaseConfig = {
    apiKey: "AIzaSyDb7BrvRtrx6PBjohpxg2pPoCTscwlmOdU",
    authDomain: "train-activity-basic-7155c.firebaseapp.com",
    databaseURL: "https://train-activity-basic-7155c.firebaseio.com",
    projectId: "train-activity-basic-7155c",
    storageBucket: "",
    messagingSenderId: "452844750484",
    appId: "1:452844750484:web:6db8301d51a6ef99"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$('button').on('click', function (event) {
    event.preventDefault();
    var trainName = $('#trainName').val().trim();
    var trainDestination = $('#destination').val().trim();
    var firstTrain = $('#firstTrain').val().trim();
    var frequency = $('#frequency').val().trim();

    var con = database.ref('/train').push({
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrain: firstTrain,
        frequency: frequency
    });
});

database.ref('/train').on('child_added', function (snapshot) {
    var row = $('<tr>');
    var currentDate = moment();

    var trainName = snapshot.val().trainName;
    var trainDestination = snapshot.val().trainDestination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var convertFirstTrain = moment(firstTrain, "hh:mm A").subtract(1, "years");
    var currentTime = moment().format("HH:mm");
    var difference = moment().diff(moment(convertFirstTrain),"minutes");
    var timeLeft = difference % frequency;
    var minutesAway = frequency - timeLeft;
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm a");

    row.append($('<td>' + trainName + '</td>'));
    row.append($('<td>' + trainDestination + '</td>'));
    row.append($('<td>' + frequency + '</td>'));
    row.append($('<td>' + nextTrain + '</td>'));
    row.append($('<td>' + minutesAway + '</td>'));

    $('#tableBody').append(row);
});