import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './containers/home.js';
import Login from './containers/login.js';
import Settings from './containers/settings.js';

import Button from './components/button.js';
import NavBar from './components/navbar.js'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Route exact path={"/"} component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/settings" component={Settings}/>

        </div>
      </Router>
    );
  }
}

// Redux later
// const mapStateToProps = state => {
//   const {loggedIn} = state.Auth;
//   return {
//     loggedIn,
//   };
// };


export default App;
