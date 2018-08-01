import React, { Component } from "react";
import "./Playlist.css";

import PlaylistTitle from "../PlaylistTitle/";
import PlaylistTracks from "../PlaylistTracks/";
import PlaylistAdd from "../PlaylistAdd/";

class Playlist extends Component {
  render() {
    return (
      <div className="PlaylistWrapper">
        <PlaylistTitle title={this.props.title} />
        <PlaylistTracks
          playlist={this.props.playlist}
          onClick={this.props.onClick}
          onDelete={this.props.onDelete}
        />
        <PlaylistAdd addTrack={this.props.addTrack} />
      </div>
    );
  }
}

export default Playlist;
