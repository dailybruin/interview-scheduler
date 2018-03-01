import React, { Component } from 'react';
import './button.scss';

const Button = ({children}) => {
  const k = [];
  return(
    <button className={k.join(' ')}>{children}</button>
  )
}

export default Button;
