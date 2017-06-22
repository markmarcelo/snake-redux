import React from 'react';
import Snake from './Snake';
import Apple from './Apple';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const Board = (props) => {
  const board = [];
  for (let x = 0; x < BOARD_WIDTH; x++) {
    board[x] = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      board[x][y] = '';
    }
  }

  return (
    <div className="board">
      <Snake coords={props.snakeCoords} lost={props.gameLost} />
      <Apple coords={props.appleCoords} />
      {board.map((row, rowIndex) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => <div className="cell" key={cellIndex} />)}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
