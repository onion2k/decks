import React, { Component } from 'react';
import './Playlist.css';

import PlaylistTitle from '../PlaylistTitle/';
import PlaylistTracks from '../PlaylistTracks/';
import PlaylistAdd from '../PlaylistAdd/';

class Playlist extends Component {

    render() {

        return (
            <div className="PlaylistWrapper">
                <PlaylistTitle title={'Jazzy Triphop Volume 2'}></PlaylistTitle>
                <PlaylistTracks playlist={ this.props.playlist } onClick={ this.props.onClick } onDelete={ this.props.onDelete }></PlaylistTracks>
                <PlaylistAdd addTrack={ this.props.addTrack }></PlaylistAdd>
            </div>
        );
    }
}

export default Playlist;