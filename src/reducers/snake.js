import {
  BOARD_WIDTH,
  INITIAL_DIRECTION,
  MOVE_SNAKE,
  SET_DIRECTION,
  GROW_SNAKE,
  NEW_GAME,
} from '../constants';

const initialState = {
  direction: INITIAL_DIRECTION,
  coords: [
    [Math.floor(BOARD_WIDTH / 2), 2],
    [Math.floor(BOARD_WIDTH / 2), 1],
    [Math.floor(BOARD_WIDTH / 2), 0],
  ],
};

function moveSnakeCoords(state) {
  const newCoords = [...state.coords];
  const headCoords = newCoords[0];
  const headMap = {
    DOWN: [headCoords[0], headCoords[1] + 1],
    UP: [headCoords[0], headCoords[1] - 1],
    LEFT: [headCoords[0] - 1, headCoords[1]],
    RIGHT: [headCoords[0] + 1, headCoords[1]],
  };
  newCoords.unshift(headMap[state.direction]);
  newCoords.splice(-1, 1);
  return newCoords;
}

const snake = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_SNAKE:
      return {
        ...state,
        coords: moveSnakeCoords(state),
      };

    case SET_DIRECTION:
      return {
        ...state,
        direction: action.direction,
      };

    case GROW_SNAKE:
      return {
        ...state,
        coords: [...state.coords, action.coords],
      };

    case NEW_GAME:
      return initialState;

    default:
      return state;
  }
};

export default snake;
