import React, { Component } from 'react';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/react-popper/dist/index.umd';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';
import LoginPage from './pages/LoginPage';
import firebase from './components/firebase';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    
    if(firebase.auth().currentUser !== null){
      this.setLoggedInVal(true);
    }
    else{
      this.setLoggedInVal(false);
    }
    
    console.log(this.state.loggedIn);
    
    
  }

  loginCheck(){
    console.log(this.state.loggedIn);
    
    if(this.state.loggedIn){
      // console.log(firebase.auth().currentUser.uid);
      return (
        <div className="App">
          <header className="App-header">
          <link rel="stylesheet" href="./App.css"></link>
          <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
          </header>
          <div className="container">
            <AppRouter loginFunction={this.setLoggedInVal}></AppRouter>
          </div>
        </div>
      );
    }
    else {
      return (
        <LoginPage name="Kyle" loginFunction={this.setLoggedInVal}></LoginPage>
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
