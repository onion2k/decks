import React, { Component } from 'react';

class PlaylistTitle extends Component {

    render() {

        return (
            <div className="PlaylistTitle">
                <span>{ this.props.title }</span>
            </div>
        );
    }
}

export default PlaylistTitle;