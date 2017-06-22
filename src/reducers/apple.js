const initialState = [];

const apple = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APPLE':
      return action.apple;

    case 'NEW_GAME':
      return initialState;

    default:
      return state;
  }
};

export default apple;
