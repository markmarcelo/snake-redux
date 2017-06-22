import {
  LOSE_GAME,
  NEW_GAME,
  INCREMENT_SCORE,
} from '../constants';

const initialState = {
  lost: false,
  score: 0,
  highScore: 0,
};

const game = (state = initialState, action) => {
  const { score, highScore } = state;

  switch (action.type) {
    case LOSE_GAME:
      return {
        ...state,
        lost: true,
        highScore: score > highScore ? score : highScore,
      };

    case NEW_GAME:
      return {
        ...state,
        score: 0,
        lost: false,
      };

    case INCREMENT_SCORE:
      return {
        ...state,
        score: score + 1,
      };

    default:
      return state;
  }
};

export default game;
