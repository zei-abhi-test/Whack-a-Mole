// Whack-a-Mole Game Logic — Win at 5 Points

// Select elements
const scoreEl = document.getElementById('score');
const moles = document.querySelectorAll('.mole');
const restartBtn = document.getElementById('restart');
const winMessage = document.getElementById('win-message');

let score = 0;
let activeMole = null;
let gameInterval = null;
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

  // Auto-remove after 1s
  setTimeout(() => {
    if (mole === activeMole) {
      mole.classList.remove('active');
      activeMole = null;
    }
  }, 1000);
}

// Start game
function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  score = 0;
  scoreEl.textContent = score;
  winMessage.style.display = 'none';

  gameInterval = setInterval(activateMole, 1000);
}

// Stop game
function stopGame() {
  clearInterval(gameInterval);
  gameRunning = false;
  if (activeMole) {
    activeMole.classList.remove('active');
    activeMole = null;
  }
}

// Restart game
function restartGame() {
  stopGame();
  startGame();
}

// Handle mole click
moles.forEach(mole => {
  mole.addEventListener('click', () => {
    if (!gameRunning) return;
    if (mole.classList.contains('active')) {
      score++;
      scoreEl.textContent = score;
      mole.classList.remove('active');
      activeMole = null;

      if (score >= 5) {
        stopGame();
        winMessage.style.display = 'block';
      }
    }
  });
});

// Attach button events
restartBtn.addEventListener('click', restartGame);

// Start game automatically on page load
startGame();