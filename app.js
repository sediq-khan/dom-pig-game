/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var playerZeroGlobalScore = 0, playerOneGlobalScore = 0;
var activePlayer;
var playerZero = false, playerOne = false;
var localScores = 0;


function newGame(){
    var rand = Math.round(Math.random());

    rand == 0 ? playerZero = true : playerOne = true;
    //console.log("rand is: " + rand + " -- " + firstPlayer + " -- " + secondPlayer );
    document.getElementById("score-0").value = 0;
    document.getElementById("score-1").value = 0;
    document.getElementById("diceImg").src = "dice-0.png";

    if(playerZero){    
        activePlayer = playerZero;
        document.getElementById("player-1-active").classList.remove("active");
        document.getElementById("player-0-active").classList.add("active");
    }else{
        activePlayer = playerOne;
        document.getElementById("player-0-active").classList.remove("active");
        document.getElementById("player-1-active").classList.add("active");   
    }
}

function rollDice(){
    if(playerZero || playerOne){
        // var test = activePlayer ==  playerZero ? "yes" : "no";
        // console.log(test);
        var nextDice = changeDiceImage();
        if(nextDice != 1){
            if(localScores >= 100){
                activePlayer == playerZero ? playerZeroGlobalScore = localScores : playerOneGlobalScore = localScores;
                activePlayer == playerZero ? document.getElementById("score-0").innerHTML = localScores : 
                                document.getElementById("score-1").innerHTML = localScores;
            }else{
                document.getElementById("diceImg").src = "dice-" + nextDice.toString() + ".png";
                localScores += nextDice;
                activePlayer == playerZero ? document.getElementById("current-0").innerHTML = localScores : 
                                document.getElementById("current-1").innerHTML = localScores;  
            }
        }else{
            if(activePlayer == playerZero){
                document.getElementById("score-0").innerHTML = localScores;
                document.getElementById("player-0-active").classList.remove("active");
                document.getElementById("player-1-active").classList.add("active");
                activePlayer = playerOne;
                playerZeroGlobalScore = localScores;
                localScores = playerOneGlobalScore;
            }else{
                document.getElementById("score-1").innerHTML = localScores;
                document.getElementById("player-1-active").classList.remove("active");
                document.getElementById("player-0-active").classList.add("active");
                activePlayer = playerZero;
                playerOneGlobalScore = localScores;
                localScores = playerOneGlobalScore;
            }

            document.getElementById("diceImg").src = "dice-" + nextDice.toString() + ".png";
        }
    }else{
        alert("Please press New Game.");  
    }
}

function hold(){
    if(activePlayer == playerZero){
        document.getElementById("score-0").innerHTML = localScores;
        document.getElementById("player-0-active").classList.remove("active");
        document.getElementById("player-1-active").classList.add("active");
        activePlayer = playerOne;
        playerZeroGlobalScore = localScores;
        localScores = playerOneGlobalScore;
    }else{
        document.getElementById("score-1").innerHTML = localScores;
        document.getElementById("player-0-active").classList.add("active");
        document.getElementById("player-1-active").classList.remove("active");
        activePlayer = playerZero;
        playerOneGlobalScore = localScores;
        localScores = playerZeroGlobalScore;
    }
}

function changeDiceImage(){
    return getRandomArbitrary(1,6);
    
}

// Get a number between the range 1-6
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }