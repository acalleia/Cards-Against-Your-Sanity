import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import cards from './cards';


const randBlackIndex = Math.floor(Math.random() * cards.blackCards.length);

class App extends Component {
  generateWhiteIndex() {
    return Math.floor(Math.random() * cards.whiteCards.length);
  }

  renderAnswers() {
    let whiteCards = [];

    for(let i = 0; i < cards.blackCards[randBlackIndex].pick; i++) {
      whiteCards.push(cards.whiteCards[this.generateWhiteIndex()]);
    }

    return whiteCards.map((card) => {
      return (
        <p>{card}</p>
      )
    })
  }

  roomCodeGen() {
    let roomCode = '';
    let charBank = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for(let i = 0; i < 5; i++){
      roomCode += charBank.charAt(Math.floor(Math.random() * charBank.length));
    }

    return roomCode;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="Question">{cards.blackCards[randBlackIndex].text}</h1>
        </header>
        <p className="Answer">
          {this.renderAnswers()}
          {this.roomCodeGen()}
        </p>
      </div>
    );
  }
}

export default App;
