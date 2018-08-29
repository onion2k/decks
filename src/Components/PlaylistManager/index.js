import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

import "./PlaylistManager.css";

class PlaylistManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newlist: "",
      playlists: props.playlists
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ newlist: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.playlistManager.playlistAdd(this.state.newlist);
  }

  render() {
    let playlists;

    if (this.props.playlistManager.playlists.length > 0) {
      playlists = this.props.playlistManager.playlists.map(playlist => {
        return (
          <div
            key={playlist.id}
            className="playlist"
            onClick={e => {
              this.props.playlistManager.load(playlist.id);
              this.props.history.push('/');
            }}
          >
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                // this.props.deleteList(playlist.playlistId);
              }}
            />{" "}
            <i className="fa fa-list" aria-hidden="true" /> {playlist.title}{" "}
            <span className="tracks">{playlist.tracks.length || "No"} tracks</span>
            <span className="share" onClick={(e)=>{
              e.stopPropagation();
              e.preventDefault();
              console.log("Share ", playlist.id)
              this.props.playlistManager.share(playlist.id)
            }}>Share</span>
          </div>
        );
      });
    } else {
      playlists = <div className="track">No playlists found</div>;
    }

    return (
      <div className="PlaylistManager">
        <div className="PlaylistTitle">
          <span>Your playlists</span>
        </div>
        <div className="Playlist">{playlists}</div>
        <form className="NewTrack">
          <label>
            New List:
            <input type="text" value={this.state.newlist} onChange={this.handleChange} />
          </label>
          <button onClick={this.onSubmit}>Add List</button>
        </form>
      </div>
    );
  }
}

export default withRouter(inject("playlistManager")(observer(PlaylistManager)));
