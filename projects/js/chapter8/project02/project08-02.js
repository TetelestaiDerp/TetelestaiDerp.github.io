"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-02

      Project to add balls bouncing within a container
      Author: 
      Date:   

      Filename: project08-02.js
*/

/*---------------- CONSTANTS ---------------------*/
const BALL_RADIUS = 60; // radius of the ball in pixels
const BOX_HEIGHT = 400; // height of the container in pixels
const BOX_WIDTH = 800;  // width of the container in pixels
 
/*--------------- Object Code --------------------*/
let box = {
   width: BOX_WIDTH,
   height: BOX_HEIGHT,
   xPos: "0",
   yPos: "0",
};
 
function ball(size) {
   this.radius = size;
   this.xPos = null;
   this.yPos = null;
   this.xVelocity = null;
   this.yVelocity = null;
}
 
ball.prototype.MoveWithin = function(container) {
   let ballTop    = this.yPos;
   let ballLeft   = this.xPos;
   let ballBottom = this.yPos + this.radius;
   let ballRight  = this.xPos + this.radius;
 
   let bounced = false;
 
   if (ballTop < 0 || ballBottom > container.height) {
      this.yVelocity = -this.yVelocity;
      if (ballTop < 0) this.yPos = 0;
      if (ballBottom > container.height) this.yPos = container.height - this.radius;
      bounced = true;
   }
 
   if (ballLeft < 0 || ballRight > container.width) {
      this.xVelocity = -this.xVelocity;
      if (ballLeft < 0) this.xPos = 0;
      if (ballRight > container.width) this.xPos = container.width - this.radius;
      bounced = true;
   }
 
   if (bounced) shakeBox();
 
   this.yPos += this.yVelocity;
   this.xPos += this.xVelocity;
};
 
 
/*--------------- Ball Registry ------------------*/
// Tracks every ball object + its matching DOM element
let ballList = [];
 
 
/*---------------Interface Code -----------------*/
 
// Reference to the container box
let boxImage = document.getElementById("box");
boxImage.style.width  = BOX_WIDTH  + "px";
boxImage.style.height = BOX_HEIGHT + "px";
boxImage.style.top    = "0px";
boxImage.style.left   = "0px";
 
// Reference to the Add Ball button
let addBall = document.getElementById("addBall");
 
addBall.onclick = function() {
 
   // --- Create DOM element ---
   let ballImage = document.createElement("div");
   ballImage.className      = "ball";
   ballImage.style.width    = BALL_RADIUS + "px";
   ballImage.style.height   = BALL_RADIUS + "px";
   ballImage.style.left     = (BOX_WIDTH  - BALL_RADIUS) / 2 + "px";
   ballImage.style.top      = (BOX_HEIGHT - BALL_RADIUS) / 2 + "px";
 
   // Append the ball image to the box
   boxImage.appendChild(ballImage);
 
   // --- Create ball object ---
   let newBall = new ball(BALL_RADIUS);
   newBall.xPos      = (BOX_WIDTH  - BALL_RADIUS) / 2;
   newBall.yPos      = (BOX_HEIGHT - BALL_RADIUS) / 2;
   newBall.xVelocity = rand(-5, 5) || 2;  // fallback avoids 0 velocity
   newBall.yVelocity = rand(-5, 5) || 2;
 
   // --- Drag state (scoped per ball) ---
   let isDragging  = false;
   let dragOffsetX = 0;
   let dragOffsetY = 0;
 
   // Mouse down on ball: start drag
   ballImage.addEventListener("mousedown", function(e) {
      isDragging = true;
      newBall.xVelocity = 0;
      newBall.yVelocity = 0;
      let rect = boxImage.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left - newBall.xPos;
      dragOffsetY = e.clientY - rect.top  - newBall.yPos;
      e.preventDefault();
   });
 
   // Mouse move on document: update position while dragging
   document.addEventListener("mousemove", function(e) {
      if (!isDragging) return;
      let rect = boxImage.getBoundingClientRect();
      newBall.xPos = Math.max(0, Math.min(BOX_WIDTH  - BALL_RADIUS, e.clientX - rect.left - dragOffsetX));
      newBall.yPos = Math.max(0, Math.min(BOX_HEIGHT - BALL_RADIUS, e.clientY - rect.top  - dragOffsetY));
      ballImage.style.left = newBall.xPos + "px";
      ballImage.style.top  = newBall.yPos + "px";
   });
 
   // Mouse up on document: stop drag and resume bouncing
   document.addEventListener("mouseup", function() {
      if (!isDragging) return;
      isDragging = false;
      newBall.xVelocity = rand(-5, 5) || 2;
      newBall.yVelocity = rand(-5, 5) || 2;
   });
 
   // Register ball in the list so the animation loop can update it
   ballList.push({ ballObj: newBall, ballEl: ballImage, dragging: function() { return isDragging; } });
};
 
 
/*--------------- Shake Effect -------------------*/
let shakeFrame = 0;
const SHAKE_DURATION = 8;   // frames the shake lasts
const SHAKE_MAGNITUDE = 2;  // max pixel offset
 
function shakeBox() {
   shakeFrame = SHAKE_DURATION;
}
 
function applyShake() {
   if (shakeFrame > 0) {
      let intensity = (shakeFrame / SHAKE_DURATION) * SHAKE_MAGNITUDE;
      let dx = (Math.random() * 2 - 1) * intensity;
      let dy = (Math.random() * 2 - 1) * intensity;
      boxImage.style.transform = "translate(" + dx.toFixed(2) + "px, " + dy.toFixed(2) + "px)";
      shakeFrame--;
   } else {
      boxImage.style.transform = "translate(0px, 0px)";
   }
}
 
 
/*--------------- Animation Loop -----------------*/
function animateBalls() {
   for (let i = 0; i < ballList.length; i++) {
      let entry = ballList[i];
 
      // Skip physics update while the user is dragging this ball
      if (entry.dragging()) continue;
 
      entry.ballObj.MoveWithin(box);
      entry.ballEl.style.left = entry.ballObj.xPos + "px";
      entry.ballEl.style.top  = entry.ballObj.yPos + "px";
   }
   applyShake();
   requestAnimationFrame(animateBalls);
}
 
// Kick off the loop
requestAnimationFrame(animateBalls);
 
 
/*--------------- Utility ------------------------*/
 
/* Function to return a random value between minVal and maxVal */
function rand(minVal, maxVal) {
   let size = maxVal - minVal + 1;
   return minVal + size * Math.random();
}