import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class PlaylistTitle extends Component {
  render() {
    return (
      <div className="PlaylistTitle">
        <span>{this.props.playlistManager.title || "No playlist selected"}</span>
      </div>
    );
  }
}

export default inject("playlistManager")(observer(PlaylistTitle));
