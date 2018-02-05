import React, { Component } from 'react';
import '../Title.css';

class Title extends Component {
  render() {
    return (
      <div className="title">
         <h1>{this.props.username}'s Playlists</h1>
      </div>
    );
  }
}

export default Title;
