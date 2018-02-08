import React, { Component } from "react";
import "../Playlist.css";
import mojs from "mo-js";

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      selected: false,
      burst: ""
    };
  }
  componentDidMount() {
    const burst = new mojs.Burst({
      x: 0,
      y: 0,
      radius: { "45": "250" },
      count: 12,
      easing: "quad.out",
      children: {
        shape: "line",
        stroke: ["#ffffff", "#13ad69"],
        opacity: { 0: 1 },
        radius: { "50": "200" },
        strokeWidth: 10,
        isShowEnd: false
      }
    });
    this.setState({
      burst
    });
  }
  render() {
    return (
      <div
        className={
          this.state.selected ? "playlist playlist--selected" : "playlist"
        }
        onClick={e => {
          const pos = e.target.getBoundingClientRect();
          const radius = pos.width;
          if (!this.state.selected) {
            this.state.burst
              .tune({
                x: pos.x + pos.width / 2,
                y: pos.y + pos.height / 2,
                radius: { "45": pos.width / 0.98 }
              })
              .setSpeed(2.2)
              .replay();
          }
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
