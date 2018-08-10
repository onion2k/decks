import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

class PlaylistTracks extends Component {
  timeFormat(time) {
    if (!time) {
      return "";
    }

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
    let tracklist;

    if (this.props.playlistManager.playlist) {
      tracklist = this.props.playlistManager.getTracks().map(track => {
        return (
          <div
            key={track.videoId}
            className={
              "track" +
              (track.videoId === this.props.playlistManager.currentTrack.videoId ? " playing" : "")
            }
            onClick={e => this.props.playlistControls.play(track.videoId)}
          >
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={e => {
                e.stopPropagation();
                this.props.onDelete(track.videoId);
              }}
            />{" "}
            <i className="fa fa-music" aria-hidden="true" />{" "}
            {track.title || track.videoId} <span>{this.timeFormat(track.duration)}</span>
          </div>
        );
      });
    } else {
      tracklist = <div className="track">No tracks found</div>;
    }

    return <div className="Playlist">{tracklist}</div>;
  }
}

export default withRouter(inject("playlistControls","playlistManager")(observer(PlaylistTracks)));
