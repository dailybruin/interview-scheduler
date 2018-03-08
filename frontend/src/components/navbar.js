import React, { Component } from "react";

import "./navbar.css";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <a href="/home"> Home </a>
        <a href="/settings"> Settings </a>
      </div>
    );
  }
}

export default NavBar;
