import React, { Component } from "react";
import "../Title.css";

class Title extends Component {
  render() {
    return (
      <div className="title">
        <h1 className="title__name">Save Your Playlists</h1>
        <p className="title__details">Select which playlist you want to save:</p>
        <div className="title__image-wrap">
          <img
            className="title__image"
            src={this.props.profile_picture}
            alt={this.props.username}
          />
        </div>
      </div>
    );
  }
}

export default Title;
