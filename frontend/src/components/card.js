import React from 'react';
import './card.css';

const Card = ({size, children}) => {
  const k = ['card'];
  k.push(size);
  return(
    <div className={k.join(' ')}>{children}</div>
  );
}

export default Card;
