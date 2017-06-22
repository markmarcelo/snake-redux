import {
  MOVE_SNAKE,
  SET_APPLE,
  SET_DIRECTION,
  GROW_SNAKE,
  NEW_GAME,
  LOSE_GAME,
  INCREMENT_SCORE,
} from '../constants';

export function moveSnake() {
  return {
    type: MOVE_SNAKE,
  };
}

export function setApple(coords) {
  return {
    type: SET_APPLE,
    apple: coords,
  };
}

export function setDirection(direction) {
  return {
    type: SET_DIRECTION,
    direction,
  };
}

export function prependSnake(coords) {
  return {
    type: GROW_SNAKE,
    coords,
  };
}

export function newGame() {
  return {
    type: NEW_GAME,
  };
}

export function loseGame() {
  return {
    type: LOSE_GAME,
  };
}

export function incrementScore() {
  return {
    type: INCREMENT_SCORE,
  };
}
