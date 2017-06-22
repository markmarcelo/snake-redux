import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BOARD_WIDTH, BOARD_HEIGHT, SQUARE_SIZE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import Board from '../components/Board';
import * as Actions from '../actions';

class App extends Component {
  constructor() {
    super();

    this.nextDirection = INITIAL_DIRECTION;
  }

  componentDidMount() {
    this.initKeys();
    this.generateNewApple();
  }

  componentDidUpdate() {
    this.checkAppleCollision();
    this.checkGameLoss();
  }

  checkCollision(matchCoords, arrCoords) {
    return arrCoords.some(coords => coords[0] === matchCoords[0] && coords[1] === matchCoords[1]);
  }

  checkGameLoss = () => {
    const snakeCoords = this.props.snake.coords;
    const snakeHeadCoords = snakeCoords[0];

    // if you collide w a wall or yourself
    if (
      !this.props.game.lost &&
      (snakeHeadCoords[0] === -1 ||
        snakeHeadCoords[0] === BOARD_WIDTH ||
        snakeHeadCoords[1] === -1 ||
        snakeHeadCoords[1] === BOARD_HEIGHT ||
        this.checkCollision(snakeHeadCoords, snakeCoords.slice(1)))
    ) {
      clearInterval(this.snakeInterval);
      this.props.loseGame();
    }
  };

  checkAppleCollision() {
    const snakeCoords = this.props.snake.coords;
    const snakeHeadCoords = snakeCoords[0];
    const appleCoords = this.props.apple;

    // if it ate a piece of apple
    if (snakeHeadCoords[0] === appleCoords[0] && snakeHeadCoords[1] === appleCoords[1]) {
      this.generateNewApple();
      this.props.incrementScore();
      this.props.prependSnake(snakeCoords[snakeCoords.length - 1].slice());
    }
  }

  resetGame = () => {
    this.props.newGame();
    this.generateNewApple();
    clearInterval(this.snakeInterval);
    this.nextDirection = 'DOWN';
  };

  generateNewApple() {
    const x = Math.floor(Math.random() * BOARD_WIDTH);
    const y = Math.floor(Math.random() * BOARD_HEIGHT);
    if (this.checkCollision([x, y], this.props.snake.coords)) this.generateNewApple();
    else this.props.setApple([x, y]);
  }

  initKeys() {
    window.addEventListener('keydown', e => {
      const coords = this.props.snake.coords;
      const currDirection = this.props.snake.direction;
      const currX = coords[coords.length - 1][0];
      const currY = coords[coords.length - 1][1];

      switch (e.keyCode) {
        case 37: // left arrow
          if (currDirection !== 'RIGHT' && currX !== 0) this.nextDirection = 'LEFT';
          break;
        case 39: // right arrow
          if (currDirection !== 'LEFT' && currX !== BOARD_WIDTH - 1) this.nextDirection = 'RIGHT';
          break;
        case 40: // down arrow
          if (currDirection !== 'UP' && currY !== BOARD_HEIGHT - 1) this.nextDirection = 'DOWN';
          break;
        case 38: // up arrow
          if (currDirection !== 'DOWN' && currY !== 0) this.nextDirection = 'UP';
          break;
        case 32: // space
          if (this.props.game.lost) return false;
          clearInterval(this.snakeInterval);
          this.snakeInterval = setInterval(() => {
            this.props.setDirection(this.nextDirection);
            this.props.moveSnake(this.props.snake);
          }, GAME_SPEED);
          break;
        default:
          break;
      }
    });
  }

  render() {
    return (
      <div>
        <div className="board-wrapper">
          <Board
            snakeCoords={this.props.snake.coords}
            gameLost={this.props.game.lost}
            appleCoords={this.props.apple}
          />
          {this.props.game.lost && <div onClick={this.resetGame} className="reset">New Game</div>}
        </div>
        <h3 className="score">Score: {this.props.game.score}</h3>
        <h3 className="score">High Score: {this.props.game.highScore}</h3>
        <p className="help">Press spacebar to begin</p>
      </div>
    );
  }
}

function mapStateToProps(props) {
  return props;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
