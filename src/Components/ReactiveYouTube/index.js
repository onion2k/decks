import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import YouTube from 'react-youtube';

class ReactiveYouTube extends Component {

    playstate = autorun(()=>{
        console.log("ps", this.props.yt1210Store.playing);
        if (this.player) {
            if (!this.props.yt1210Store.playing) {
                this.player.pauseVideo();
            } else {
                this.player.playVideo();
            }
        }
    })

    componentWillReact(){
        console.log("Updated yt");
        console.log(this.props.yt1210Store.playing);
    }

    render() {

        const opts = {
            width: '100%',
            playerVars: {
                controls: 0,
                autoplay: false
            }
        }

        return (
            <YouTube
                videoId={ this.props.yt1210Store.videoId }
                opts={ opts }
                onReady={ (e) => { this.player = e.target; } }
                onPlay={(e)=>{
                    let data = this.player.getVideoData();
                    let duration = this.player.getDuration();
                    // this.props.yt1210Store.updateTrackData(data, duration);
                }}
                // onEnd={ this.props.onEnd }
                onStateChange={(e)=>{
                    if (e.data===5 && this.props.yt1210Store.playing){ // 5 === cued
                        this.player.playVideo();
                    }
                }}
            />
        );
    }
}

export default inject("yt1210Store")(observer(ReactiveYouTube));
