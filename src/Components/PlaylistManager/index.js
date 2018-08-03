import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

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
    // this.props.addList(this.state);
  }

  render() {
    let playlists;

    if (this.props.yt1210Store.playlists.length > 0) {
      playlists = this.props.yt1210Store.playlists.map(playlist => {
        return (
          <div
            key={playlist.id}
            className={"track"}
            onClick={e => {
              this.props.playList(playlist.playlistId);
              // this.props.history.push('/');
            }}
          >
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                this.props.deleteList(playlist.playlistId);
              }}
            />{" "}
            <i className="fa fa-list" aria-hidden="true" /> {playlist.title}{" "}
            <span>{playlist.length || "No"} tracks</span>
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

export default withRouter(inject("yt1210Store")(observer(PlaylistManager)));
