import React from 'react';
import { SQUARE_SIZE } from '../constants';

const Snake = (props) => {
  return (
    <div>
      {props.coords.map((coords, index) => {
        const style = {          
          transform: `translate(${coords[0] * SQUARE_SIZE}px, ${coords[1] * SQUARE_SIZE}px) translateZ(20px)`,
        };
        return <div className={props.lost ? 'snake lost' : 'snake'} id={index} style={style} key={index} />;
      })}
    </div>
  );
};

export default Snake;
