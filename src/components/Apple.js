import React from 'react';
import { SQUARE_SIZE } from '../constants';

const Apple = (props) => {
  const style = {
    transform: `translate(${props.coords[0] * SQUARE_SIZE}px, ${props.coords[1] * SQUARE_SIZE}px) translateZ(20px)`
  };

  return <div className="apple" style={style} />;
};

export default Apple;
