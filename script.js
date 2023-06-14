'use strict';
// selecting elements......
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condtitions
let currentScore, scores, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0; //. if its inside the function whenveer we click it resets
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rollingDice functionalling
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating random dice roll ..
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2 . display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; //change later
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  //1. add current score of the active player
  if (playing) {
    scores[activePlayer] += currentScore;
    // for ex score[1] = score[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check score >= 100 then finish game
    if (scores[activePlayer] >= 100) {
      //finish the came
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3 .not finish game
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
