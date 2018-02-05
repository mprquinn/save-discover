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
        return Math.round(totalDuration/60/60);
    }
	render() {
		return (
			<div className="hour-counter">
                {this.props.playlists && 
                    <h2>{Math.round(this.calculateHours(this.props.playlists))} hour
                    {
                        Math.round(this.calculateHours(this.props.playlists)) > 1 ? 's':''
                    } 
                    </h2> 
                }
			</div>
		)
	}
};

export default HourCounter;