    /*
    GAME RULES:

    - The game has 2 players, playing in rounds
    - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
    - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
    - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
    - The first player to reach 100 points on GLOBAL score wins the game

    */

    // Creating game variables
    var scores, roundscore, activePlayer,gamePlaying;
    init();

    // Rolling Dice event
    var previousDice;
    document.querySelector('.btn-roll').addEventListener('click', function () {
      if (gamePlaying){
          //1.Random number
          var dice = Math.floor(Math.random() * 6) + 1;
  
          //2.Display the result
          var diceDOM = document.querySelector('.dice');
          diceDOM.style.display = 'block';
          diceDOM.src = 'dice-' + dice + '.png';

          //3.Update the roundscore only if the rolled number was NOT a 1
          if((dice === 6 && previousDice === 6)){
            // Player looses score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
          } else if (dice !== 1) {
            // add score
            roundscore += dice;
            //  roundscore = roundscore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundscore;
            previousDice = dice;
          }
          else {
            // next player
            nextPlayer();
          }
          previousDice = dice;
      }
    })

    // Holding event
    document.querySelector('.btn-hold').addEventListener('click', function () {
      if(gamePlaying){
         // Add current score to the global score
        scores[activePlayer] += roundscore;
        // Update the UI 
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      
      var input = document.getElementById('winScore').value; 
      var winningScore;
      // Undefined, 0 , null or "" are COERCED TO FALSE anything else is COERCED to true;
      if(input){
        winningScore = input;
        }else {
        winningScore = 100;
      }

      // Check if player won the game
      if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      } else {
        // Next Player
        nextPlayer();
        }
      } 
    });


    function nextPlayer() {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundscore = 0;

      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';

      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
      document.querySelector('.dice').style.display = 'none';
    }


    // New Game button functionality (using a callback function)
    document.querySelector('.btn-new').addEventListener('click', init);

    function init() {
      scores = [0, 0];
      activePlayer = 0;
      roundscore = 0;
      
      // state variable 
      gamePlaying = true;

      // Changing the CSS of the DOM - Hide the dice when we open the page
      document.querySelector('.dice').style.display = 'none';

      // Set all the initial values to 0;
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

      document.querySelector('.player-0-panel').classList.add('active');
    }