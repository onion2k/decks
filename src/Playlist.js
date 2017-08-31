import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends Component {

    render() {

        const tracklist = this.props.playlist.map((track)=>{
            var t = this.props.trackData[track] || { title: track, found: false };
            return <div 
                key={ track } 
                className={ 'track'+(track===this.props.playing?' playing':'')+(t.found?' found':'') }
                onClick={ (e)=>this.props.onClick(track) }
            >{ t.title || track }</div>;
        });

        return (
            <div className='Playlist'>
                { tracklist }
            </div>
        );
    }
}

export default Playlist;
