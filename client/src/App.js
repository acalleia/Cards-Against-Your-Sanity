import React, { Component } from 'react';
import './App.css';
import io from "socket.io-client";

import Home from './components/Home';
import Lobby from './components/Lobby';
import Game from './components/Game';

var socket;

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      cards: [],
      roomCode: '',
      currentScreen: 'home',
      players: [],
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    socket = io.connect();

    socket.on('room code', (data) => {
      console.log(data.roomCode)
    })

    socket.on('joined', (data) => {
      this.setState({
        cards: data.cards,
        roomCode: data.roomCode,
      })
      console.log(data.cards);
    })

    socket.on('new player', (data) => {
      this.setState({
        players: data.players
      })
    })

    socket.on('bad roomcode', () => {
      console.log('bad roomcode');
    });

    socket.on('players full', () => {
      console.log("fuck off, players full");
    });
  }

  renderCards() {
    return this.state.cards.map((card) => {
      return (
        <h2 key={card}>{card}</h2>
      )
    })
  }

  createGame() {
    console.log(this.state.name + ' creating game');
    socket.emit('create', {name: this.state.name});
    this.setState({
      currentScreen: 'lobby'
    })
  }

  joinGame() {
    console.log(`${this.state.name} joining game ${this.state.roomCode}`);
    socket.emit('join', {name: this.state.name, roomCode: this.state.roomCode});
    this.setState({
      currentScreen: 'lobby',
      joiningGame: false,
    });
  }

  handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  setScreen(screen) {
    this.setState({
      currentScreen: screen
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.currentScreen === 'home' ? 
          <Home 
            name={this.state.name}
            roomCode={this.state.roomCode}
            handleInputChange={this.handleInputChange}
            createGame={this.createGame}
            joinGame={this.joinGame}
          /> : ''}
        {this.state.currentScreen === 'lobby' ? 
          <Lobby 
            name={this.state.name}
            roomCode={this.state.roomCode}
            players={this.state.players}
          /> : ''}
        {this.state.currentScreen === 'game' ? <Game /> : ''}
      </div>
    );
  }
}

export default App;
