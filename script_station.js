
let stations, scores;

// Function to fetch station data from JSON file
async function fetchStationData() {
    try {
        let response = await fetch('stations.json');
        if (!response.ok) {
            throw new Error('Failed to fetch station data');
        }
        let data = await response.json();
        stations = data; // Assign data to the global stations variable

        response = await fetch('scores.json');
        if (!response.ok) {
            throw new Error('Failed to fetch score data');
        }
        data = await response.json();
        scores = data; // Assign data to the global scores variable
    } catch (error) {
        console.error('Error loading data:', error);
        throw error; // Propagate the error
    }
}

// Function to get station by ID
function getStationById(id) {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id === id) {
            return stations[i];
        }
    }
    return null; // Return null if no station with the given ID is found
}


// Load station data and initialize the page
fetchStationData()
    .then(() => {
        // Get the station ID from the URL parameter
        let stationId = getParameterByName("station");
        // Get the station based on the ID
        const station = getStationById(stationId);
        // Initialize the page with the station data
        initializePage(station);
    })
    .catch(error => {
        // Handle any errors during data loading
        console.error('Error loading station data:', error);
    });

// Function to initialize the page
function initializePage(station) {
    // Set the station number in the title
    document.getElementById("stationNumber").textContent = station.number;
    // Set the clue text for the current station
    document.getElementById("clueText").textContent = getClueText(station);
    // Set the team number for the current station
    document.getElementById("team").textContent = station.team;
    // Set the team number to color the team element
    const teamInfoElement = document.getElementById("teamInfo");
    teamInfoElement.classList.add("team" + station.team);
    // Set the team score for current team
    let current_score = getScoreByTeam(station.team);
    document.getElementById("teamScore").textContent = current_score;
    // Add event listener for the submit button
    document.getElementById("submitButton").addEventListener("click", function() {
        let answer = document.getElementById("answerInput").value.trim().toLowerCase();
        if (answer === station.answer) {
            document.getElementById("validationResult").textContent = "Yes, c'est correct ! Station suivante :";
            document.getElementById("nextLocation").style.display = "block";
            revealNextLocation(station.nextStation); // Pass 'stations' array
            // update score
            current_score = current_score + 1;
            document.getElementById("teamScore").textContent = current_score;
            updateScoreFile(station.team, current_score);
        } else {
            document.getElementById("validationResult").textContent = "Eh non, ce n'est pas ça. Réessayez !";
        }
    });
}

function updateScoreFile(teamId, newScore) {
    try {
        // Find the index of the object with the matching team_ID
        let index = scores.findIndex(item => item.team_ID === teamId);
        if (index === -1) {
            throw new Error('Team not found');
        }

        // Update the score for the specified team
        scores[index].score = newScore;

        // Convert the updated data to JSON
        let jsonData = JSON.stringify(scores, null, 2);

        // Write the updated JSON data back to scores.json synchronously
        let response = fetch('scores.json', {
            method: 'PUT', // Use the appropriate HTTP method (PUT, POST, etc.)
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
            async: false
        });
        if (!response.ok) {
            throw new Error('Failed to update score data');
        }
        
        console.log('Score updated successfully');
    } catch (error) {
        console.error('Error updating score:', error);
    }
}

// Function to get the clue text for the current station
function getClueText(station) {
    return station.clue;
}

// Function to get the team score
function getScoreByTeam(team_ID) {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i].team_ID === team_ID) {
            return scores[i].score;
        }
    }
    return null; // Return null if no team with the given ID is found
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
function revealNextLocation(nextStationId) {
    // Get the next clue location from the current station data
    const nextStation = getStationById(nextStationId);

    // Display the next clue location on the page
    document.getElementById("nextLocationText").textContent = nextStation.location;
}