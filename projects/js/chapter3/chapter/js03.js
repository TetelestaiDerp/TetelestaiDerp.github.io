/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: 
     Date:   

     Filename: js03.js
 */

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Adds weekday headers
function addWeekDays() {
    let headingCells = document.getElementsByTagName("th");
    for (let i = 0; i < 7; i++) {
        headingCells[i].textContent = weekDays[i];
    }
}

// Show games on the calendar
function showGames() {
    for (let i = 0; i < gameDates.length; i++) {
        let gameInfo = "";

        // Determine class by result
        let resultClass = "";
        switch (gameResults[i]) {
            case "W":
                resultClass = "win";
                break;
            case "L":
                resultClass = "lose";
                break;
            case "S":
                resultClass = "suspended";
                break;
            case "P":
                resultClass = "postponed";
                break;
        }

        // Start game info paragraph
        gameInfo += `<p class="${resultClass}">`;

        // Home or Away
        if (gameLocations[i] === "h") {
            gameInfo += "vs. ";
        } else if (gameLocations[i] === "a") {
            gameInfo += "@ ";
        }

        // Opponent
        gameInfo += gameOpponents[i] + "<br>";

        // Result
        gameInfo += `${gameResults[i]}: (${runsScored[i]} - ${runsAllowed[i]})`;

        // Innings display (optional mark for incomplete or extended games)
        if (gameInnings[i] < 5) {
            gameInfo += ` [${gameInnings[i]}]***`;
        } else if (gameInnings[i] < 9) {
            gameInfo += ` [${gameInnings[i]}]*`;
        } else if (gameInnings[i] > 9) {
            gameInfo += ` [${gameInnings[i]}]+`;
        }

        gameInfo += "</p>";

        // Add to calendar cell
        let tableCell = document.getElementById(gameDates[i]);
        if (tableCell) {
            tableCell.insertAdjacentHTML("beforeEnd", gameInfo);
        }
    }
}

// Run on page load
window.addEventListener("load", addWeekDays);
window.addEventListener("load", showGames);
