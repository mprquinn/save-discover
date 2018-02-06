import React, { Component } from "react";
import Title from "./components/Title";
import Playlist from "./components/Playlist";
import "./App.css";
import queryString from "query-string";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: {},
      filterString: "",
      playlists: [],
      selected: []
    };
  }
  handleErrors(response) {
    if (!response.ok) {
      throw Error("test", response);
    }
    return response;
  }
  fetchData() {
    let query = queryString.parse(window.location.search);
    const accessToken = query.access_token;
    const slug = "https://api.spotify.com/v1/";

    if (!accessToken) {
      return;
    } else {
      this.setState({
        loggedIn: true
      });
    }
    
    // Get user data
    fetch(`${slug}me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(this.handlErrors)
    .then(response => response.json())
    .then(data => {
      const userData = data;
      if (userData.email) {
        this.setState({
          user: {
            name: userData.display_name || 'No Username',
            profile_picture: userData.images[0].url || 'https://placehold.it/300/300'
          }
        });
      }
    }).catch(error => console.log(error));
    
    // Get playlist data
    fetch(`${slug}me/playlists?limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(this.handleErrors)
    .then(response => {
        return response.json();
    }).then(data => {
      const playlists = data.items;
      // Look for discover & release
      let noNullPlaylists = playlists.filter(playlist => playlist.name !== null);
      console.log(noNullPlaylists);
      let playlistsToSave = noNullPlaylists.filter(playlist => {
        if (playlist.name.toLowerCase().includes('discover weekly') || playlist.name.toLowerCase().includes('release radar')) {
          return true;
        }
      });
      this.setState({
        playlists: playlistsToSave
      });
    }).catch(error => console.log(error));
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? (
          <div>
            {/* Love you, React */}
            <Title
              username={this.state.user && this.state.user.name}
              profile_picture={this.state.user.profile_picture}
            />
            
            <div className="playlists">
              {this.state.playlists.map(playlist => (
                <Playlist
                  onSelect={(name, action) => {
                    const selected = [...this.state.selected];
  
                    if (action === 'select') {
                      selected.push(name);
                      this.setState({
                        selected
                      });
                    } else if (action === 'deselect') {
                      let newSelected = selected.filter(item => {
                        if (item !== name) {
                          return true;
                        } else {
                          return false;
                        }
                      });
                      this.setState({
                        selected: newSelected
                      })
                    }
                    // Filter by name
                    // let selected = this.state.playlists.filter(playlist => playlist.name === name);
                    
                    
                  }}
                  key={playlist.name}
                  playlist={playlist}
                  image={playlist.images[0].url}
                />
              ))}
            </div>
        
          </div>
        ) : (
          <div className="log-in-wrapper">
            <button
              onClick={() => {
                if (window.location.href.includes("localhost")) {
                  window.location = `http://localhost:8888/login`;
                } else {
                  window.location = `https://save-discover-backend.herokuapp.com/login`;
                }
              }}
              className="button"
            >
              Click Here to Sign In
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
