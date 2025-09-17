// Whack-a-Mole Game Logic

// Select elements
const scoreEl = document.getElementById('score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');

let score = 0;
let activeMole = null;
let gameInterval = null;
let moleTimeout = null;
let gameRunning = false;

// Function to pick a random mole
function getRandomMole() {
  const index = Math.floor(Math.random() * moles.length);
  return moles[index];
}

// Activate a mole
function activateMole() {
  if (activeMole) {
    activeMole.classList.remove('active');
  }

  const mole = getRandomMole();
  activeMole = mole;
  mole.classList.add('active');

  // Deactivate after some time
  moleTimeout = setTimeout(() => {
    mole.classList.remove('active');
    activeMole = null;
  }, 1000);
}

// Start game
function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  score = 0;
  scoreEl.textContent = score;

  gameInterval = setInterval(activateMole, 1200);
}

// Restart game
function restartGame() {
  clearInterval(gameInterval);
  clearTimeout(moleTimeout);
  if (activeMole) {
    activeMole.classList.remove('active');
    activeMole = null;
  }
  gameRunning = false;
  startGame();
}

// Handle mole click
moles.forEach(mole => {
  mole.addEventListener('click', () => {
    if (mole.classList.contains('active')) {
      score++;
      scoreEl.textContent = score;
      mole.classList.remove('active');
      activeMole = null;
    }
  });
});

// Attach button events
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
