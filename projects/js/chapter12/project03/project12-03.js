"use strict";
/*    JavaScript 7th Edition
      Chapter 12
      Project 12-03

      Project to show a recipe with expanding/contracting content
      Author: 
      Date:   

      Filename: project12-03.js
*/

$(document).ready(function () {

   // Hide lists initially
   $("ul, ol").hide();

   $("h2").click(function () {

      // Declare the heading variable referencing the target of the click event
      let heading = $(this);

      // Declare the list variable referencing the next sibling element of heading
      let list = heading.next();

      // Declare the headingImage variable referencing the img children of heading
      let headingImage = heading.children("img");

      // Alternate hiding and showing the list content over a half-second interval
      list.slideToggle(500);

      // Get the value of the src attribute from headingImage
      let currentSrc = headingImage.attr("src");

      // If src equals "plus.png", set it to "minus.png", otherwise set to "plus.png"
      if (currentSrc === "plus.png") {
         headingImage.attr("src", "minus.png");
      } else {
         headingImage.attr("src", "plus.png");
      }

   });

});
