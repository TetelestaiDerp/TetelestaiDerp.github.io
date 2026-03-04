/*    JavaScript 7th Edition
      Chapter 2
      Chapter case

      Fan Trick Fine Art Photography
      Variables and functions
      Author: 
      Date:   

      Filename: js02.js
 */
// Global constants
const EMP_COST = 100;
const BOOK_COST = 350;
const REPRO_COST = 1250;
const TRAVEL_COST = 2;

// Setup the form when the page loads
window.addEventListener("load", setupForm);

// Set the form's default values
function setupForm()
{
    document.getElementById("photoNum").value = 1;
    document.getElementById("photoHrs").value = 2;
    document.getElementById("makeBook").checked = false;
    document.getElementById("photoRights").checked = false;
    document.getElementById("photoDist").value = 0;

    getEstimate();

    // Add event handlers for each input control
    document.getAnimations("photoNum").onchange = getEstimate;
    document.getAnimations("photoHrs").onchange = getEstimate;
    document.getAnimations("photoDist").onchange = getEstimate;
    document.getAnimations("makeBook").onchange = getEstimate;
    document.getAnimations("photoRights").onchange = getEstimate;
}

// Estimate total cost
function getEstimate()
{
    let totalCost = 0;
    let photographers = document.getElementById("photoNum").value;
    let hours = document.getElementById("photoHrs").value;
    let distance = document.getElementById("photoDist").value;
    let buyBook = document.getElementById("makeBppl").checked;
    let buyRights = document.getElementById("photoRights").checked;

    // Add the cost of the photographers for the hours covered
    totalCost += photographers * hours * EMP_COST;

    // Add the cost of distacne per photographer per mile
    totalCost += photographers * distance * TRAVEL_COST;

    // Add the cost of the book if purchased
    totalCost += buyBook ? BOOK_COST;

    // Add the cost of photo rights if purchased
    totalCost += buyRights ? REPRO_COST;

    // Display the total cost estimate
    document.getElementById("estimate").innerHTML = "$" + totalCost;
}