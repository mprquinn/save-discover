import React, { Component } from 'react';
import '../Playlist.css';

class Playlist extends Component {
  render() {
    return (
      <div className="playlist">
        {this.props.playlist &&
          <div>
            <img src="" alt=""/>
            <h3 className="playlist__name">{this.props.playlist.name}</h3>
            <ul>
              {this.props.playlist.songs.map(song => 
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
