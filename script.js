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

//Output elements
const leftMessage = document.querySelector(".left-message");
const rightMessage = document.querySelector(".right-message");
const leftGuessesRemaining = document.getElementById("left-guesses-remaining");
const rightGuessesRemaining = document.getElementById("right-guesses-remaining");
const leftHighestScore = document.querySelector(".left-highest-score");
const rightHighestScore = document.querySelector(".right-highest-score");


// ==============================================================================




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

function enableSide(sideSide, sideGuess, sideBtn) {
  sideSide.style.backgroundColor = "#8fc28e"; //light green
  sideGuess.style.backgroundColor = "#efe8e8"; //light gray
  sideGuess.disabled = false;
  sideBtn.disabled = false;
  sideGuess.focus();
  sideGuess.value = "";
}



//EVENT LISTENERS

//Play Again Button
playAgainBtn.addEventListener("click", () => {
  location.reload();
})

//Delete all content when input is clicked
leftGuess.addEventListener("click", () => {
  leftGuess.value = "";
});

rightGuess.addEventListener("click", () => {
  rightGuess.value = "";
});



//INITIAL VARIABLES

//Create secret number
const secNumber = Math.floor(Math.random() * 20 + 1);
secretNumber.textContent = secNumber;

//Initial high scores
let highestScoreAndrew = 0;
let highestSCoreVictoria = 0;


//Initial guesses
let andrewGuesses = 10;
let victoriaGuesses = 10;



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
    enableSide(rightSide, rightGuess, rightBtn);
  } else if (leftGuess.value < secNumber) {
    leftMessage.textContent = "Ooops, go higher. Victoria's turn!";
    andrewGuesses -= 1;
    leftGuessesRemaining.textContent = andrewGuesses;
    disableSide(leftSide, leftGuess, leftBtn);
    enableSide(rightSide, rightGuess, rightBtn);
  } else {
    leftMessage.textContent = "Congrats, you win!!! 👏🎉🍾😀";
    leftGuess.disabled = true;
    secretNumber.textContent = secNumber;
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
    enableSide(leftSide, leftGuess, leftBtn);
  } else if (rightGuess.value < secNumber) {
    rightMessage.textContent = "Ooops, go higher. Andrew's turn!";
    victoriaGuesses -= 1;
    rightGuessesRemaining.textContent = victoriaGuesses;
    disableSide(rightSide, rightGuess, rightBtn);
    enableSide(leftSide, leftGuess, leftBtn);
  } else {
    rightMessage.textContent = "Congrats, you win!!! 👏🎉🍾😀";
    rightGuess.disabled = true;
    secretNumber.textContent = secNumber;
    // console.log(andrewGuesses, highestScoreAndrew)
    rightHighestScore.textContent = highestScoreAndrew;
    // andrewGuesses > highestScoreAndrew && rightHighestScore.textContent = highestScoreAndrew 
  }

  if(victoriaGuesses == 0) {
    disableSide(rightSide, rightGuess, rightBtn);
    rightMessage.textContent = "Sorry Victoria, you're out of guesses!"
  }
  
  if(victoriaGuesses == 0 && andrewGuesses == 0) {
    gameOver();
  }
});

