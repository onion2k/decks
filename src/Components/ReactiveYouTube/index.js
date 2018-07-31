import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import YouTube from 'react-youtube';

class ReactiveYouTube extends Component {

    componentWillReact(){
        console.log("Updated yt");

        let data = this.player.getVideoData();
        let duration = this.player.getDuration();

        console.log(data, duration);

        this.player.playVideo();
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
                onPlay={ this.props.onPlay }
                onEnd={ this.props.onEnd }
                onStateChange={(e)=>{
                    if (e.data===5){ // 5 === cued
                        let data = this.player.getVideoData();
                        let duration = this.player.getDuration();
                        console.log(data, duration);
                        this.player.playVideo();
                    }
                }}
            />
        );
    }
}

export default inject("yt1210Store")(observer(ReactiveYouTube));
