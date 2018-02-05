import React, { Component } from 'react';
import '../Playlist.css';

class Playlist extends Component {
  render() {
    return (
      <div className="playlist">
      	<img src="" alt=""/>
      	<h3 className="playlist__name">Playlist Name</h3>
      	<ul className="playlist__list">
      		<li className="playlist__song">Song Name</li>
      	</ul>
      </div>
    );
  }
}

export default Playlist;
