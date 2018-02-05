import React, { Component } from 'react';
import '../Aggregate.css';

class Aggregate extends Component {
	render() {
		return (
			<div className="aggregate">
				<h2>Text {this.props.playlists && this.props.playlists.length}</h2>
			</div>
		)
	}
};

export default Aggregate;