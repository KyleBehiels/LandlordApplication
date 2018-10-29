import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';

class App extends Component {

  render() {
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
}

export default App;
