class Body {
  constructor() {
    this.node = document.createElement('div');
    this.node.className = 'body-part';
    this.node.id = 'body-part-' + store.bodyPartId;
    
    const bodyCoord = {};
    bodyCoord.left = store.head.left;
    bodyCoord.top = store.head.top;
    store.body.push(bodyCoord);

    board.appendChild(this.node);
    this.node.style.transform = `translate(0px, 0px) translateZ(50px)`;
    store.bodyPartId++;
  }
}

function growSnake() {
  let bodyPart = new Body();
}

function moveSnake() {
  // update coordinates starting at the tail (array at index 0)
  for (let i = 0; i < store.body.length - 1; i++) {
    store.body[i].top = store.body[i + 1].top;
    store.body[i].left = store.body[i + 1].left;
  }

  // for the 'neck' of the snake, get the coordinates from the head state
  if (store.body.length > 0) {
    let endCoords = store.body[store.body.length - 1];
    endCoords.top = store.head.top;
    endCoords.left = store.head.left;
  }

  for (let i = 0; i < store.body.length; i++) {
    let currNode = document.getElementById('body-part-' + i);
    currNode.style.transition = `transform ${store.speed}ms linear`;
    currNode.style.transform = `translate(${store.body[i].left}px, ${store.body[i].top}px) translateZ(50px)`;
  }
}
