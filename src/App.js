import React, { Component } from "react";
import Title from "./components/Title";
import PlaylistCounter from "./components/PlaylistCounter";
import HourCounter from "./components/HourCounter";
import Filter from "./components/Filter";
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
      playlists: []
    };
  }
  handleErrors(response) {
    if (!response.ok) {
      throw Error('test',response);
    }
    return response;
  }
  fetchData() {
    let query = queryString.parse(window.location.search);
    const parsed = query.access_token;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${parsed}`
      }
    })
    .then(this.handleErrors)
    .then(response => {
        return response.json();
    }).then(data => {
      if (data.id != undefined) {
        this.setState({
          loggedIn: true,
          user: {
            name: data.display_name ? data.display_name : data.id,
            uid: data.id,
            profile_picture: data.images[0].url
          },
        });
      }
    }).catch(error => console.log(error));

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${parsed}`
      }
    })
    .then(this.handleErrors)
    .then(response => {
      return response.json();
    }).then(data => {
      const playlists = data.items;
      console.log(data.items);
      if (data.items != undefined) {
        this.setState({
          playlists: playlists.filter((playlist) => {
            if (playlist.name !== null) {
              return true;
            } else {
              return false;
            }
          }).map((item) => {
            return {name: item.name, songs: [], image: item.images[0].url}
          })
        });
      }
    }).catch(error => console.log(error));
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
  let playlistsToRender =
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist =>
          playlist.name
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())
        )
      : [];
    return (
      <div className="App">
        {this.state.loggedIn ? (
          <div>
            {/* Love you, React */}
            <Title
              username={
                this.state.user && this.state.user.name
              }
              profile_picture={this.state.user.profile_picture}
            />

            <PlaylistCounter playlists={playlistsToRender} />

            <HourCounter playlists={playlistsToRender} />

            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />

            {playlistsToRender.map(playlist => (
              <Playlist key={playlist.name} playlist={playlist} image={playlist.image}/>
            ))}
          </div>
        ) : (
          <div className="log-in-wrapper">
            <button
              onClick={() => (window.location = "http://localhost:8888/login")}
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
