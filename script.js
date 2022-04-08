//Get DOM Elements
const secretNumber = document.querySelector(".secret-number");
const leftGuess = document.querySelector(".left-guess");
const rightGuess = document.querySelector(".right-guess");
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");

//Buttons
const leftBtn = document.querySelector(".check-left");
const rightBtn = document.querySelector(".check-right");
const playAgainBtn = document.querySelector(".play-again");
const resetHighestLeftBtn = document.querySelector(".reset-highest-left-btn");
const resetHighestRightBtn = document.querySelector(".reset-highest-right-btn");

//Output elements
const leftMessage = document.querySelector(".left-message");
const rightMessage = document.querySelector(".right-message");
const leftGuessesRemaining = document.getElementById("left-guesses-remaining");
const rightGuessesRemaining = document.getElementById("right-guesses-remaining");
const leftHighestScore = document.querySelector(".left-highest-score");
const rightHighestScore = document.querySelector(".right-highest-score");


// ==============================================================================


//GLOBAL VARIABLES

//Create secret number
let secNumber = Math.floor(Math.random() * 20 + 1);
// secretNumber.textContent = secNumber;

//Initial high scores
let highestScoreAndrew = 0;
let highestScoreVictoria = 0;


//Initial guesses
let andrewGuesses = 10;
let victoriaGuesses = 10;

//FUNCTIONS
function gameOver() {
  rightMessage.textContent = "Sorry Victoria, you're out of guesses!";
  rightBtn.disabled = true;
  leftBtn.disabled = true;
  rightGuess.disabled = true;
  leftGuess.disabled = true;
  rightSide.style.backgroundColor = "#3c6d3b"; //dark green
  leftSide.style.backgroundColor = "#3c6d3b"; //dark green
  rightGuess.style.backgroundColor = "#7f7676"; //dark gray
  leftGuess.style.backgroundColor = "#7f7676"; //dark gray
  leftMessage.textContent = "Game over. Nobody wins. 😞 Play Again?"
  rightMessage.textContent = "Game over. Nobody wins. 😞 Play Again?"
}

function disableSide(sideSide, sideGuess, sideBtn) {
  sideSide.style.backgroundColor = "#3c6d3b"; //dark green
  sideGuess.style.backgroundColor = "#7f7676"; //dark gray
  sideGuess.disabled = true;
  sideBtn.disabled = true;
}

function enableLeftSide() {
  leftSide.style.backgroundColor = "#8fc28e"; //light green
  leftGuess.style.backgroundColor = "#efe8e8"; //light gray
  leftGuess.disabled = false;
  leftBtn.disabled = false;
  leftGuess.focus();
  leftGuess.value = "";
  leftMessage.textContent = "Andrew, enter your guess:";

}

function enableRightSide() {
  rightSide.style.backgroundColor = "#8fc28e"; //light green
  rightGuess.style.backgroundColor = "#efe8e8"; //light gray
  rightGuess.disabled = false;
  rightBtn.disabled = false;
  rightGuess.focus();
  rightGuess.value = "";
  rightMessage.textContent = "Victoria, enter your guess:";

}

// function enableSide(sideSide, sideGuess, sideBtn, sideMessage) {
//   sideSide.style.backgroundColor = "#8fc28e"; //light green
//   sideGuess.style.backgroundColor = "#efe8e8"; //light gray
//   sideGuess.disabled = false;
//   sideBtn.disabled = false;
//   sideGuess.focus();
//   sideGuess.value = "";
// }

function enableSides(sideSide, sideGuess, sideBtn) {
  sideSide.style.backgroundColor = "#8fc28e"; //light green
  sideGuess.style.backgroundColor = "#efe8e8"; //light gray
  sideGuess.disabled = false;
  sideBtn.disabled = false;
  sideGuess.value = "";
}

function playAgain() {
  secNumber = Math.floor(Math.random() * 20 + 1);
  secretNumber.textContent = secNumber;
  // secretNumber.textContent = "?"
  andrewGuesses = 10;
  leftGuessesRemaining.textContent = andrewGuesses;
  victoriaGuesses = 10;
  rightGuessesRemaining.textContent = victoriaGuesses;
  leftMessage.textContent = "Andrew, enter your guess:";
  rightMessage.textContent = "Victoria, enter your guess:";
  enableSides(leftSide, leftGuess, leftBtn);
  enableSides(rightSide, rightGuess, rightBtn);
}



//EVENT LISTENERS

//Play Again Button
playAgainBtn.addEventListener("click", () => {
  playAgain()
})

//Delete input field content when clicked into
leftGuess.addEventListener("click", () => {
  leftGuess.value = "";
});

//Delete input field content when clicked into
rightGuess.addEventListener("click", () => {
  rightGuess.value = "";
});

resetHighestLeftBtn.addEventListener("click", () => {
  highestScoreAndrew = 0;
  leftHighestScore.textContent = highestScoreAndrew;
})

resetHighestRightBtn.addEventListener("click", () => {
  highestScoreVictoria = 0;
  rightHighestScore.textContent = highestScoreVictoria;
})



//GAME LOGIC
leftBtn.addEventListener("click", () => {

  if (!leftGuess.value) {
    leftMessage.textContent = "Please enter your guess!";
  }
  else if (leftGuess.value > secNumber) {
    leftMessage.textContent = "Ooops, go lower. Victoria's turn!";
    andrewGuesses -= 1;
    leftGuessesRemaining.textContent = andrewGuesses;
    disableSide(leftSide, leftGuess, leftBtn);
    enableRightSide(rightSide, rightGuess, rightBtn, rightMessage);
  } else if (leftGuess.value < secNumber) {
    leftMessage.textContent = "Ooops, go higher. Victoria's turn!";
    andrewGuesses -= 1;
    leftGuessesRemaining.textContent = andrewGuesses;
    disableSide(leftSide, leftGuess, leftBtn);
    enableRightSide(rightSide, rightGuess, rightBtn, rightMessage);
  } else {
    leftMessage.textContent = "Congrats Andrew, you win!!! 👏😀";
    leftSide.style.backgroundColor = "#cfc948"; //yellow
    leftGuess.disabled = true;
    secretNumber.textContent = secNumber;

    if(andrewGuesses > +leftHighestScore.textContent) {
      leftHighestScore.textContent = andrewGuesses
    }
  }

  if(andrewGuesses == 0) {
    disableSide(leftSide, leftGuess, leftBtn);
    leftMessage.textContent = "Sorry Andrew, you're out of guesses!"
  }
  
  if(andrewGuesses == 0 && victoriaGuesses == 0) {
    gameOver();
  }
});

rightBtn.addEventListener("click", () => {
  if(!rightGuess.value) {
    rightMessage.textContent = "Please enter your guess!";
  }
  else if (rightGuess.value > secNumber) {
    rightMessage.textContent = "Ooops, go lower. Andrew's turn!";
    victoriaGuesses -= 1;
    rightGuessesRemaining.textContent = victoriaGuesses;
    disableSide(rightSide, rightGuess, rightBtn);
    enableLeftSide(leftSide, leftGuess, leftBtn, leftMessage);
  } else if (rightGuess.value < secNumber) {
    rightMessage.textContent = "Ooops, go higher. Andrew's turn!";
    victoriaGuesses -= 1;
    rightGuessesRemaining.textContent = victoriaGuesses;
    disableSide(rightSide, rightGuess, rightBtn);
    enableLeftSide(leftSide, leftGuess, leftBtn, leftMessage);
  } else {
    rightMessage.textContent = "Congrats Victoria, you win!!! 👏😀";
    rightSide.style.backgroundColor = "#cfc948"; //yellow
    rightGuess.disabled = true;
    secretNumber.textContent = secNumber;
    if(victoriaGuesses > +rightHighestScore.textContent) {
      rightHighestScore.textContent = victoriaGuesses
    }
  }
  if(victoriaGuesses == 0) {
    disableSide(rightSide, rightGuess, rightBtn);
    rightMessage.textContent = "Sorry Victoria, you're out of guesses!"
  }
  
  if(victoriaGuesses == 0 && andrewGuesses == 0) {
    gameOver();
  }
});

