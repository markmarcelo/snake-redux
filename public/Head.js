class Head {
  constructor() {
    this.node = document.createElement('div');
    this.node.id = 'head';
    this.node.style.transform = `translate(0px, 0px) translateZ(50px)`;
    board.appendChild(this.node);
    setTimeout(this.move.bind(this), store.speed);
  }

  move() {
    switch (store.currentDirection) {
      case 'right':
        store.head.left += 50;
        break;

      case 'left':
        store.head.left -= 50;
        break;

      case 'up':
        store.head.top -= 50;
        break;

      case 'down':
        store.head.top += 50;
        break;

      default:
        break;
    }

    // Eat Apple
    if (store.apple.top === store.head.top && store.apple.left === store.head.left) {
      setApple();
      incrementScore();
      store.speed = incrementSpeed(store.speed);
      growSnake();
    }

    setGameIfOutOfBounds();
    setGameIfCannibal();

    // Wrap up sequence by checking if the game is over
    if (store.isGameOver) {
      updateTopScore();
      makePlayAgainMessage();
      clearTimeout();
    } else {
      moveSnake();
      moveHead(this.node);
      setTimeout(this.move.bind(this), store.speed);
    }
  }
}

function moveHead(node) {
  store.head.left = store.head.left;
  store.head.top = store.head.top;
  node.style.transition = `transform ${store.speed}ms linear`;
  node.style.transform = `translate(${store.head.left}px, ${store.head.top}px) translateZ(50px)`;
}
