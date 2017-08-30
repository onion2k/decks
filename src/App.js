import React, { Component } from 'react';
import record from './img/record.png';
import './App.css';

import { Howl } from 'howler';
import YouTube from 'react-youtube';

class App extends Component {
    constructor() {
        super();

        this.crackle = new Howl({ src: ['./crackle.ogg'], loop: true, autoplay: false, autoload: true});
        this.state = {
            playing: false,
            playlistPos: 0,
            playlist: ['8HlTCn4s6dg','eq95TdCaXSU','3BU8hVTg9Xg','VUvj94b88rA'],
            videoId: '8HlTCn4s6dg'
        }
        this.onReady      = this.onReady.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onPlayVideo  = this.onPlayVideo.bind(this);
        this.onPauseVideo = this.onPauseVideo.bind(this);
        this.onStopVideo  = this.onStopVideo.bind(this);

    }

    onReady(event) {
        event.target.setVolume(30);
        this.setState({
            player: event.target,
        });
    }

    onChangeVideo() {
        var p = this.state.playlistPos;
        if (p===this.state.playlist.length-1) { p = 0; } else { p++; }
        this.setState({
            playlistPos: p,
            videoId: this.state.playlist[p]
        });
    }

    onPlayVideo() {
        this.crackle.play();
        this.setState({ playing: true });
        this.state.player.playVideo();
    }

    onPauseVideo() {
        this.state.player.pauseVideo();
    }

    onStopVideo() {
        this.crackle.pause();
        this.setState({ playing: false });
        this.state.player.stopVideo();
    }

    render() {

        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                controls: 0,
                autoplay: 0
            }
        }

        return (
            <div className="App">
                <h1>Crackly Record</h1>
                <YouTube
                    videoId={this.state.videoId}
                    opts={opts}
                    onReady={this.onReady}
                /><br/>
                <button onClick={this.onPlayVideo}>Play</button>
                <button onClick={this.onPauseVideo}>Pause</button>
                <button onClick={this.onStopVideo}>Stop</button>
                <button onClick={this.onChangeVideo}>Next</button>
                <img src={ record } alt="Record" className={'record '+(this.state.playing===true?'spinning':'')} />
            </div>
        );
    }
}

export default App;
