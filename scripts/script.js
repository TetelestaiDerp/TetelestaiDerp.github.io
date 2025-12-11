/* 
Student Name: Davyd Yendrys
File Name: script.js
Date: December 10, 2025
*/

//Global Variables
var video = document.getElementById("example");
var videoSource = document.getElementById("vid-src");
var descriptionSource = document.getElementById("despsrc");

function hamburger()
{
    var menu = document.getElementById("menu-links");
    var logo = document.getElementById("ffc-logo");
    if (menu.style.display === "block" && logo.style.display === "none")
    {
        menu.style.display = "none";
        logo.style.display = "block";
    }
    else
    {
        menu.style.display = "block";
        logo.style.display = "none";
    }
}