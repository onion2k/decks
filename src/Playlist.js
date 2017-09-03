import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends Component {

    constructor() {
        super();
        this.state = { newtrack: 'UxUb9Yzr1sE' };

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
        const tracklist = this.props.playlist.map((track)=>{
            //var t = this.props.trackData[track] || { title: track, found: false };
            return <div 
                key={ track.videoId } 
                className={ 'track'+(track.videoId===this.props.playing?' playing':'')+(track.found?' found':'') }
                onClick={ (e)=>this.props.onClick(track.videoId) }
            >{ track.title || track.videoId }<span>{ this.timeFormat(track.duration) }</span></div>;
        });

        return (
            <div className="PlaylistWrapper">
                <div className='Playlist'>
                    { tracklist }
                </div>
                <form className="NewTrack" onSubmit={ this.onSubmit }>
                    <label>
                        Code:
                        <input type="text" value={this.state.newtrack} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Playlist;