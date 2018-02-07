import React, { Component } from "react";
import "../Playlist.css";

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      selected: false
    };
  }
  render() {
    return (
      <div
        className={
          this.state.selected ? "playlist playlist--selected" : "playlist"
        }
        onClick={e => {
          this.setState({
            selected: !this.state.selected
          });

          setTimeout(() => {
            const playlistName = this.props.playlist.name;
            if (this.state.selected) {
              this.props.onSelect(playlistName, "select");
            } else {
              this.props.onSelect(playlistName, "deselect");
            }
          }, 100);
        }}
      >
        {this.props.playlist && (
          <div>
            <h3 className="playlist__name">{this.props.playlist.name}</h3>
            <img
              src={this.props.image}
              className="playlist__image"
              alt={this.props.playlist.name}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Playlist;
