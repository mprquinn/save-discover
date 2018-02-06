import React, { Component } from 'react';
import Title from './components/Title';
import PlaylistCounter from './components/PlaylistCounter';
import HourCounter from './components/HourCounter';
import Filter from './components/Filter';
import Playlist from './components/Playlist';
import './App.css';
import queryString from 'query-string';

// Dummy data for now
let fakeServerData = {
  user: {
    name: 'Mike',
    playlists: [
      {
        name: 'Favourites',
        songs: [
          { name: 'A Song', duration: 210 },
          { name: 'A Fake Song', duration: 300 },
          { name: 'This is a Tune', duration: 240 },
          { name: 'Im a Song (Feat. Singer)', duration: 330 }
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          { name: 'DW - A Song', duration: 180 },
          { name: 'Ive Discovered this Song', duration: 240 },
          { name: 'Another Song', duration: 460 },
          { name: 'Heyo', duration: 390 }
        ]
      },
      {
        name: 'Release Radar',
        songs: [
          { name: 'Newly Released Song', duration: 520 },
          { name: 'New Hotness', duration: 180 },
          { name: 'This Song is a Banger', duration: 370 }
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
  extractToken() {
    let query = queryString.parse(window.location.search);
    console.log(query);
  }
  componentDidMount() {
    this.extractToken();
  }
  render() {
    let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase()
      )
    ) : [];
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>{/* Love you, React */}
            <Title username={this.state.serverData.user && this.state.serverData.user.name} />

            <PlaylistCounter playlists={playlistsToRender} />

            <HourCounter playlists={playlistsToRender} />

            <Filter onTextChange={(text) => this.setState({ filterString: text })} />

            {playlistsToRender
              .map(playlist =>
                <Playlist key={playlist.name} playlist={playlist} />
              )}

          </div> : <div className="log-in-wrapper">
            <button onClick={() => window.location = 'http:// localhost:8888/login'} className="button">Click Here to Sign In</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
