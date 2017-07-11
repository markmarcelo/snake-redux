const store = {
  apple: { top: 0, left: 0 },
  head: { top: 0, left: 0 },
  body: [],
  isGameOver: false,
  score: 0,
  topScore: 0,
  speed: 300,
  currentDirection: 'right',
  bodyPartId: 0
};

const board = document.getElementById('board');

const newGame = () => {
  const head = new Head();
  const apple = new Apple();
  growSnake();
};

const initKeys = () => {
  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 39 && store.currentDirection !== 'left') {
      e.preventDefault();
      store.currentDirection = 'right';
    }
    if (e.keyCode === 37 && store.currentDirection !== 'right') {
      e.preventDefault();
      store.currentDirection = 'left';
    }
    if (e.keyCode === 38 && store.currentDirection !== 'down') {
      e.preventDefault();
      store.currentDirection = 'up';
    }
    if (e.keyCode === 40 && store.currentDirection !== 'up') {
      e.preventDefault();
      store.currentDirection = 'down';
    }
    // reset game at game over
    if (e.keyCode === 32 && store.isGameOver) {
      e.preventDefault();
      resetGame();
    }
  });
};

const resetGame = () => {
  store.bodyPartId = 0;
  store.body.splice(0);
  store.isGameOver = false;
  store.score = 0;
  store.speed = 300;
  store.currentDirection = 'right';
  store.head = { top: 0, left: 0 },
  store.apple = { top: 0, left: 0 };

  // remove all nodes
  while(board.firstChild) board.removeChild(board.firstChild);

  // update score
  document.getElementById('score').innerHTML = `<span>Score: ${store.score}</span>`;
  
  // remove 'play again' button
  document.body.removeChild(document.getElementById('play-button'));

  newGame();
};

function incrementSpeed(state) {
  if (state > 50) {
    state -= 25;
  }
  return state;
}

function incrementScore(num = 100) {
  store.score += num;
  document.querySelector('#score span').innerHTML = store.score;
}

function updateTopScore() {
  if (store.score > store.topScore) {
    store.topScore = store.score;
    document.querySelector('#top-score span').innerHTML = store.topScore;
  }
}

function makePlayAgainMessage() {
  const playDiv = document.createElement('div');
  playDiv.id = 'play-button';
  playDiv.innerHTML = 'Press SPACEBAR to play again!';

  document.body.appendChild(playDiv);
}

function setGameIfOutOfBounds() {
  if (store.head.top < 0 || store.head.top > 650 || store.head.left < 0 || store.head.left > 650) {
    console.log('game over');
    store.isGameOver = true;
  }
}

// fix this
function setGameIfCannibal() {
  for (let i = 0; i < store.body.length - 1; i += 1) {
    if (store.head.left === store.body[i].left && store.head.top === store.body[i].top) {
      console.log('game over');
      store.isGameOver = true;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initKeys();
  newGame();
});
