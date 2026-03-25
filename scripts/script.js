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


// A countdown that shows how many days are left until graduation
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") 
{
    const article = document.querySelector(".intro article");

    const title = document.createElement("h3");
    title.textContent = "Countdown Until Graduation";
    title.style.marginTop = "20px";
    title.style.textAlign = "center";

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.gap = "15px";
    container.style.marginTop = "10px";

    // Function to create each box
    function createBox(label, id) 
    {
        const box = document.createElement("div");
        const number = document.createElement("span");
        const text = document.createElement("p");

        number.id = id;
        number.textContent = "0";
        text.textContent = label;

        // Style box
        box.style.background = "#222";
        box.style.color = "white";
        box.style.padding = "12px 15px";
        box.style.borderRadius = "8px";
        box.style.textAlign = "center";

        // Number style
        number.style.fontSize = "1.8rem";
        number.style.fontWeight = "bold";
        number.style.display = "block";

        // Label style
        text.style.margin = "3px 0 0";
        text.style.fontSize = "0.75rem";
        text.style.opacity = "0.7";

        box.appendChild(number);
        box.appendChild(text);
        container.appendChild(box);
    }

    // Create boxes
    createBox("Days", "days");
    createBox("Hours", "hours");
    createBox("Minutes", "minutes");
    createBox("Seconds", "seconds");

    // Add to page
    article.appendChild(title);
    article.appendChild(container);

    let graduationDate;
    let savedDate = localStorage.getItem("gradDate");

    if (savedDate) 
    {
        graduationDate = new Date(savedDate);
    } 
    else 
    {
        graduationDate = new Date();
        graduationDate.setDate(graduationDate.getDate() + 34);
        localStorage.setItem("gradDate", graduationDate);
    }

    function countdown() 
    {
        let now = new Date();
        let timeLeft = graduationDate - now;

        if (timeLeft <= 0) 
        {
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
            return;
        }

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    countdown();
    setInterval(countdown, 1000);
}