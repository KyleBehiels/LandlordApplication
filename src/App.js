import React, { Component } from 'react';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/react-popper/dist/index.umd';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';
import LoginPage from './pages/LoginPage';

const loggedIn = false;

class App extends Component { 

  constructor(){
    super();
    this.loginCheck = this.loginCheck.bind(this);
  }

  loginCheck(){
    if(loggedIn){
      return (
        <div className="App">
          <header className="App-header">
          <link rel="stylesheet" href="./App.css"></link>
          </header>
          <div className="container">
            <AppRouter></AppRouter>
          </div>
        </div>
      );
    }
    else {
      return (
        <LoginPage></LoginPage>
      );
    }
  }

  render() {
    return (
      <div>
        {this.loginCheck()}
      </div>
    );
  }
}

export default App;
