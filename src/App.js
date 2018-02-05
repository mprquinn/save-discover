import React, { Component } from 'react';
import Title from './components/Title';
import Aggregate from './components/Aggregate';
import Filter from './components/Filter';
import Playlist from './components/Playlist';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
