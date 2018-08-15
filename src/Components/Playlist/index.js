import React, { Component } from "react";
import "./Playlist.css";

import PlaylistTitle from "../PlaylistTitle/";
import PlaylistTracks from "../PlaylistTracks/";
import PlaylistAdd from "../PlaylistAdd/";

class Playlist extends Component {
  render() {
    return (
      <div className="PlaylistWrapper">
        <PlaylistTitle />
        <PlaylistTracks />
        <PlaylistAdd />
      </div>
    );
  }
}

export default Playlist;
