import React from 'react';
import './button.css';

const Button = ({primary, children}) => {
  const k = [];
  if (primary) {
    k.push('primary');
  }
  return(
    <button className={k.join(' ')}>{children}</button>
  );
}

export default Button;
