import React, { Component } from 'react';
import './App.css';

import { Howl } from 'howler';
import YouTube from 'react-youtube';

import Record from './Record.js';

class App extends Component {

    constructor() {

        super();

        this.crackle = new Howl({ src: ['./crackle.ogg'], loop: true, autoplay: false, autoload: true});
        this.state = {
            playing: false,
            playlistPos: 0,
            playlist: ['nt-C3eMo5WA','3eYSUxoRc0U','_7qhdcaX8Q0','WEi9ZQrEjr8','qLrnkK2YEcE','MV_3Dpw-BRY','rDBbaGCCIhk'],
            videoId: 'nt-C3eMo5WA',
            autoplay: 0
        }

        this.onReady       = this.onReady.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onPlay        = this.onPlay.bind(this);
        this.onEnd         = this.onEnd.bind(this);
        this.onPlayVideo   = this.onPlayVideo.bind(this);
        this.onPauseVideo  = this.onPauseVideo.bind(this);
        this.onStopVideo   = this.onStopVideo.bind(this);

    }

    onReady(event) {
        event.target.setVolume(100);
        this.setState({
            player: event.target,
            vData: event.target.getVideoData()
        });
    }

    onChangeVideo() {
        if (!this.crackle.playing()) { this.crackle.play() };
        var p = this.state.playlistPos;
        if (p===this.state.playlist.length-1) { p = 0; } else { p++; }
        this.setState({
            playlistPos: p,
            videoId: this.state.playlist[p],
            playing: true,
            autoplay: 1
        });
    }

    onPlay(event){
        this.setState({ vData: this.state.player.getVideoData(), playing: true })
    }

    onEnd(event){
        this.onChangeVideo();
    }

    onPlayVideo() {
        this.crackle.play();
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
            height: '0',
            width: '0',
            playerVars: {
                controls: 0,
                autoplay: this.state.autoplay
            }
        }

        return (
            <div className="App">
                <h1>YT1200</h1>
                <YouTube
                    videoId={ this.state.videoId }
                    opts={ opts }
                    onReady={ this.onReady }
                    onPlay={ this.onPlay }
                    onEnd={ this.onEnd }
                /><br/>
                <div className='button' onClick={this.onPlayVideo}>Play</div>
                <div className='button' onClick={this.onPauseVideo}>Pause</div>
                <div className='button' onClick={this.onStopVideo}>Stop</div>
                <div className='button' onClick={this.onChangeVideo}>Next</div>
                <Record vData={ this.state.vData } playing={ this.state.playing } />
            </div>
        );
    }
}

export default App;
