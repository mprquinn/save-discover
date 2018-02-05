import React, { Component } from 'react';
import '../Aggregate.css';

class HourCounter extends Component {
    constructor() {
        super();

        this.calculateHours = this.calculateHours.bind(this);
    }
    calculateHours(playlists) {
        let totalDuration = 0;
        const allSongs = this.props.playlists.reduce((songs, playlist) => {
            return songs.concat(playlist.songs)
        }, []);
        totalDuration = allSongs.reduce((sum, song) => {
            return sum + song.duration;
        }, 0);
        return totalDuration;
    }
	render() {
		return (
			<div className="hour-counter">
                {this.props.playlists && 
                    <h2>{Math.round(this.calculateHours(this.props.playlists) / 60 / 60)} hours</h2> 
                }
			</div>
		)
	}
};

export default HourCounter;