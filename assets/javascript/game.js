
    
var theBirds = ["MALLARD", "PENGUIN", "OWL", "SPARROW", "PIGEON" ]; 


var totalGuesses = 9;     
var userGuesses = [];    
var computerPick;          
var wordGuessed = [];       
var guessesLeft = 0;        
var finishedGame = false;    
var wins = 0;             
var losses = 0;             


function startGame() {
    guessesLeft = totalGuesses;
   

    //random number from theBirds array  
    computerPick = Math.floor(Math.random() * (theBirds.length));

    if(theBirds[computerPick] == theBirds[0]) {
        $('.clue').html("<img src='assets/images/mallard.jpg' width='300'/>");
    }else if(theBirds[computerPick] == theBirds[1]) {
        $('.clue').html("<img src='assets/images/penguin.jpg' width='300'/>");
    }else if(theBirds[computerPick] == theBirds[2]) {
        $('.clue').html("<img src='assets/images/owl.jpg' width='300'/>");
    }else if(theBirds[computerPick] == theBirds[3]) {
        $('.clue').html("<img src='assets/images/sparrow.jpg' width='300'/>");
    }
    
    //clear
    userGuesses = [];
    wordGuessed = [];
 
    for (var i = 0; i < theBirds[computerPick].length; i++) {
        wordGuessed.push("_");
    }   

    //gamewin, gameover, title 
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    
    refreshScreen();
};

//  display on page
function refreshScreen() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to theBirds
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < theBirds[computerPick].length; i++) {
        if(theBirds[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//you win
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";        
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finishedGame = true;
    }
    
  
};

//you lose
function checkLoss()
{
    if(guessesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";        
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;
    }
}

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {      
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};


document.onkeydown = function(event) {
   
    if(finishedGame) {
        startGame();
        finishedGame = false;
    } else {
       
        if(event.keyCode >= 65 && event.keyCode <= 90) {            
            makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};

