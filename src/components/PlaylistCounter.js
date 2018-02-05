import React, { Component } from 'react';
import '../Aggregate.css';

class playlistCounter extends Component {
	render() {
		return (
			<div className="playlist-counter">
				<h2>{this.props.playlists && this.props.playlists.length} playlists</h2>
			</div>
		)
	}
};

export default playlistCounter;