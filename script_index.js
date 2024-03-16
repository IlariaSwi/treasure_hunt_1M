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
        firstLocation = "Station 1 pour équipe 1"; // Replace with actual location
    } else {
        firstLocation = "Station 1 pour équipe 2"; // Replace with actual location
    }
    document.getElementById("clueDisplay").innerHTML = "<p>" + firstLocation + "</p>";
}
