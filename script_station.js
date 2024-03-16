// Station Page Logic
// const stations = [
//     {
//         id: "1",
//         team: "1",
//         number: "1",
//         answer: "banana",
//         clue: "Rentrez le mot qui apparaît quand vous décodez le message en binaire.",
//         location: "Cafétéria",
//         nextStation: "3" 
//     },
//     {
//         id: "2",
//         team: "2",
//         number: "1",
//         answer: "234",
//         clue: "Pour cette station, vous devez... blabla",
//         location: "Bibliothèque",
//         nextStation: "4"
//     },
//     {
//         id: "3",
//         team: "1",
//         number: "2",
//         answer: "coco",
//         clue: "Pour cette station, vous devez... blabla",
//         location: "Dans la forêt derrière la salle de sport",
//         nextStation: "5"
//     },
//     {
//         id: "4",
//         team: "2",
//         number: "2",
//         answer: "15",
//         clue: "Pour cette station, vous devez... blabla",
//         location: "Parking du gymnase. Chercher la plaque que vous venez de trouver.",
//         nextStation: "5"
//     },
//     {
//         // final station -- prof is here !
//         id: "5",
//         team: "1",
//         number: "3",
//         answer: NaN,
//         clue: "Pour cette station, vous devez... blabla",
//         location: "Grand arbre devant la HEP",
//         nextStation: NaN
//     },
//     // Add more station objects as needed
// ];

// Load station data from JSON file
fetch('stations.json')
    .then(response => response.json())
    .then(data => {
        // Store the station data in a variable
        const stations = data;
        // Use the station data as needed
        console.log(stations);
    })
    .catch(error => console.error('Error loading station data:', error));


function getStationById(id) {
    console.log(stations);
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
            document.getElementById("validationResult").textContent = "Yes, c'est correct ! Station suivante :";
            document.getElementById("nextLocation").style.display = "block";
            revealNextLocation(station);
        } else {
            document.getElementById("validationResult").textContent = "Eh non, ce n'est pas ça. Réessayez !";
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
    const nextStation = getStationById(station.nextStation);

    // Display the next clue location on the page
    document.getElementById("nextLocationText").textContent = nextStation.location;
}