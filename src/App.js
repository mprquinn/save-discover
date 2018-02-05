import React, { Component } from 'react';
import Title from './components/Title';
import PlaylistCounter from './components/PlaylistCounter';
import HourCounter from './components/HourCounter';
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
        songs: [
          {name: 'A Song', duration: 210},
          {name: 'A Fake Song', duration: 300},
          {name: 'This is a Tune', duration: 240},
          {name: 'Im a Song (Feat. Singer)', duration: 330}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'DW - A Song', duration: 180},
          {name: 'Ive Discovered this Song', duration: 240},
          {name: 'Another Song', duration: 460},
          {name: 'Heyo', duration: 390}
        ]
      },
      {
        name: 'Release Radar',
        songs: [
          {name: 'Newly Released Song', duration: 520},
          {name: 'New Hotness', duration: 180},
          {name: 'This Song is a Banger', duration: 370}
        ]
      }
    ]
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(_ => {
      this.setState({
        serverData: fakeServerData
      });
    }, 1000);
    // setTimeout(_ => {
    //   this.setState({
    //     filterString: 'Weekly'
    //   });
    // }, 2000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>{/* Love you, React */}
            <Title username={this.state.serverData.user && this.state.serverData.user.name} />
            <PlaylistCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
            <HourCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
            <Filter onTextChange={(text) => this.setState({filterString: text})}/>
            {this.state.serverData.user.playlists.filter(playlist => {
              return playlist.name.toLowerCase().includes(
                this.state.filterString.toLowerCase()
              )
            })
            .map(playlist =>
              <Playlist key={playlist.name} playlist={playlist}/>
            )}
            {/* <Playlist />
            <Playlist />
            <Playlist /> */}
          </div> : <p className="loading">Loading...</p>
        }
      </div>
    );
  }
}

export default App;
