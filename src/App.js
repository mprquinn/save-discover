import React, { Component } from 'react';
import Title from './components/Title';
import Aggregate from './components/Aggregate';
import Filter from './components/Filter';
import Playlist from './components/Playlist';
import './App.css';

// Dummy data for now
let fakeServerData = {
  user: {
    name: 'Mike',
    playlists: [
      {
        name: 'Favourites',
        songs: ['A Song', 'A Fake Song', 'This is a Tune', 'Im a Song (Feat. Singer)']
      },
      {
        name: 'Discover Weekly',
        songs: ['DW - A Song', 'Ive Discovered this Song', 'Another Song', 'Heyo']
      },
      {
        name: 'Release Radar',
        songs: ['Newly Released Song', 'New Hotness', 'This Song is a Banger']
      }
    ]
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      serverData: {}
    }
  }
  componentDidMount() {
    this.setState({
      serverData: fakeServerData
    });
  }
  render() {
    return (
      <div className="App">
        <Title username={this.state.serverData.user && this.state.serverData.user.name} />
        <Aggregate playlists={this.state.serverData && this.state.serverData.playlists} />
        <Aggregate playlists={this.state.serverData && this.state.serverData.playlists} />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
