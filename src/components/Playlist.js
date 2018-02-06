import React, { Component } from 'react';
import '../Playlist.css';

class Playlist extends Component {
  render() {
    return (
      <div className="playlist">
        {this.props.playlist &&
          <div>
            <h3 className="playlist__name">{this.props.playlist.name}</h3>
            <img src={this.props.image} className="playlist__image" alt={this.props.playlist.name} />
            <ul className="playlist__list">
              {this.props.playlist.songs.slice(0,3).map(song => 
                <li key={song.name}className="playlist__item">{song.name}</li>
              )}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default Playlist;
