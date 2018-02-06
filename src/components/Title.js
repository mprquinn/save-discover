import React, { Component } from 'react';
import '../Title.css';

class Title extends Component {
  render() {
    return (
      <div className="title">
         <h1>{this.props.username}'s Playlists</h1>
         <img src={this.props.profile_picture} alt={this.props.username}/ >
      </div>
    );
  }
}

export default Title;
