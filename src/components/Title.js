import React, { Component } from 'react';
import '../Title.css';

class Title extends Component {
  render() {
    return (
      <div className="title">
         <h1 className="title__name">Your Playlists</h1>
         <img className="title__image" src={this.props.profile_picture} alt={this.props.username}/ >
      </div>
    );
  }
}

export default Title;
