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
          onClick={e => {
            this.props.playlistControls.play(e);
            // this.props.onPlayVideo(e, true);
          }}
        >
          <i className="fa fa-play" aria-hidden="true" />
        </div>
        <div
          className="button"
          onClick={e => {
            this.props.playlistControls.pause(e);
          }}
        >
          <i className="fa fa-pause" aria-hidden="true" />
        </div>
        <div
          className="button"
          onClick={e => {
            this.props.playlistControls.stop(e);
          }}
        >
          <i className="fa fa-stop" aria-hidden="true" />
        </div>
        <div
          className="button"
          onClick={e => {
            this.props.playlistControls.next(e);
          }}
        >
          <i className="fa fa-step-forward" aria-hidden="true" />
        </div>

        <div
          className={"toggle" + (this.props.playlistControls.repeat ? " on" : "")}
          onClick={() => {
            this.props.playlistControls.repeat = !this.props.playlistControls.repeat;
          }}
        >
          <i className="fa fa-repeat" aria-hidden="true" />
        </div>
        <div
          className={"toggle" + (this.props.playlistControls.shuffle ? " on" : "")}
          onClick={() => {
            this.props.playlistControls.shuffle = !this.props.playlistControls.shuffle;
          }}
        >
          <i className="fa fa-random" aria-hidden="true" />
        </div>
        <div
          className={"toggle" + (this.props.playlistControls.crackle ? " on" : "")}
          onClick={() => {
            this.props.playlistControls.crackle = !this.props.playlistControls.crackle;
          }}
        >
          <i className="fa fa-headphones" aria-hidden="true" />
        </div>
        <div
          className={"toggle" + (this.props.playlistControls.video ? " on" : "")}
          onClick={() => {
            this.props.playlistControls.video = !this.props.playlistControls.video;
          }}
        >
          <i className="fa fa-youtube" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default withRouter(inject("playlistControls")(observer(Controls)));
