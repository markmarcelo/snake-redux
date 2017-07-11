class Apple {
  constructor() {
    this.node = document.createElement('div');
    this.node.id = 'apple';
    board.appendChild(this.node);
    setApple();
  }
}

function setApple() {
  const appleNode = document.getElementById('apple');

  const leftRandom = Math.floor(Math.random() * 14) * 50;
  const topRandom = Math.floor(Math.random() * 14) * 50;

  for (let i = 0; i < store.body.length; i += 1) {
    if (leftRandom === store.body[i].left && topRandom === store.body[i].top) {
      setApple();
    }
  }

  store.apple.top = topRandom;
  store.apple.left = leftRandom;
  appleNode.style.transform = `translate(${leftRandom}px, ${topRandom}px) translateZ(50px)`;
}
