/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls the dice as many times as he whishes. Each result get added to the players ROUND score
- BUT, if the player rolls a 1, all of their ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their overall score. After that, it's the next player's turn
- The first player to reach the inputted score limit wins the game

*/
var scores, roundScore, activeplayer;
var gamePlaying = true;

init();
window.onload = function gameRules() {
    alert('Game Rules: The game has 2 players, playing in rounds. In each turn, a player rolls the dice as many times as he or she whishes. Each result get added to the player\'s ROUND score. BUT, if the player rolls a 1, all of their ROUND score gets lost. After that, it is the next player\'s turn .The player can choose to HOLD, which means that their ROUND score gets added to their overall score. After that, it is the next player\'s turn. The first player to reach the inputted score limit wins the game!')
};


document.querySelector('.btn-roll').addEventListener('click', function () {
    //gamePlaying is by default true
    if(gamePlaying) {
        // 1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
       document.getElementById('dice-1').style.display = 'block';
       document.getElementById('dice-2').style.display = 'block';
       document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
       document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
      if (dice1 !== 1  && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player, score is not added
            nextPlayer();
        }

        
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
         
        //add current score to global score
         scores[activePlayer] += roundScore;
         
         //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value; 
        // allows users to choose score they play to
        //Undefined, 0, null or "" are COERCED to false
        if(input) {
            var winningScore = input;
        } else {
            winningScore = 100;
        }
        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display= 'none';
            document.getElementById('dice-2').style.display= 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
                nextPlayer();
        }      
    } 
});



function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.getElementById('dice-1').style.display= 'none';
        document.getElementById('dice-2').style.display= 'none';
         
};


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0; 
    roundScore = 0;

    document.getElementById('dice-1').style.display= 'none';
    document.getElementById('dice-2').style.display= 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); // you want to remove all active classes in order to add new active class. Otherwise you would double up the class name 'active' in CSS
};




