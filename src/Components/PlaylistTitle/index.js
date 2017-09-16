import React, { Component } from 'react';

class PlaylistTitle extends Component {

    render() {

        return (
            <div className="PlaylistTitle">
                <span>{ this.props.title }</span>
                <button>Playlists</button>
            </div>
        );
    }
}

export default PlaylistTitle;