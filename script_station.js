// Station Page Logic
const stations = [
    {
        id: "1",
        team: "1",
        number: "1",
        answer: "banana",
        clue: "Voici la consigne pour la station 1.",
        nextLocation: "Station 2 is under the oak tree." 
    },
    {
        id: "2",
        team: "2",
        number: "1",
        answer: "234",
        clue: "This is the clue for station 2.",
        nextLocation: "Station 2 is across the bridge."
    },
    // Add more station objects as needed
];

function getStationById(id) {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === id) {
            return stations[i];
        }
    }
    return null; // Return null if no station with the given ID is found
}



document.addEventListener("DOMContentLoaded", function() {
    // const stationAnswers = {
    //     "1": "banana",
    //     "2": "234"
    // };

    // Get the station ID from the URL parameter
    let stationId = getParameterByName("station");

    // Get the station based on the ID
    const station = getStationById(stationId);

    // Set the station number in the title
    document.getElementById("stationNumber").textContent = station.number;

    // Set the clue text for the current station
    document.getElementById("clueText").textContent = getClueText(station);

    // Set the team number for the current station
    document.getElementById("team").textContent = station.team;

    // Set the team number to colour the team element
    const teamInfoElement = document.getElementById("teamInfo");
    teamInfoElement.classList.add("team" + station.team);



    // Add event listener for the submit button
    document.getElementById("submitButton").addEventListener("click", function() {
        let answer = document.getElementById("answerInput").value.trim().toLowerCase();
        if (answer === station.answer) {
            document.getElementById("validationResult").textContent = "Correct answer! Proceed to the next clue.";
            revealNextLocation(station);
        } else {
            document.getElementById("validationResult").textContent = "Incorrect answer. Try again!";
        }
    });
});

// Function to get the clue text for the current station
function getClueText(station) {
    // You can customize this function to return different clues for each station
    // For now, let's just return a placeholder clue
    return station.clue;
}

// Function to extract URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Function to reveal the next clue location
function revealNextLocation(station) {
    // Get the next clue location from the current station data
    const nextLocation = station.nextLocation;

    // Display the next clue location on the page
    document.getElementById("nextLocationText").textContent = nextLocation;
}