import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends Component {

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

    render() {
        const tracklist = this.props.playlist.map((track)=>{
            var t = this.props.trackData[track] || { title: track, found: false };
            return <div 
                key={ track } 
                className={ 'track'+(track===this.props.playing?' playing':'')+(t.found?' found':'') }
                onClick={ (e)=>this.props.onClick(track) }
            >{ t.title || track } <span>{ this.timeFormat(t.duration) }</span></div>;
        });

        return (
            <div className='Playlist'>
                { tracklist }
            </div>
        );
    }
}

export default Playlist;
