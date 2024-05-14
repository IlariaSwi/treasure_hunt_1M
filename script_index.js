// Landing Page Logic
document.getElementById("teamForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let selectedTeam = document.querySelector('input[name="team"]:checked');
    if (selectedTeam) {
        displayFirstLocation(selectedTeam.value);
    } else {
        alert("Please select a team.");
    }
});

function displayFirstLocation(teamNumber) {
    // Display the first location for the selected team
    let firstLocation;
    if (teamNumber === "1") {
        firstLocation = "Salle 109, labo de physique."; // Replace with actual location
    } else {
        firstLocation = "Local de sport entre le terrain de foot et celui de basket. Ce local se trouve derrière une porte couverte de graffitis."; // Replace with actual location
    }
    document.getElementById("clueDisplay").innerHTML = "<p>" + firstLocation + "</p>";
}
