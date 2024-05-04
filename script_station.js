
let stations;

// Function to fetch station data from JSON file
async function fetchStationData() {
    try {
        let response = await fetch('stations.json');
        if (!response.ok) {
            throw new Error('Failed to fetch station data');
        }
        let data = await response.json();
        stations = data; // Assign data to the global stations variable

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
    document.getElementById("teamScore").textContent = getScore(station.team);
    // Add event listener for the submit button
    document.getElementById("submitButton").addEventListener("click", function() {
        let answer = document.getElementById("answerInput").value.trim().toLowerCase();
        if (answer === station.answer) {
            document.getElementById("validationResult").textContent = "Yes, c'est correct ! Station suivante :";
            document.getElementById("nextLocation").style.display = "block";
            document.getElementById("nextLocationText").style.display = "block";
            revealNextLocation(station.nextStation); // Pass 'stations' array
            // add points per corrects answer
            updateScore(4, station.team);
            document.getElementById("teamScore").textContent = getScore(station.team);
            // hide the answer block
            document.getElementById("answerBox").style.display = "none";
            // mark the current station as answered. This locks the points increment for this station.
            markStationAsAnswered(station.id);
            // if last station, clear local storage. Get next station
            let nextSt = getStationById(station.nextStation)
            if (nextSt.nextStation === "0") {
                resetScores();
            }
        } else {
            document.getElementById("validationResult").textContent = "Eh non, ce n'est pas ça. Réessayez !";
            updateScore(-1, station.team);
            document.getElementById("teamScore").textContent = getScore(station.team);
        }
    });
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

// Function to initialize the score if it doesn't exist
function initializeScore(teamId) {
    if (teamId === '1') {
        if (!localStorage.getItem('team1Score')) {
            localStorage.setItem('team1Score', '0');
            console.log('Initialized score for team 1');
        }
    } else {
        if (!localStorage.getItem('team2Score')) {
            localStorage.setItem('team2Score', '0');
            console.log('Initialized score for team 1');
        }
    }
    if(!localStorage.getItem('alreadyAnswered')){
        let alrAnsArray = ['0', '0', '0', '0', '0', '0', '0', '0'];
        let string = JSON.stringify(alrAnsArray) 
        localStorage.setItem('alreadyAnswered', string) 
    }
}

// Function to update the user's score
function updateScore(increment, teamId) {
    // Initialize the score if it doesn't exist
    initializeScore(teamId);

    let currentScore;
    // Retrieve the current score from local storage, according to team
    if (teamId === '1') {
        currentScore = parseInt(localStorage.getItem('team1Score'));
    } else {
        currentScore = parseInt(localStorage.getItem('team2Score'));
    }
    

    // Update the score
    currentScore += increment;

    // Store the updated score back to local storage
    if (teamId === '1') {
        localStorage.setItem('team1Score', currentScore.toString());
    } else {
        localStorage.setItem('team2Score', currentScore.toString());
    }

    // Return the updated score
    return currentScore;
}

// Function to get the user's score
function getScore(teamId) {
    // Initialize the score if it doesn't exist
    initializeScore(teamId);

    // Retrieve the score from local storage
    if (teamId === '1') {
        return parseInt(localStorage.getItem('team1Score'));
    } else {
        return parseInt(localStorage.getItem('team2Score'));
    }
    
}

function resetScores() {
    localStorage.removeItem('team1Score');
    localStorage.removeItem('team2Score');
}

function markStationAsAnswered(id) {
    let array_id = parseInt(id) - 1;
    let retString = localStorage.getItem('alreadyAnswered') 
    let retArray = JSON.parse(retString) 
    console.log(retArray);
    // mark current station as answered
    retArray[array_id] = '1';
    console.log(retArray);
    // store updated array back to localStorage
    let string = JSON.stringify(retArray);
    localStorage.setItem('alreadyAnswered', string);
}