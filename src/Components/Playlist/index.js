import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends Component {

    constructor() {
        super();
        this.state = { newtrack: '' };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    timeFormat(time){

        if (!time) { return ''; }

        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + Math.round(secs);
        return ret;

    }

    handleChange(event) {
        this.setState({newtrack: event.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        this.props.addTrack(this.state);
    }

    render() {

        let tracklist;

        if (this.props.playlist.length > 0) {
            tracklist = this.props.playlist.map((track)=>{
                return <div 
                    key={ track.videoId } 
                    className={ 'track'+(track.videoId===this.props.playing?' playing':'')+(track.found?' found':'') }
                    onClick={ (e)=>this.props.onClick(track.videoId) }
                ><i className="fa fa-trash" aria-hidden="true" onClick={ (e)=>{ e.stopPropagation(); this.props.onDelete(track.videoId); } }></i> <i className="fa fa-music" aria-hidden="true"></i> { track.title || track.videoId } <span>{ this.timeFormat(track.duration) }</span></div>;
            });
        } else {
            tracklist = <div className='track'>No tracks found</div>;
        }

        return (
            <div className="PlaylistWrapper">
                <div className="PlaylistSelector">Playlist selector</div>
                <div className='Playlist'>
                    { tracklist }
                </div>
                <form className="NewTrack">
                    <label>
                        YouTube Link:
                        <input type="text" value={ this.state.newtrack } onChange={ this.handleChange } />
                    </label>
                    <button onClick={ this.onSubmit }>Add Track</button>
                </form>
            </div>
        );
    }
}

export default Playlist;