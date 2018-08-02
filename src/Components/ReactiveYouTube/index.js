import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { autorun } from "mobx";
import YouTube from "react-youtube";

class ReactiveYouTube extends Component {

  playstate = autorun(() => {
    const { playing } = this.props.yt1210Store;
    if (this.player) {
      if (!playing) {
        this.player.pauseVideo();
      } else {
        this.player.playVideo();
      }
    }
  });

  render() {
    const opts = {
      width: "100%",
      playerVars: {
        controls: 0,
        autoplay: false
      }
    };

    return (
      <YouTube
        videoId={ this.props.yt1210Store.videoId }
        opts={opts}
        onReady={e => {
          this.player = e.target;
          this.player.setVolume(100);
        }}
        onPlay={() => {
          let data = this.player.getVideoData();
          let duration = this.player.getDuration();
          this.props.yt1210Store.updateTrackData(data, duration);
        }}
        onEnd={() => {
          this.props.yt1210Store.next();
        }}
        onStateChange={e => {
          if (e.data === 5 && this.props.yt1210Store.playing) {
            // 5 === cued
            this.player.playVideo();
          }
        }}
      />
    );
  }
}

export default inject("yt1210Store")(observer(ReactiveYouTube));
