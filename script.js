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
        firstLocation = "Location 1 for Team 1"; // Replace with actual location
    } else {
        firstLocation = "Location 1 for Team 2"; // Replace with actual location
    }
    document.getElementById("clueDisplay").innerHTML = "<p>" + firstLocation + "</p>";
}
