import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import "./Controls.css";

class Controls extends Component {

  render() {
    let playlistsLink, playlistsIcon;

    if (window.location.pathname === "/playlists") {
      playlistsIcon = "fa fa-music";
      playlistsLink = "/";
    } else {
      playlistsIcon = "fa fa-list";
      playlistsLink = "/playlists";
    }

    return (
      <div className="buttons">
        <Link to={playlistsLink} className="button">
          <i className={playlistsIcon} aria-hidden="true" />
        </Link>

        <div
          className="button play"
          title="Play"
          onClick={e => {
            this.props.playlistControls.play();
          }}
        >
          <i className="fa fa-play" aria-hidden="true" />
        </div>
        <div
          className="button"
          title="Pause"
          onClick={e => {
            this.props.playlistControls.pause();
          }}
        >
          <i className="fa fa-pause" aria-hidden="true" />
        </div>
        <div
          className="button"
          title="Stop"
          onClick={e => {
            this.props.playlistControls.stop();
          }}
        >
          <i className="fa fa-stop" aria-hidden="true" />
        </div>
        <div
          className="button"
          title="Next"
          onClick={e => {
            this.props.playlistControls.next();
          }}
        >
          <i className="fa fa-step-forward" aria-hidden="true" />
        </div>

        <div
          className={"button toggle" + (this.props.playlistControls.repeat ? " on" : "")}
          title="Toggle Repeat"
          onClick={this.props.playlistControls.toggle_repeat}
        >
          <i className="fa fa-repeat" aria-hidden="true" />
        </div>
        <div
          className={"button toggle" + (this.props.playlistControls.shuffle ? " on" : "")}
          title="Toggle Shuffle"
          onClick={this.props.playlistControls.toggle_shuffle}
        >
          <i className="fa fa-random" aria-hidden="true" />
        </div>
        <div
          className={"button toggle" + (this.props.playlistControls.crackle ? " on" : "")}
          title="Share"
          onClick={this.props.playlistControls.toggle_crackle}
        >
          <i className="fa fa-headphones" aria-hidden="true" />
        </div>
        <div
          className={"button toggle" + (this.props.playlistControls.video ? " on" : "")}
          onClick={this.props.playlistControls.toggle_video}
        >
          <i className="fa fa-youtube" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default withRouter(inject("playlistControls")(observer(Controls)));
