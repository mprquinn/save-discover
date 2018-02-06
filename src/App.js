import React, { Component } from "react";
import Title from "./components/Title";
import Playlist from "./components/Playlist";
import "./App.css";
import "./Create.css";
import "./Result.css"
import queryString from "query-string";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: {},
      filterString: "",
      playlists: [],
      selected: [],
      saved: false
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
              name: userData.display_name || "No Username",
              profile_picture:
                userData.images[0].url || "https://placehold.it/300/300",
              uid: userData.id
            }
          });
        }
      })
      .catch(error => console.log(error));

    // Get playlist data
    fetch(`${slug}me/playlists?limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(this.handleErrors)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const playlists = data.items;
        // Look for discover & release
        let noNullPlaylists = playlists.filter(
          playlist => playlist.name !== null
        );
        let playlistsToSave = noNullPlaylists.filter(playlist => {
          if (
            (playlist.name.toLowerCase().includes("discover weekly") && !playlist.name.toLowerCase().includes('saved')) ||
            (playlist.name.toLowerCase().includes("release radar") && !playlist.name.toLowerCase().includes('saved'))
          ) {
            return true;
          }
        });
        this.setState({
          playlists: playlistsToSave
        });
      })
      .catch(error => console.log(error));
  }
  createPlaylist() {
    let query = queryString.parse(window.location.search);
    const accessToken = query.access_token;
    const slug = "https://api.spotify.com/v1/";

    for (let i = 0; i < this.state.selected.length; i++) {
      // Build the playlist details
      const currentPlaylist = this.state.selected[i];
      let toBuild = this.state.playlists.filter(playlist => {
        if (playlist.name === currentPlaylist) {
          return true;
        } else {
          return false;
        }
      });

      const tracks = toBuild[0].tracks;
      const oldId = toBuild[0].id;
      const date = new Date();
      // Manually create the json here since the spotify one has the wrong user info
      let newPlaylist = {
        collaborative: false,
        name: `SAVED ${currentPlaylist} on ${date.getMonth() +
          1}/${date.getDate() + 1}/${date.getFullYear()}`,
        public: false,
        description: "Auto generated playlist"
      };

      fetch(`${slug}users/${this.state.user.uid}/playlists`, {
        method: "POST",
        body: JSON.stringify(newPlaylist),
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        })
      })
        .then(response => response.json())
        .catch(error => console.log("Error:", error))
        .then(response => {
          // Fill tracks here
          this.getTracks(this.state.user.uid, oldId, response.id, tracks);
        });
    }
  }
  getTracks(uid, oldId, newPlaylistId, tracks) {
    let query = queryString.parse(window.location.search);
    const accessToken = query.access_token;
    const slug = "https://api.spotify.com/v1/";

    const url = `${slug}users/spotify/playlists/${oldId}/tracks`;

    // You have to get tracks first
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`
      })
    })
      .then(response => response.json())
      .catch(error => console.log("Error:", error))
      .then(response => {
        // Get all track uris
        let newTrackList = response.items.map(item => {
          return item.track.uri;
        });
        const newTracks = {
          uris: newTrackList
        };
        // Then add them
        // Fill Tracks
        fetch(`${slug}users/${uid}/playlists/${newPlaylistId}/tracks`, {
          method: "POST",
          body: JSON.stringify(newTracks),
          headers: new Headers({
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          })
        })
          .catch(error => console.log("Error:", error))
          .then(response => {
            // Fill tracks here
            console.log("Filled success", response);
            // Done!
            this.setState({
              saved: true
            });
          });
      });
  }
  fillTracks(uid, playlistId, tracks) {
    // Move fill into here
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
            {this.state.saved || true ? (
             <div className="result">
                <h2 className="result__title">Save Complete!</h2>
                <p className="result__text">
                  Your playlist(s) have been generated and saved to your account.
                  They are saved in the following format:<br /> <strong>SAVED Discover Weekly (or Release Radar) on $todays_date</strong>
                </p>
             </div> 
            ):(
            <div>
              <div className="playlists">
              {this.state.playlists.map(playlist => (
                <Playlist
                  onSelect={(name, action) => {
                    const selected = [...this.state.selected];

                    if (action === "select") {
                      selected.push(name);
                      this.setState({
                        selected
                      });
                    } else if (action === "deselect") {
                      let newSelected = selected.filter(item => {
                        if (item !== name) {
                          return true;
                        } else {
                          return false;
                        }
                      });
                      this.setState({
                        selected: newSelected
                      });
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

            <div className="create">
              {this.state.selected.length ? (
                <div>
                  <button
                    onClick={() => this.createPlaylist()}
                    className="button button--create"
                  >
                    Save Selected
                  </button>
                </div>
              ) : (
                <div />
              )}
            </div>
            </div>
            )}
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
