"use strict";

/*
 JavaScript 7th Edition
 Chapter 10
 Project 10-01
 Drag-and-drop jigsaw puzzle
 Filename: project10-01.js
*/

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");

// Counter for stacking order
let zCounter = 1;

// Array of integers from 1 to 48
let intList = new Array(48);

// Pointer and piece position variables
let pointerX, pointerY, pieceX, pieceY;

// Create randomized list of puzzle pieces
for (let i = 0; i < 48; i++) {
   intList[i] = i + 1;
}

intList.sort(() => 0.5 - Math.random());

// Generate puzzle pieces
for (let i = 0; i < 48; i++) {
   let piece = document.createElement("img");
   piece.src = "piece" + intList[i] + ".png";

   let rowNum = Math.ceil((i + 1) / 8);
   let colNum = (i + 1) - (rowNum - 1) * 8;

   piece.style.position = "absolute";
   piece.style.top = (rowNum - 1) * 98 + 7 + "px";
   piece.style.left = (colNum - 1) * 98 + 7 + "px";

   piece.draggable = false;
   puzzleBoard.appendChild(piece);
}

// Enable dragging on all puzzle pieces
let pieces = document.querySelectorAll("#puzzleBoard img");

pieces.forEach(piece => {
   piece.addEventListener("pointerdown", grabPiece);
});

// Grab a puzzle piece
function grabPiece(e) {
   e.preventDefault();

   // Bring piece to front
   e.target.style.zIndex = zCounter++;

   // Store pointer position
   pointerX = e.clientX;
   pointerY = e.clientY;

   // Store piece position
   pieceX = e.target.offsetLeft;
   pieceY = e.target.offsetTop;

   // Start tracking movement
   e.target.addEventListener("pointermove", movePiece);
   e.target.addEventListener("pointerup", dropPiece);
   e.target.addEventListener("pointerleave", dropPiece);
}

// Move puzzle piece
function movePiece(e) {
   let deltaX = e.clientX - pointerX;
   let deltaY = e.clientY - pointerY;

   e.target.style.left = pieceX + deltaX + "px";
   e.target.style.top = pieceY + deltaY + "px";
}

// Drop puzzle piece
function dropPiece(e) {
   e.target.removeEventListener("pointermove", movePiece);
   e.target.removeEventListener("pointerup", dropPiece);
   e.target.removeEventListener("pointerleave", dropPiece);
}
