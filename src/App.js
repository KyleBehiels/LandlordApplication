import React, { Component } from 'react';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/react-popper/dist/index.umd';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';
import LoginPage from './pages/LoginPage';
import firebase from './components/firebase';

class App extends Component { 

  constructor(){
    super();
    this.loginCheck = this.loginCheck.bind(this);
    this.setLoggedInVal = this.setLoggedInVal.bind(this);
    this.state = {
      loggedIn: false
    }
  }

  setLoggedInVal(loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  }


  componentDidMount(){
    if(firebase.auth().currentUser !== undefined){
      this.setLoggedInVal(true);
    }
    else{
      this.setLoggedInVal(false);
    }
  }

  loginCheck(){
    if(this.state.loggedIn){
      return (
        <div className="App">
          <header className="App-header">
          <link rel="stylesheet" href="./App.css"></link>
          </header>
          <div className="container">
            <AppRouter loginFunction={this.setLoggedInVal}></AppRouter>
          </div>
        </div>
      );
    }
    else {
      return (
        <LoginPage loginFunction={this.setLoggedInVal}></LoginPage>
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
